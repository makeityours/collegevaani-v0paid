import { NextRequest, NextResponse } from "next/server"
import { storageService } from "@/lib/storage/storage-service"
import { AuthService } from "@/lib/auth/auth-service"
import { asyncHandler } from "@/lib/errors/error-handler"
import { rateLimiters } from "@/lib/middleware/rate-limiter"
import { logger } from "@/lib/monitoring/logger"

// Maximum file size (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024

/**
 * Handle file uploads
 * POST /api/uploads
 */
export const POST = asyncHandler(async (request: NextRequest) => {
  // Apply rate limiting
  await rateLimiters.general.check(request)

  // Authenticate user
  const user = await AuthService.requireAuth(request)

  try {
    // Get the multipart/form-data content
    const formData = await request.formData()
    
    // Get file from form data
    const file = formData.get("file") as File | null
    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      )
    }
    
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { 
          success: false, 
          error: `File size exceeds the maximum allowed size of ${MAX_FILE_SIZE / (1024 * 1024)}MB` 
        },
        { status: 400 }
      )
    }
    
    // Get additional metadata
    const folder = (formData.get("folder") as string) || `users/${user.userId}`
    const fileName = (formData.get("fileName") as string) || file.name
    const publicAccess = (formData.get("public") as string) === "true"
    
    // Validate file type if necessary
    const allowedTypes = [
      "image/jpeg", 
      "image/png", 
      "image/gif", 
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ]
    
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "File type not allowed" },
        { status: 400 }
      )
    }
    
    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    // Upload file using storage service
    const result = await storageService.uploadFile(buffer, file.name, {
      fileName,
      contentType: file.type,
      folder,
      publicAccess,
      maxSizeBytes: MAX_FILE_SIZE,
    })
    
    // Save file metadata to database if needed
    // This would typically involve storing the file path, owner, permissions, etc.
    
    // Log the upload
    logger.info(`File uploaded successfully: ${result.filePath}`, {
      metadata: {
        userId: user.userId,
        fileName: result.fileName,
        size: result.sizeBytes,
        type: result.mimeType,
      }
    })
    
    // Return successful response with file details
    return NextResponse.json({
      success: true,
      file: {
        name: result.fileName,
        path: result.filePath,
        size: result.sizeBytes,
        type: result.mimeType,
        url: result.url,
      }
    })
  } catch (error) {
    logger.error("File upload failed", error as Error)
    return NextResponse.json(
      { success: false, error: "File upload failed" },
      { status: 500 }
    )
  }
})

/**
 * Delete a file
 * DELETE /api/uploads?path={filePath}
 */
export const DELETE = asyncHandler(async (request: NextRequest) => {
  // Apply rate limiting
  await rateLimiters.general.check(request)

  // Authenticate user
  const user = await AuthService.requireAuth(request, ["admin"])

  try {
    // Get file path from query
    const url = new URL(request.url)
    const filePath = url.searchParams.get("path")
    
    if (!filePath) {
      return NextResponse.json(
        { success: false, error: "No file path provided" },
        { status: 400 }
      )
    }
    
    // Delete file using storage service
    const result = await storageService.deleteFile(filePath)
    
    if (!result) {
      return NextResponse.json(
        { success: false, error: "Failed to delete file" },
        { status: 500 }
      )
    }
    
    // Log the deletion
    logger.info(`File deleted successfully: ${filePath}`, {
      metadata: {
        userId: user.userId,
        filePath,
      }
    })
    
    // Return successful response
    return NextResponse.json({
      success: true,
      message: "File deleted successfully",
    })
  } catch (error) {
    logger.error("File deletion failed", error as Error)
    return NextResponse.json(
      { success: false, error: "File deletion failed" },
      { status: 500 }
    )
  }
}) 
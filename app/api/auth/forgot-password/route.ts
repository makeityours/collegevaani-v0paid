import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { sql } from "@/lib/database/connection"
import { asyncHandler } from "@/lib/errors/error-handler"
import { PasswordResetService } from "@/lib/auth/password-reset-service"
import { EmailService } from "@/lib/utils/email-service"
import { rateLimiters } from "@/lib/middleware/rate-limiter"
import { logger } from "@/lib/monitoring/logger"

// Request schema
const forgotPasswordSchema = z.object({
  email: z.string().email("Please provide a valid email address")
})

/**
 * Request a password reset
 */
export const POST = asyncHandler(async (request: NextRequest) => {
  // Apply rate limiting - stricter for password reset to prevent abuse
  await rateLimiters.auth.check(request)

  // Get and validate request body
  const body = await request.json()
  const { email } = forgotPasswordSchema.parse(body)

  // Generate reset token
  const result = await PasswordResetService.generateResetToken(email.toLowerCase())
  
  // Always return success even if email doesn't exist to prevent user enumeration
  if (!result) {
    logger.info("Password reset requested for non-existent email", {
      metadata: { email }
    })
    
    return NextResponse.json({
      success: true,
      message: "If your email is registered, you will receive a password reset link"
    })
  }
  
  try {
    // Get user details for the email
    const userResult = await sql`
      SELECT name FROM users WHERE id = ${result.userId}
    `
    
    if (userResult.length > 0) {
      const userName = userResult[0].name
      
      // Send password reset email
      await EmailService.sendPasswordResetEmail(
        email, 
        userName, 
        result.token
      )
      
      logger.info("Password reset email sent", {
        metadata: { email, userId: result.userId }
      })
    }
  } catch (error) {
    // Log error but don't expose to client
    logger.error("Failed to send password reset email", error as Error, {
      metadata: { email, userId: result?.userId }
    })
  }
  
  // Return success response
  return NextResponse.json({
    success: true,
    message: "If your email is registered, you will receive a password reset link"
  })
}) 
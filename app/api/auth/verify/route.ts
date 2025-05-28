import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { asyncHandler } from "@/lib/errors/error-handler"
import { VerificationService } from "@/lib/auth/verification-service"
import { rateLimiters } from "@/lib/middleware/rate-limiter"
import { logger } from "@/lib/monitoring/logger"

// Verification token schema
const verifyEmailSchema = z.object({
  userId: z.string().uuid("Invalid user ID format"),
  token: z.string().min(10, "Invalid verification token")
})

/**
 * Verify a user's email with a verification token
 */
export const POST = asyncHandler(async (request: NextRequest) => {
  // Apply rate limiting for verification
  await rateLimiters.auth.check(request)

  // Get and validate request body
  const body = await request.json()
  const { userId, token } = verifyEmailSchema.parse(body)

  // Verify the email
  await VerificationService.verifyEmail(userId, token)

  logger.info("Email verification successful", {
    metadata: { userId }
  })

  // Return success response
  return NextResponse.json({
    success: true,
    message: "Email verified successfully"
  })
})

// Request a new verification email
const requestVerificationSchema = z.object({
  userId: z.string().uuid("Invalid user ID format")
})

/**
 * Request a new verification email
 */
export const PUT = asyncHandler(async (request: NextRequest) => {
  // Apply rate limiting
  await rateLimiters.auth.check(request)

  // Get and validate request body
  const body = await request.json()
  const { userId } = requestVerificationSchema.parse(body)

  // Generate a new verification token
  await VerificationService.requestNewVerificationEmail(userId)

  logger.info("New verification email requested", {
    metadata: { userId }
  })

  // Return success response
  return NextResponse.json({
    success: true,
    message: "Verification email sent"
  })
}) 
import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { asyncHandler } from "@/lib/errors/error-handler"
import { PasswordResetService } from "@/lib/auth/password-reset-service"
import { rateLimiters } from "@/lib/middleware/rate-limiter"
import { ValidationError } from "@/lib/errors/error-handler"
import { logger } from "@/lib/monitoring/logger"

// Reset password schema with validation
const resetPasswordSchema = z.object({
  userId: z.string().uuid("Invalid user ID format"),
  token: z.string().min(10, "Invalid reset token"),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

/**
 * Reset a password using a token
 */
export const POST = asyncHandler(async (request: NextRequest) => {
  // Apply rate limiting
  await rateLimiters.auth.check(request)

  // Get and validate request body
  const body = await request.json()
  const { userId, token, password } = resetPasswordSchema.parse(body)

  // Validate token before attempting reset
  const isValidToken = await PasswordResetService.validateResetToken(userId, token)
  
  if (!isValidToken) {
    throw new ValidationError("Invalid or expired reset token")
  }

  // Reset the password
  const success = await PasswordResetService.resetPassword(userId, token, password)
  
  if (!success) {
    throw new ValidationError("Failed to reset password")
  }
  
  logger.info("Password reset successful", {
    metadata: { userId }
  })

  // Return success response
  return NextResponse.json({
    success: true,
    message: "Password reset successful. You can now log in with your new password."
  })
})

/**
 * Validate a reset token without resetting the password
 */
export const GET = asyncHandler(async (request: NextRequest) => {
  // Get token and userId from query params
  const url = new URL(request.url)
  const userId = url.searchParams.get('userId')
  const token = url.searchParams.get('token')
  
  if (!userId || !token) {
    throw new ValidationError("Missing required parameters")
  }
  
  // Validate token
  const isValid = await PasswordResetService.validateResetToken(userId, token)
  
  return NextResponse.json({
    success: true,
    valid: isValid
  })
}) 
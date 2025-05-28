import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { AuthService } from "@/lib/auth/auth-service"
import { sql } from "@/lib/database/connection"
import { asyncHandler } from "@/lib/errors/error-handler"
import { rateLimiters } from "@/lib/middleware/rate-limiter"

const logoutSchema = z.object({
  refreshToken: z.string().optional(),
})

export const POST = asyncHandler(async (request: NextRequest) => {
  // Apply basic rate limiting
  await rateLimiters.general.check(request)
  
  // Try to get refresh token from request body
  let refreshToken: string | null = null
  
  // Check content type
  const contentType = request.headers.get("content-type")
  if (contentType && contentType.includes("application/json")) {
    const body = await request.json()
    const validatedBody = logoutSchema.parse(body)
    refreshToken = validatedBody.refreshToken || null
  }
  
  // If not in body, try to get from request using AuthService
  if (!refreshToken) {
    refreshToken = AuthService.extractRefreshTokenFromRequest(request)
  }
  
  // If we have a refresh token, revoke it in the database
  if (refreshToken) {
    try {
      // First try to decode the token to get the user ID
      const payload = AuthService.verifyRefreshToken(refreshToken)
      
      // Revoke the token in the database
      await sql`
        UPDATE user_refresh_tokens 
        SET is_revoked = true 
        WHERE user_id = ${payload.userId} AND token = ${refreshToken}
      `
    } catch (decodeError) {
      // If the token is invalid, just try to revoke by token value
      await sql`
        UPDATE user_refresh_tokens 
        SET is_revoked = true 
        WHERE token = ${refreshToken}
      `
    }
  }
  
  // Try to get access token and extract user ID
  try {
    const accessToken = AuthService.extractAccessTokenFromRequest(request)
    if (accessToken) {
      const payload = AuthService.verifyAccessToken(accessToken)
      
      // Revoke all refresh tokens for this user for full logout
      await sql`
        UPDATE user_refresh_tokens 
        SET is_revoked = true 
        WHERE user_id = ${payload.userId}
      `
    }
  } catch (error) {
    // Ignore access token errors during logout
  }
  
  // Create response and clear cookies
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  })
  
  // Clear auth cookies
  response.cookies.delete("access_token")
  response.cookies.delete("refresh_token")
  
  return response
}) 
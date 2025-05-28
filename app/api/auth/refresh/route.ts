import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { AuthService } from "@/lib/auth/auth-service"
import { DatabaseConnection } from "@/lib/database/connection"
import { asyncHandler } from "@/lib/errors/error-handler"
import { AuthenticationError } from "@/lib/errors/error-handler"
import { rateLimiters } from "@/lib/middleware/rate-limiter"

const refreshTokenSchema = z.object({
  refreshToken: z.string().optional(),
})

export const POST = asyncHandler(async (request: NextRequest) => {
  // Apply rate limiting - more permissive than login
  await rateLimiters.payment.check(request)

  // Try to get refresh token from request body
  let refreshToken: string | null = null
  
  // Check content type
  const contentType = request.headers.get("content-type")
  if (contentType && contentType.includes("application/json")) {
    const body = await request.json()
    const validatedBody = refreshTokenSchema.parse(body)
    refreshToken = validatedBody.refreshToken || null
  }
  
  // If not in body, try to get from request using AuthService
  if (!refreshToken) {
    refreshToken = AuthService.extractRefreshTokenFromRequest(request)
  }
  
  // If no refresh token found, return error
  if (!refreshToken) {
    throw new AuthenticationError("No refresh token provided")
  }
  
  // Verify refresh token
  const payload = AuthService.verifyRefreshToken(refreshToken)
  
  // Check if refresh token is in the database and valid
  const db = DatabaseConnection.getInstance()
  const tokenResult = await db.query(
    `SELECT * FROM user_refresh_tokens WHERE user_id = $1 AND token = $2 AND is_revoked = false`,
    [payload.userId, refreshToken]
  )
  
  if (tokenResult.length === 0) {
    throw new AuthenticationError("Invalid refresh token")
  }
  
  // Get user information
  const userResult = await db.query(
    `SELECT id, email, role FROM users WHERE id = $1 AND is_active = true`,
    [payload.userId]
  )
  
  if (userResult.length === 0) {
    throw new AuthenticationError("User not found or inactive")
  }
  
  const user = userResult[0]
  
  // Generate new token pair
  const tokens = AuthService.generateTokenPair({
    userId: user.id,
    email: user.email,
    role: user.role,
  })
  
  // Update refresh token in database
  await db.query(
    `UPDATE user_refresh_tokens SET is_revoked = true WHERE user_id = $1 AND token = $2`,
    [user.id, refreshToken]
  )
  
  await db.query(
    `INSERT INTO user_refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, NOW() + INTERVAL '7 days')`,
    [user.id, tokens.refreshToken]
  )
  
  // Set cookies
  const response = NextResponse.json({
    success: true,
    message: "Token refreshed successfully",
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  })
  
  // Set HTTP-only cookies
  response.cookies.set({
    name: "access_token",
    value: tokens.accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60, // 15 minutes in seconds
    path: "/",
  })
  
  response.cookies.set({
    name: "refresh_token",
    value: tokens.refreshToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    path: "/api/auth/refresh", // Restrict to refresh endpoint only
  })
  
  return response
}) 
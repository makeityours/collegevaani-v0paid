import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/database/connection"
import { AuthService } from "@/lib/auth/auth-service"
import { asyncHandler } from "@/lib/errors/error-handler"
import { AuthenticationError } from "@/lib/errors/error-handler"
import { logger } from "@/lib/monitoring/logger"
import { setUser as setSentryUser } from "@/lib/monitoring/sentry"

/**
 * Get the current authenticated user's data
 */
export const GET = asyncHandler(async (request: NextRequest) => {
  // Get user from JWT token in cookie or Authorization header
  const payload = await AuthService.getUserFromRequest(request)
  
  // Get user data from database
  const result = await sql`
    SELECT 
      id, 
      name, 
      email, 
      role, 
      is_verified as "isVerified", 
      avatar,
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM users 
    WHERE id = ${payload.userId} AND is_active = true
  `
  
  if (result.length === 0) {
    throw new AuthenticationError("User not found or inactive")
  }
  
  const user = result[0]
  
  // Set user context in Sentry for error tracking
  setSentryUser({
    id: user.id,
    email: user.email,
    username: user.name,
  })
  
  logger.info("User data retrieved", {
    metadata: { userId: user.id }
  })
  
  // Return user data
  return NextResponse.json({
    success: true,
    user
  })
})

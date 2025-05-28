import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { sql } from "@/lib/database/connection"
import { AuthService } from "@/lib/auth/auth-service"
import { asyncHandler } from "@/lib/errors/error-handler"
import { rateLimiters } from "@/lib/middleware/rate-limiter"

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
})

export const POST = asyncHandler(async (request: NextRequest) => {
  // Apply rate limiting
  await rateLimiters.auth.check(request)

  const body = await request.json()
  const { email, password } = loginSchema.parse(body)

  // Find user
  const result = await sql`
    SELECT id, name, email, password_hash, role, is_verified, is_active
    FROM users 
    WHERE email = ${email} AND is_active = true
  `

  if (result.length === 0) {
    return NextResponse.json({ 
      success: false,
      error: "Invalid credentials" 
    }, { status: 401 })
  }

  const user = result[0]

  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.password_hash)
  if (!isValidPassword) {
    return NextResponse.json({ 
      success: false,
      error: "Invalid credentials" 
    }, { status: 401 })
  }

  // Generate token pair
  const tokens = AuthService.generateTokenPair({
    userId: user.id,
    email: user.email,
    role: user.role,
  })

  // Store refresh token in database
  await sql`
    INSERT INTO user_refresh_tokens (user_id, token, expires_at)
    VALUES (${user.id}, ${tokens.refreshToken}, NOW() + INTERVAL '7 days')
  `

  // Update last login
  await sql`
    UPDATE users SET updated_at = NOW() WHERE id = ${user.id}
  `

  // Create response with tokens
  const response = NextResponse.json({
    success: true,
    message: "Login successful",
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.is_verified,
    },
  })

  // Set HTTP-only cookies for enhanced security
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

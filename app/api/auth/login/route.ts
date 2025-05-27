import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { z } from "zod"
import { sql } from "@/lib/database/connection"
import { rateLimit } from "@/lib/middleware/rate-limiter"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    await rateLimit(request, { maxRequests: 5, windowMs: 60000 })

    const body = await request.json()
    const { email, password } = loginSchema.parse(body)

    // Find user
    const result = await sql`
      SELECT id, name, email, password_hash, role, is_verified, is_active
      FROM users 
      WHERE email = ${email} AND is_active = true
    `

    if (result.length === 0) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    const user = result[0]

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash)
    if (!isValidPassword) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    })

    // Update last login
    await sql`
      UPDATE users SET updated_at = NOW() WHERE id = ${user.id}
    `

    return NextResponse.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.is_verified,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid input data" }, { status: 400 })
    }
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { z } from "zod"
import { sql } from "@/lib/database/connection"
import { rateLimit } from "@/lib/middleware/rate-limiter"

const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().optional(),
  role: z.enum(["student", "parent", "counselor"]).default("student"),
})

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    await rateLimit(request, { maxRequests: 5, windowMs: 60000 })

    const body = await request.json()
    const validatedData = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${validatedData.email}
    `

    if (existingUser.length > 0) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12)

    // Create user
    const result = await sql`
      INSERT INTO users (name, email, password_hash, phone, role)
      VALUES (${validatedData.name}, ${validatedData.email}, ${hashedPassword}, ${validatedData.phone}, ${validatedData.role})
      RETURNING id, name, email, role, is_verified, created_at
    `

    const user = result[0]

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    })

    // Send verification email (implement later)
    // await sendVerificationEmail(user.email, user.id)

    return NextResponse.json(
      {
        message: "User created successfully",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          isVerified: user.is_verified,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid input data", errors: error.errors }, { status: 400 })
    }
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

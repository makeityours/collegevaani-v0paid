import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { sql } from "@/lib/database/connection"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    // Get user data
    const result = await sql`
      SELECT id, name, email, role, is_verified, avatar, preferences
      FROM users 
      WHERE id = ${decoded.userId} AND is_active = true
    `

    if (result.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    const user = result[0]

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.is_verified,
        avatar: user.avatar,
        preferences: user.preferences,
      },
    })
  } catch (error) {
    console.error("Auth verification error:", error)
    return NextResponse.json({ message: "Invalid token" }, { status: 401 })
  }
}

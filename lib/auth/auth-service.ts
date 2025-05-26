import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import type { NextRequest } from "next/server"
import { config } from "@/lib/config/environment"
import { AuthenticationError, AuthorizationError } from "@/lib/errors/error-handler"

export interface JWTPayload {
  userId: string
  email: string
  role: string
  iat: number
  exp: number
}

export class AuthService {
  // Generate JWT token
  static generateToken(payload: Omit<JWTPayload, "iat" | "exp">): string {
    return jwt.sign(payload, config.auth.jwtSecret, {
      expiresIn: config.auth.jwtExpiresIn,
    })
  }

  // Verify JWT token
  static verifyToken(token: string): JWTPayload {
    try {
      return jwt.verify(token, config.auth.jwtSecret) as JWTPayload
    } catch (error) {
      throw new AuthenticationError("Invalid or expired token")
    }
  }

  // Hash password
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12
    return bcrypt.hash(password, saltRounds)
  }

  // Compare password
  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }

  // Extract token from request
  static extractTokenFromRequest(request: NextRequest): string | null {
    const authHeader = request.headers.get("authorization")
    if (authHeader && authHeader.startsWith("Bearer ")) {
      return authHeader.substring(7)
    }
    return null
  }

  // Get user from request
  static async getUserFromRequest(request: NextRequest): Promise<JWTPayload> {
    const token = this.extractTokenFromRequest(request)
    if (!token) {
      throw new AuthenticationError("No token provided")
    }

    return this.verifyToken(token)
  }

  // Check if user has required role
  static checkRole(userRole: string, requiredRoles: string[]): boolean {
    return requiredRoles.includes(userRole)
  }

  // Middleware for protected routes
  static async requireAuth(request: NextRequest, requiredRoles?: string[]): Promise<JWTPayload> {
    const user = await this.getUserFromRequest(request)

    if (requiredRoles && !this.checkRole(user.role, requiredRoles)) {
      throw new AuthorizationError("Insufficient permissions")
    }

    return user
  }
}

// Role-based access control
export const ROLES = {
  ADMIN: "admin",
  STUDENT: "student",
  COUNSELOR: "counselor",
  PARENT: "parent",
  COLLEGE_REP: "college_rep",
} as const

export const PERMISSIONS = {
  // Admin permissions
  MANAGE_USERS: ["admin"],
  MANAGE_COLLEGES: ["admin", "college_rep"],
  MANAGE_COURSES: ["admin", "college_rep"],
  VIEW_ANALYTICS: ["admin"],
  MANAGE_ADS: ["admin"],

  // Student permissions
  APPLY_TO_COLLEGES: ["student"],
  VIEW_APPLICATIONS: ["student", "parent"],
  ACCESS_RESOURCES: ["student", "parent"],

  // Counselor permissions
  MANAGE_LEADS: ["admin", "counselor"],
  VIEW_STUDENT_DATA: ["counselor", "parent"],

  // College representative permissions
  MANAGE_COLLEGE_DATA: ["admin", "college_rep"],
  VIEW_APPLICATIONS: ["admin", "college_rep"],
} as const

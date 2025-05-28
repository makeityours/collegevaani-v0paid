import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import type { NextRequest } from "next/server"
import { config } from "@/lib/config/environment"
import { AuthenticationError, AuthorizationError } from "@/lib/errors/error-handler"

export interface TokenPayload {
  userId: string
  email: string
  role: string
}

export interface JWTAccessPayload extends TokenPayload {
  type: "access"
  iat: number
  exp: number
}

export interface JWTRefreshPayload extends TokenPayload {
  type: "refresh"
  iat: number
  exp: number
}

export class AuthService {
  // Generate access token
  static generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(
      { ...payload, type: "access" },
      config.auth.jwtSecret,
      { expiresIn: config.auth.jwtAccessExpiresIn }
    )
  }

  // Generate refresh token
  static generateRefreshToken(payload: TokenPayload): string {
    return jwt.sign(
      { ...payload, type: "refresh" },
      config.auth.jwtRefreshSecret,
      { expiresIn: config.auth.jwtRefreshExpiresIn }
    )
  }

  // Generate token pair
  static generateTokenPair(payload: TokenPayload): { accessToken: string; refreshToken: string } {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    }
  }

  // Verify access token
  static verifyAccessToken(token: string): JWTAccessPayload {
    try {
      const payload = jwt.verify(token, config.auth.jwtSecret) as JWTAccessPayload
      
      // Validate token type
      if (payload.type !== "access") {
        throw new AuthenticationError("Invalid token type")
      }
      
      return payload
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new AuthenticationError("Access token expired")
      }
      throw new AuthenticationError("Invalid access token")
    }
  }

  // Verify refresh token
  static verifyRefreshToken(token: string): JWTRefreshPayload {
    try {
      const payload = jwt.verify(token, config.auth.jwtRefreshSecret) as JWTRefreshPayload
      
      // Validate token type
      if (payload.type !== "refresh") {
        throw new AuthenticationError("Invalid token type")
      }
      
      return payload
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new AuthenticationError("Refresh token expired")
      }
      throw new AuthenticationError("Invalid refresh token")
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

  // Extract access token from request
  static extractAccessTokenFromRequest(request: NextRequest): string | null {
    // Try to get token from Authorization header
    const authHeader = request.headers.get("authorization")
    if (authHeader && authHeader.startsWith("Bearer ")) {
      return authHeader.substring(7)
    }
    
    // Try to get token from cookie as fallback
    const cookies = request.cookies
    const tokenCookie = cookies.get("access_token")
    if (tokenCookie) {
      return tokenCookie.value
    }
    
    return null
  }

  // Extract refresh token from request
  static extractRefreshTokenFromRequest(request: NextRequest): string | null {
    // Try to get token from Authorization header with refresh prefix
    const authHeader = request.headers.get("authorization")
    if (authHeader && authHeader.startsWith("Refresh ")) {
      return authHeader.substring(8)
    }
    
    // Try to get token from cookie as fallback
    const cookies = request.cookies
    const tokenCookie = cookies.get("refresh_token")
    if (tokenCookie) {
      return tokenCookie.value
    }
    
    return null
  }

  // Get user from request using access token
  static async getUserFromRequest(request: NextRequest): Promise<JWTAccessPayload> {
    const token = this.extractAccessTokenFromRequest(request)
    if (!token) {
      throw new AuthenticationError("No access token provided")
    }

    return this.verifyAccessToken(token)
  }

  // Check if user has required role
  static checkRole(userRole: string, requiredRoles: string[]): boolean {
    return requiredRoles.includes(userRole)
  }

  // Middleware for protected routes
  static async requireAuth(request: NextRequest, requiredRoles?: string[]): Promise<JWTAccessPayload> {
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

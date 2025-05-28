import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { sql } from "@/lib/database/connection"
import { AuthService } from "@/lib/auth/auth-service"
import { VerificationService } from "@/lib/auth/verification-service"
import { EmailService } from "@/lib/utils/email-service"
import { asyncHandler } from "@/lib/errors/error-handler"
import { rateLimiters } from "@/lib/middleware/rate-limiter"
import { ValidationError } from "@/lib/errors/error-handler"
import { logger } from "@/lib/monitoring/logger"

// Enhanced validation schema with better password requirements
const registerSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must be less than 100 characters"),
  email: z.string()
    .email("Please provide a valid email address")
    .toLowerCase(),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
  phone: z.string().optional(),
  role: z.enum(["student", "parent", "counselor"]).default("student"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const POST = asyncHandler(async (request: NextRequest) => {
  // Apply rate limiting for registration
  await rateLimiters.auth.check(request);

  const body = await request.json();
  const validatedData = registerSchema.parse(body);

  // Check if user already exists
  const existingUser = await sql`
    SELECT id FROM users WHERE email = ${validatedData.email}
  `;

  if (existingUser.length > 0) {
    throw new ValidationError("User with this email already exists");
  }

  // Hash password
  const hashedPassword = await AuthService.hashPassword(validatedData.password);

  // Create user
  const result = await sql`
    INSERT INTO users (
      name, 
      email, 
      password_hash, 
      phone, 
      role, 
      created_at, 
      updated_at
    )
    VALUES (
      ${validatedData.name}, 
      ${validatedData.email}, 
      ${hashedPassword}, 
      ${validatedData.phone || null}, 
      ${validatedData.role}, 
      NOW(), 
      NOW()
    )
    RETURNING id, name, email, role, is_verified, created_at
  `;

  const user = result[0];

  // Generate token pair
  const tokens = AuthService.generateTokenPair({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  // Store refresh token in database
  await sql`
    INSERT INTO user_refresh_tokens (user_id, token, expires_at)
    VALUES (${user.id}, ${tokens.refreshToken}, NOW() + INTERVAL '7 days')
  `;

  // Generate verification token and send verification email
  try {
    const verificationToken = await VerificationService.generateVerificationToken(user.id);
    
    // Send verification email
    await EmailService.sendVerificationEmail(
      user.email, 
      user.name, 
      user.id, 
      verificationToken
    );
    
    logger.info('Verification email sent to new user', {
      metadata: { userId: user.id, email: user.email }
    });
    
    // Send welcome email
    await EmailService.sendWelcomeEmail(user.email, user.name);
  } catch (error) {
    // Log error but don't fail registration if email sending fails
    logger.error('Failed to send verification email', error as Error, {
      metadata: { userId: user.id, email: user.email }
    });
  }

  // Create response with tokens
  const response = NextResponse.json(
    {
      success: true,
      message: "User registered successfully",
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.is_verified,
      },
    },
    { status: 201 }
  );

  // Set HTTP-only cookies for enhanced security
  response.cookies.set({
    name: "access_token",
    value: tokens.accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60, // 15 minutes in seconds
    path: "/",
  });

  response.cookies.set({
    name: "refresh_token",
    value: tokens.refreshToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    path: "/api/auth/refresh", // Restrict to refresh endpoint only
  });

  return response;
});

import { NextResponse } from "next/server"
import { ZodError } from "zod"

// Custom error classes
export class AppError extends Error {
  public statusCode: number
  public isOperational: boolean
  public code?: string

  constructor(message: string, statusCode = 500, code?: string) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
    this.code = code

    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, "VALIDATION_ERROR")
  }
}

export class AuthenticationError extends AppError {
  constructor(message = "Authentication required") {
    super(message, 401, "AUTHENTICATION_ERROR")
  }
}

export class AuthorizationError extends AppError {
  constructor(message = "Insufficient permissions") {
    super(message, 403, "AUTHORIZATION_ERROR")
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404, "NOT_FOUND_ERROR")
  }
}

export class RateLimitError extends AppError {
  constructor(message = "Rate limit exceeded") {
    super(message, 429, "RATE_LIMIT_ERROR")
  }
}

// Error response formatter
export function formatErrorResponse(error: unknown) {
  console.error("API Error:", error)

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        success: false,
        error: "Validation failed",
        code: "VALIDATION_ERROR",
        details: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      },
      { status: 400 },
    )
  }

  // Handle custom app errors
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        code: error.code,
      },
      { status: error.statusCode },
    )
  }

  // Handle unknown errors
  return NextResponse.json(
    {
      success: false,
      error: "Internal server error",
      code: "INTERNAL_ERROR",
    },
    { status: 500 },
  )
}

// Async error wrapper for API routes
export function asyncHandler(fn: Function) {
  return async (req: Request, context?: any) => {
    try {
      return await fn(req, context)
    } catch (error) {
      return formatErrorResponse(error)
    }
  }
}

// Error logging service
export class ErrorLogger {
  static log(error: Error, context?: Record<string, any>) {
    const errorInfo = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      context,
    }

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error:", errorInfo)
    }

    // Send to external logging service in production
    if (process.env.NODE_ENV === "production") {
      // Send to Sentry, LogRocket, or other logging service
      this.sendToExternalService(errorInfo)
    }
  }

  private static async sendToExternalService(errorInfo: any) {
    // Implementation for external logging service
    // Example: Sentry, LogRocket, etc.
  }
}

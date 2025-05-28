import { NextResponse } from "next/server"
import { ZodError } from "zod"
import { logger } from "@/lib/monitoring/logger"
import { trackException } from "@/lib/monitoring/sentry"

// Custom error classes
export class AppError extends Error {
  public statusCode: number
  public isOperational: boolean
  public code?: string
  public data?: any

  constructor(message: string, statusCode = 500, code?: string, data?: any) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
    this.code = code
    this.data = data

    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends AppError {
  constructor(message: string, data?: any) {
    super(message, 400, "VALIDATION_ERROR", data)
  }
}

export class AuthenticationError extends AppError {
  constructor(message = "Authentication required", data?: any) {
    super(message, 401, "AUTHENTICATION_ERROR", data)
  }
}

export class AuthorizationError extends AppError {
  constructor(message = "Insufficient permissions", data?: any) {
    super(message, 403, "AUTHORIZATION_ERROR", data)
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found", data?: any) {
    super(message, 404, "NOT_FOUND_ERROR", data)
  }
}

export interface RateLimitErrorData {
  limit: number;
  current: number;
  remaining: number;
  reset: number;
}

export class RateLimitError extends AppError {
  constructor(message = "Rate limit exceeded", data?: RateLimitErrorData) {
    super(message, 429, "RATE_LIMIT_ERROR", data)
  }
}

// Error response formatter
export function formatErrorResponse(error: unknown) {
  // Log the error with appropriate severity and track in Sentry
  logError(error)

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
    const response = NextResponse.json(
      {
        success: false,
        error: error.message,
        code: error.code,
        ...(error.data ? { data: error.data } : {}),
      },
      { status: error.statusCode },
    )

    // Add rate limit headers if it's a rate limit error
    if (error instanceof RateLimitError && error.data) {
      const data = error.data as RateLimitErrorData
      response.headers.set('X-RateLimit-Limit', data.limit.toString())
      response.headers.set('X-RateLimit-Remaining', data.remaining.toString())
      response.headers.set('X-RateLimit-Reset', data.reset.toString())
      response.headers.set('Retry-After', data.reset.toString())
    }

    return response
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

// Helper function to log errors based on their type
function logError(error: unknown) {
  if (error instanceof ValidationError) {
    logger.warn(`Validation error: ${error.message}`, {
      metadata: {
        errorCode: error.code,
        errorData: error.data,
      },
    })
  } else if (error instanceof AuthenticationError) {
    logger.warn(`Authentication error: ${error.message}`, {
      metadata: {
        errorCode: error.code,
        errorData: error.data,
      },
    })
  } else if (error instanceof AuthorizationError) {
    logger.warn(`Authorization error: ${error.message}`, {
      metadata: {
        errorCode: error.code,
        errorData: error.data,
      },
    })
  } else if (error instanceof RateLimitError) {
    logger.warn(`Rate limit error: ${error.message}`, {
      metadata: {
        errorCode: error.code,
        errorData: error.data,
      },
    })
  } else if (error instanceof AppError) {
    logger.error(`Application error: ${error.message}`, error as Error, {
      metadata: {
        errorCode: error.code,
        errorData: error.data,
        statusCode: error.statusCode,
      },
    })

    // Only track non-operational errors in Sentry
    if (!error.isOperational) {
      trackException(error, {
        errorCode: error.code,
        errorData: error.data,
        statusCode: error.statusCode,
      })
    }
  } else if (error instanceof ZodError) {
    logger.warn(`Zod validation error`, {
      metadata: {
        errors: error.errors,
      },
    })
  } else if (error instanceof Error) {
    logger.error(`Unexpected error: ${error.message}`, error, {
      metadata: {
        errorName: error.name,
      },
    })

    // Track unexpected errors in Sentry
    trackException(error, {
      errorName: error.name,
    })
  } else {
    logger.error(`Unknown error type`, undefined, {
      metadata: {
        error,
      },
    })

    // Track unknown errors in Sentry
    trackException(new Error('Unknown error type'), {
      originalError: error,
    })
  }
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

// Legacy error logging service - use logger instead
export class ErrorLogger {
  static log(error: Error, context?: Record<string, any>) {
    logger.error(`Legacy error logger: ${error.message}`, error, {
      metadata: context,
    })

    // Also track in Sentry
    trackException(error, context)
  }

  private static async sendToExternalService(errorInfo: any) {
    // Implementation for external logging service
    // Would be implemented with Sentry or similar service
    try {
      // We now use Sentry directly
      logger.info("Error sent to external service")
    } catch (err) {
      logger.error("Failed to send error to external service", err as Error)
    }
  }
}

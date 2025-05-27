import type { NextRequest } from "next/server"
import { RateLimitError } from "@/lib/errors/error-handler"

interface RateLimitConfig {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Maximum requests per window
  message?: string
}

// In-memory store for development (use Redis in production)
const requestCounts = new Map<string, { count: number; resetTime: number }>()

export class RateLimiter {
  private config: RateLimitConfig

  constructor(config: RateLimitConfig) {
    this.config = config
  }

  // Get client identifier
  private getClientId(request: NextRequest): string {
    // Use IP address as identifier
    const forwarded = request.headers.get("x-forwarded-for")
    const ip = forwarded ? forwarded.split(",")[0] : request.ip || "unknown"
    return ip
  }

  // Check rate limit
  async checkRateLimit(request: NextRequest): Promise<void> {
    const clientId = this.getClientId(request)
    const now = Date.now()
    const windowStart = now - this.config.windowMs

    // Get current count for client
    const clientData = requestCounts.get(clientId)

    if (!clientData || clientData.resetTime <= now) {
      // First request or window expired
      requestCounts.set(clientId, {
        count: 1,
        resetTime: now + this.config.windowMs,
      })
      return
    }

    if (clientData.count >= this.config.maxRequests) {
      throw new RateLimitError(this.config.message || "Rate limit exceeded")
    }

    // Increment count
    clientData.count++
    requestCounts.set(clientId, clientData)
  }

  // Middleware function
  middleware() {
    return async (request: NextRequest) => {
      await this.checkRateLimit(request)
    }
  }
}

// Predefined rate limiters
export const rateLimiters = {
  // General API rate limiter
  general: new RateLimiter({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100,
    message: "Too many requests, please try again later",
  }),

  // Authentication rate limiter
  auth: new RateLimiter({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 5,
    message: "Too many authentication attempts, please try again later",
  }),

  // Payment rate limiter
  payment: new RateLimiter({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10,
    message: "Too many payment requests, please try again later",
  }),

  // Admin rate limiter
  admin: new RateLimiter({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 200,
    message: "Admin rate limit exceeded",
  }),
}

// Export the main rate limiting function
export const rateLimit = (config: RateLimitConfig) => {
  const limiter = new RateLimiter(config)
  return limiter.middleware()
}

// Export default rate limiter for general use
export const defaultRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100,
  message: "Too many requests, please try again later",
})

import type { NextRequest } from "next/server"
import { RateLimitError } from "@/lib/errors/error-handler"
import { config } from "@/lib/config/environment"
import { logger } from "@/lib/monitoring/logger"

interface RateLimitOptions {
  windowMs?: number // Time window in milliseconds
  maxRequests?: number // Maximum requests per window
  message?: string
  prefix?: string // Key prefix for Redis
}

// Redis client type
type RedisClientType = any

// In-memory store for development and testing
const localRequestCounts = new Map<string, { count: number; resetTime: number }>()

// Redis client for production (initialized lazily)
let redisClient: RedisClientType = null

/**
 * Initialize Redis client for rate limiting (only in production)
 */
async function getRedisClient(): Promise<RedisClientType> {
  if (process.env.NODE_ENV !== 'production' || !process.env.REDIS_URL) {
    return null
  }

  if (redisClient) {
    return redisClient
  }

  try {
    // Dynamic import to avoid including Redis in development bundle
    const redis = await import('redis').catch(() => null)
    
    if (!redis) {
      logger.warn('Redis module not available')
      return null
    }
    
    redisClient = redis.createClient({
      url: process.env.REDIS_URL,
    })

    await redisClient.connect()
    
    // Handle Redis connection errors
    redisClient.on('error', (err: Error) => {
      logger.error('Redis client error', err)
    })

    return redisClient
  } catch (error) {
    logger.error('Failed to initialize Redis client', error as Error)
    return null
  }
}

export class RateLimiter {
  private windowMs: number
  private maxRequests: number
  private message: string
  private prefix: string

  constructor(options: RateLimitOptions = {}) {
    this.windowMs = options.windowMs || config.security.rateLimit.windowMs
    this.maxRequests = options.maxRequests || config.security.rateLimit.max
    this.message = options.message || "Too many requests, please try again later"
    this.prefix = options.prefix || "ratelimit:"
  }

  // Get client identifier
  private getClientId(request: NextRequest): string {
    // Use forwarded IP or direct IP as identifier
    const forwarded = request.headers.get("x-forwarded-for")
    const remoteIp = request.headers.get("x-real-ip") || "unknown"
    const ip = forwarded ? forwarded.split(",")[0].trim() : remoteIp
    
    // Get the route path for more granular rate limiting
    const url = new URL(request.url)
    const path = url.pathname
    
    // Create a composite key using IP and path
    return `${ip}:${path}`
  }

  // Check rate limit with Redis in production
  async check(request: NextRequest): Promise<void> {
    const clientId = this.getClientId(request)
    const now = Date.now()
    const redis = await getRedisClient()

    // Use Redis in production, memory store in development
    if (redis) {
      try {
        const key = `${this.prefix}${clientId}`
        const windowStartMs = Math.floor(now / this.windowMs) * this.windowMs
        const windowExpireSeconds = Math.ceil(this.windowMs / 1000)
        
        // Increment counter in Redis
        const count = await redis.incr(key)
        
        // Set expiration if this is the first request in the window
        if (count === 1) {
          await redis.expire(key, windowExpireSeconds)
        }
        
        // Get time to expiration for headers
        const ttl = await redis.ttl(key)
        
        // Check if rate limit is exceeded
        if (count > this.maxRequests) {
          throw new RateLimitError(this.message, {
            limit: this.maxRequests,
            current: count,
            remaining: 0,
            reset: ttl,
          })
        }
      } catch (error) {
        // Fallback to in-memory if Redis fails (don't block requests)
        if (!(error instanceof RateLimitError)) {
          logger.error('Redis rate limiting error', error as Error)
          await this.checkWithMemoryStore(clientId, now)
        } else {
          throw error
        }
      }
    } else {
      // Use in-memory store in development or if Redis is unavailable
      await this.checkWithMemoryStore(clientId, now)
    }
  }

  // In-memory rate limiting implementation
  private async checkWithMemoryStore(clientId: string, now: number): Promise<void> {
    // Get current count for client
    const clientData = localRequestCounts.get(clientId)

    if (!clientData || clientData.resetTime <= now) {
      // First request or window expired
      localRequestCounts.set(clientId, {
        count: 1,
        resetTime: now + this.windowMs,
      })
      return
    }

    if (clientData.count >= this.maxRequests) {
      // Set rate limit headers
      const reset = Math.ceil((clientData.resetTime - now) / 1000)
      throw new RateLimitError(this.message, {
        limit: this.maxRequests,
        current: clientData.count,
        remaining: 0,
        reset,
      })
    }

    // Increment count
    clientData.count++
    localRequestCounts.set(clientId, clientData)
  }
}

// Predefined rate limiters
const rateLimiters = {
  // General API rate limiter
  general: new RateLimiter({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100,
    prefix: "ratelimit:general:",
  }),

  // Authentication rate limiter
  auth: new RateLimiter({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 5,
    message: "Too many authentication attempts, please try again later",
    prefix: "ratelimit:auth:",
  }),

  // Payment rate limiter
  payment: new RateLimiter({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10,
    message: "Too many payment requests, please try again later",
    prefix: "ratelimit:payment:",
  }),

  // Admin rate limiter
  admin: new RateLimiter({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 200,
    message: "Admin rate limit exceeded",
    prefix: "ratelimit:admin:",
  }),
}

/**
 * Rate limiting middleware
 * @param request The Next.js request object
 * @param options Optional rate limit options to override defaults
 */
export async function rateLimit(
  request: NextRequest, 
  options: RateLimitOptions = {}
): Promise<void> {
  const limiter = new RateLimiter(options)
  await limiter.check(request)
}

// Export for direct use in middleware
export { rateLimiters }

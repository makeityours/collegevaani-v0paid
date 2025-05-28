import { NextResponse, NextRequest } from "next/server"
import { rateLimit } from "@/lib/middleware/rate-limiter"
import { logger } from "@/lib/monitoring/logger"

/**
 * Next.js Middleware for security and routing
 */
export async function middleware(request: NextRequest) {
  const start = Date.now()
  const { pathname } = request.nextUrl

  // Skip middleware for bypassed paths
  const BYPASS_PATHS = [
    "/favicon.ico", 
    "/_next/", 
    "/api/health",
    "/public/",
    "/images/",
    "/uploads/"
  ]

  // Paths that should bypass rate limiting
  const BYPASS_RATE_LIMIT_PATHS = [
    "/api/health",
    "/_next/static/",
    "/public/",
    "/images/",
    "/favicon.ico",
  ]

  if (BYPASS_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // Apply rate limiting for API routes
  if (pathname.startsWith("/api/") && !BYPASS_RATE_LIMIT_PATHS.some(path => pathname.startsWith(path))) {
    try {
      // Apply general rate limiting
      await rateLimit(request)
      
      // Special rate limiting for sensitive endpoints
      if (pathname.startsWith("/api/auth")) {
        await rateLimit(request, {
          windowMs: 60 * 1000, // 1 minute
          maxRequests: 5,
          message: "Too many authentication attempts, please try again later",
        })
      } else if (pathname.startsWith("/api/payments")) {
        await rateLimit(request, {
          windowMs: 60 * 1000, // 1 minute
          maxRequests: 10,
          message: "Too many payment requests, please try again later",
        })
      }
    } catch (error) {
      // Rate limit exceeded
      return NextResponse.json(
        {
          success: false,
          error: (error as Error).message || "Too many requests",
        },
        { 
          status: 429,
          headers: {
            "Retry-After": "60",
          }
        }
      )
    }
  }

  try {
    // Continue with the request
    const response = NextResponse.next()
    
    // Add security headers
    const secureResponse = addSecurityHeaders(response)
    
    // Add server timing header in development
    if (process.env.NODE_ENV === "development") {
      const duration = Date.now() - start
      secureResponse.headers.set("Server-Timing", `middleware;dur=${duration}`)
    }
    
    return secureResponse
  } catch (error) {
    // Log middleware errors
    logger.error("Middleware error", error as Error)
    
    // Continue with the request
    return NextResponse.next()
  }
}

/**
 * Apply security headers to enhance protection
 */
function addSecurityHeaders(response: NextResponse): NextResponse {
  // Content Security Policy
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com https://analytics.google.com; connect-src 'self' https://*.razorpay.com https://sentry.io; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' data:; frame-src 'self' https://checkout.razorpay.com; frame-ancestors 'self';"
  )

  // Other security headers
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  )

  // In production, enable strict transport security
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    )
  }

  return response
}

/**
 * Configure which paths should be processed by this middleware
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
} 
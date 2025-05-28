import { NextResponse } from "next/server"
import { sql } from "@/lib/database/connection"
import { logger } from "@/lib/monitoring/logger"

/**
 * Health check endpoint for monitoring and deployment checks
 * GET /api/health
 */
export async function GET() {
  try {
    // Check database connection
    const dbStart = performance.now()
    const dbResult = await sql`SELECT 1 as health_check`
    const dbDuration = Math.round(performance.now() - dbStart)
    const dbHealth = dbResult?.[0]?.health_check === 1

    // Check environment variables
    const envHealth = checkEnvVariables()

    // System information
    const systemInfo = {
      uptime: Math.round(process.uptime()),
      timestamp: Date.now(),
      nodeVersion: process.version,
      env: process.env.NODE_ENV,
      memoryUsage: process.memoryUsage(),
    }

    // Overall health status
    const isHealthy = dbHealth && envHealth.isHealthy

    // Status code based on health
    const statusCode = isHealthy ? 200 : 503

    // Generate response
    const response = {
      status: isHealthy ? "healthy" : "unhealthy",
      version: process.env.npm_package_version || "1.0.0",
      services: {
        database: {
          status: dbHealth ? "connected" : "disconnected",
          responseTime: `${dbDuration}ms`,
        },
        environment: envHealth,
      },
      system: systemInfo,
    }

    // Log health check result
    if (!isHealthy) {
      logger.warn("Health check failed", { metadata: response })
    }

    return NextResponse.json(response, { status: statusCode })
  } catch (error) {
    logger.error("Health check error", error as Error)
    
    return NextResponse.json(
      {
        status: "error",
        error: "Health check failed",
        message: (error as Error).message,
      },
      { status: 500 }
    )
  }
}

/**
 * Check if required environment variables are set
 */
function checkEnvVariables() {
  const requiredVars = [
    "DATABASE_URL",
    "JWT_SECRET",
    "NEXT_PUBLIC_RAZORPAY_KEY_ID",
    "RAZORPAY_KEY_SECRET",
  ]

  const missingVars = requiredVars.filter(varName => !process.env[varName])

  return {
    isHealthy: missingVars.length === 0,
    missingVariables: missingVars.length > 0 ? missingVars : undefined,
  }
}

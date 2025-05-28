import { z } from "zod"

// Environment variable schema validation
const envSchema = z.object({
  // App Configuration
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),

  // Database
  DATABASE_URL: z.string().url(),

  // Authentication
  JWT_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32).optional(),
  JWT_ACCESS_EXPIRES_IN: z.string().default("15m"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),

  // Payment Gateway
  NEXT_PUBLIC_RAZORPAY_KEY_ID: z.string(),
  RAZORPAY_KEY_SECRET: z.string(),
  RAZORPAY_WEBHOOK_SECRET: z.string(),

  // External APIs
  HUBSPOT_API_KEY: z.string().optional(),
  GA_MEASUREMENT_ID: z.string().optional(),
  GA_API_SECRET: z.string().optional(),

  // Admin
  ADMIN_EMAIL: z.string().email().optional(),
  
  // Security
  CORS_ORIGINS: z.string().optional(),
  RATE_LIMIT_MAX: z.coerce.number().default(100),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60000),
  
  // Monitoring
  SENTRY_DSN: z.string().url().optional(),
  LOG_LEVEL: z.enum(["error", "warn", "info", "http", "verbose", "debug", "silly"]).default("info"),
})

// Safe environment parsing with fallbacks
function parseEnvironment() {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    console.warn("Environment validation failed:", error)
    
    // In production, throw error if environment validation fails
    if (process.env.NODE_ENV === "production") {
      throw new Error("Critical environment variables missing or invalid");
    }
    
    return {
      NODE_ENV: process.env.NODE_ENV || "development",
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      DATABASE_URL: process.env.DATABASE_URL || "",
      JWT_SECRET: process.env.JWT_SECRET || "fallback-jwt-secret-for-development-only-do-not-use-in-production",
      JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "fallback-refresh-secret-for-development-only",
      JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
      JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
      NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
      RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET || "",
      RAZORPAY_WEBHOOK_SECRET: process.env.RAZORPAY_WEBHOOK_SECRET || "",
      HUBSPOT_API_KEY: process.env.HUBSPOT_API_KEY || "",
      GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID || "",
      GA_API_SECRET: process.env.GA_API_SECRET || "",
      ADMIN_EMAIL: process.env.ADMIN_EMAIL || "admin@collegevaani.com",
      CORS_ORIGINS: process.env.CORS_ORIGINS || "*",
      RATE_LIMIT_MAX: Number(process.env.RATE_LIMIT_MAX) || 100,
      RATE_LIMIT_WINDOW_MS: Number(process.env.RATE_LIMIT_WINDOW_MS) || 60000,
      SENTRY_DSN: process.env.SENTRY_DSN || "",
      LOG_LEVEL: process.env.LOG_LEVEL || "info",
    }
  }
}

const env = parseEnvironment()

export default env

// Configuration object
export const config = {
  app: {
    name: "CollegeVaani",
    version: "1.0.0",
    url: env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    env: env.NODE_ENV,
  },
  database: {
    url: env.DATABASE_URL,
  },
  auth: {
    jwtSecret: env.JWT_SECRET,
    jwtRefreshSecret: env.JWT_REFRESH_SECRET || env.JWT_SECRET,
    jwtAccessExpiresIn: env.JWT_ACCESS_EXPIRES_IN,
    jwtRefreshExpiresIn: env.JWT_REFRESH_EXPIRES_IN,
  },
  payment: {
    razorpay: {
      keyId: env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      keySecret: env.RAZORPAY_KEY_SECRET,
      webhookSecret: env.RAZORPAY_WEBHOOK_SECRET,
    },
  },
  external: {
    hubspot: {
      apiKey: env.HUBSPOT_API_KEY,
    },
    googleAnalytics: {
      measurementId: env.GA_MEASUREMENT_ID,
      apiSecret: env.GA_API_SECRET,
    },
  },
  admin: {
    email: env.ADMIN_EMAIL || "admin@collegevaani.com",
  },
  security: {
    corsOrigins: env.CORS_ORIGINS?.split(",") || ["*"],
    rateLimit: {
      max: env.RATE_LIMIT_MAX,
      windowMs: env.RATE_LIMIT_WINDOW_MS,
    }
  },
  monitoring: {
    sentryDsn: env.SENTRY_DSN,
    logLevel: env.LOG_LEVEL,
  }
} as const

import { z } from "zod"

// Environment variable schema validation
const envSchema = z.object({
  // App Configuration
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),

  // Database
  DATABASE_URL: z.string().url(),

  // Authentication
  JWT_SECRET: z.string().min(32).optional(),

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
})

// Safe environment parsing with fallbacks
function parseEnvironment() {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    console.warn("Environment validation failed, using fallbacks:", error)
    return {
      NODE_ENV: process.env.NODE_ENV || "development",
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      DATABASE_URL: process.env.DATABASE_URL || "",
      JWT_SECRET: process.env.JWT_SECRET || "fallback-jwt-secret-for-development",
      NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
      RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET || "",
      RAZORPAY_WEBHOOK_SECRET: process.env.RAZORPAY_WEBHOOK_SECRET || "",
      HUBSPOT_API_KEY: process.env.HUBSPOT_API_KEY || "",
      GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID || "",
      GA_API_SECRET: process.env.GA_API_SECRET || "",
      ADMIN_EMAIL: process.env.ADMIN_EMAIL || "admin@collegevaani.com",
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
    jwtSecret: env.JWT_SECRET || "fallback-secret",
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
} as const

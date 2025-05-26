import { z } from "zod"

// Secure environment variable schema - no sensitive client-side variables
const secureEnvSchema = z.object({
  // App Configuration
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),

  // Database
  DATABASE_URL: z.string().url(),

  // Authentication (Server-side only)
  JWT_SECRET: z.string().min(32).optional(),

  // Payment Gateway (Server-side secrets only)
  NEXT_PUBLIC_RAZORPAY_KEY_ID: z.string(), // Only public key ID
  RAZORPAY_KEY_SECRET: z.string(), // Server-side only
  RAZORPAY_WEBHOOK_SECRET: z.string(), // Server-side only

  // External APIs (Server-side only)
  HUBSPOT_API_KEY: z.string().optional(),
  GA_MEASUREMENT_ID: z.string().optional(),
  GA_API_SECRET: z.string().optional(),

  // Admin
  ADMIN_EMAIL: z.string().email().optional(),
})

// Validate environment variables
const secureEnv = secureEnvSchema.parse(process.env)

export default secureEnv

// Secure configuration object
export const secureConfig = {
  app: {
    name: "CollegeVaani",
    version: "1.0.0",
    url: secureEnv.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    env: secureEnv.NODE_ENV,
  },
  database: {
    url: secureEnv.DATABASE_URL,
  },
  auth: {
    jwtSecret: secureEnv.JWT_SECRET || "fallback-secret",
  },
  payment: {
    razorpay: {
      // Only public key ID is accessible
      publicKeyId: secureEnv.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      // Server-side secrets (never exposed to client)
      keySecret: secureEnv.RAZORPAY_KEY_SECRET,
      webhookSecret: secureEnv.RAZORPAY_WEBHOOK_SECRET,
    },
  },
  external: {
    hubspot: {
      apiKey: secureEnv.HUBSPOT_API_KEY,
    },
    googleAnalytics: {
      measurementId: secureEnv.GA_MEASUREMENT_ID,
      apiSecret: secureEnv.GA_API_SECRET,
    },
  },
  admin: {
    email: secureEnv.ADMIN_EMAIL || "admin@collegevaani.com",
  },
} as const

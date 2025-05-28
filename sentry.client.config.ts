import * as Sentry from "@sentry/nextjs";
import { config } from "@/lib/config/environment";

// Initialize Sentry for client-side error tracking
Sentry.init({
  dsn: config.monitoring.sentryDsn,
  
  // Set the environment based on NODE_ENV
  environment: config.app.env,
  
  // Performance monitoring
  tracesSampleRate: config.app.env === "production" ? 0.1 : 1.0,
  
  // Only enable in production and staging
  enabled: ["production", "staging"].includes(config.app.env),
  
  // Browser-specific integrations
  integrations: [
    // Add client-side integrations that are available
  ],
  
  // Performance monitoring for frontend
  // Capture 10% of all pageloads, but 50% of error pages
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 0.5,
  
  // Ignore specific errors (like missing resources)
  ignoreErrors: [
    "Network request failed",
    "Load failed",
    "top.GLOBALS",
    // Add more error messages to ignore
  ],
  
  // Helpful for debugging
  beforeSend(event) {
    // Don't send events in development
    if (process.env.NODE_ENV === "development") {
      return null;
    }
    
    return event;
  },
}); 
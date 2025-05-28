import * as Sentry from "@sentry/nextjs";
import { config } from "@/lib/config/environment";

// Initialize Sentry for server-side error tracking
Sentry.init({
  dsn: config.monitoring.sentryDsn,
  
  // Set the environment based on NODE_ENV
  environment: config.app.env,
  
  // Performance monitoring
  tracesSampleRate: config.app.env === "production" ? 0.1 : 1.0,
  
  // Only enable in production and staging
  enabled: ["production", "staging"].includes(config.app.env),
  
  // Adjust this to control how much information is included in the report
  tracesSampler: (samplingContext) => {
    if (samplingContext.request?.url?.includes("health")) {
      return 0; // Don't sample health check endpoints
    }
    if (samplingContext.request?.url?.includes("api")) {
      return 0.5; // Sample 50% of API requests
    }
    return 0.1; // Sample 10% of other transactions
  },
}); 
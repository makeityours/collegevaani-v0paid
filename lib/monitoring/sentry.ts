import * as Sentry from '@sentry/nextjs';
import { config } from '@/lib/config/environment';
import { logger } from './logger';

/**
 * Initialize Sentry for error tracking
 */
export function initSentry(): void {
  if (!config.monitoring.sentryDsn) {
    logger.warn('Sentry DSN not configured. Error tracking disabled.');
    return;
  }

  try {
    Sentry.init({
      dsn: config.monitoring.sentryDsn,
      environment: config.app.env,
      tracesSampleRate: 1.0,
      integrations: [
        // Add any custom integrations here
      ],
      // Performance monitoring options
      performanceMonitoring: {
        tracePropagationTargets: ['localhost', /^https:\/\/collegevaani\.com/],
      },
      // Only enable in production and staging
      enabled: ['production', 'staging'].includes(config.app.env),
      // Capture unhandled promises
      autoSessionTracking: true,
    });

    logger.info('Sentry initialized successfully');
  } catch (error) {
    logger.error('Failed to initialize Sentry', error as Error);
  }
}

/**
 * Track an exception in Sentry
 */
export function trackException(error: Error, context?: Record<string, any>): void {
  if (!config.monitoring.sentryDsn || !['production', 'staging'].includes(config.app.env)) {
    // Just log locally in development
    logger.error(`Exception: ${error.message}`, error);
    return;
  }

  try {
    Sentry.captureException(error, {
      extra: context,
    });
  } catch (sentryError) {
    logger.error('Failed to track exception in Sentry', sentryError as Error);
  }
}

/**
 * Track a custom message in Sentry
 */
export function trackMessage(message: string, level: Sentry.SeverityLevel = 'info', context?: Record<string, any>): void {
  if (!config.monitoring.sentryDsn || !['production', 'staging'].includes(config.app.env)) {
    // Just log locally in development
    logger.info(`Custom message: ${message}`, { metadata: context });
    return;
  }

  try {
    Sentry.captureMessage(message, {
      level,
      extra: context,
    });
  } catch (sentryError) {
    logger.error('Failed to track message in Sentry', sentryError as Error);
  }
}

/**
 * Set user information for Sentry events
 */
export function setUser(user: { id: string; email?: string; username?: string }): void {
  if (!config.monitoring.sentryDsn || !['production', 'staging'].includes(config.app.env)) {
    return;
  }

  try {
    Sentry.setUser(user);
  } catch (sentryError) {
    logger.error('Failed to set user context in Sentry', sentryError as Error);
  }
}

/**
 * Clear user information from Sentry
 */
export function clearUser(): void {
  if (!config.monitoring.sentryDsn || !['production', 'staging'].includes(config.app.env)) {
    return;
  }

  try {
    Sentry.setUser(null);
  } catch (sentryError) {
    logger.error('Failed to clear user context in Sentry', sentryError as Error);
  }
}

/**
 * Set extra context for Sentry events
 */
export function setContext(name: string, context: Record<string, any>): void {
  if (!config.monitoring.sentryDsn || !['production', 'staging'].includes(config.app.env)) {
    return;
  }

  try {
    Sentry.setContext(name, context);
  } catch (sentryError) {
    logger.error('Failed to set context in Sentry', sentryError as Error);
  }
}

/**
 * Set tags for Sentry events
 */
export function setTag(key: string, value: string): void {
  if (!config.monitoring.sentryDsn || !['production', 'staging'].includes(config.app.env)) {
    return;
  }

  try {
    Sentry.setTag(key, value);
  } catch (sentryError) {
    logger.error('Failed to set tag in Sentry', sentryError as Error);
  }
}

/**
 * Track a specific transaction for performance monitoring
 */
export function startTransaction(name: string, op: string): Sentry.Transaction | null {
  if (!config.monitoring.sentryDsn || !['production', 'staging'].includes(config.app.env)) {
    return null;
  }

  try {
    return Sentry.startTransaction({
      name,
      op,
    });
  } catch (sentryError) {
    logger.error('Failed to start transaction in Sentry', sentryError as Error);
    return null;
  }
} 
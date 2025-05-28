import { initSentry } from './sentry';
import { logger } from './logger';

/**
 * Initialize all monitoring services
 */
export function initMonitoring(): void {
  try {
    // Initialize Sentry for error tracking
    initSentry();
    
    logger.info('Monitoring services initialized successfully');
  } catch (error) {
    logger.error('Failed to initialize monitoring services', error as Error);
  }
}

/**
 * Shutdown monitoring services gracefully
 */
export function shutdownMonitoring(): void {
  try {
    // Add any cleanup logic for monitoring services here
    logger.info('Monitoring services shut down successfully');
  } catch (error) {
    logger.error('Failed to shut down monitoring services', error as Error);
  }
} 
import { config } from '@/lib/config/environment';

// Log levels in order of severity
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal',
}

// Map environment log level to numeric value for comparison
const LOG_LEVEL_VALUES: Record<string, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
  fatal: 4,
};

// Metadata interface for structured logging
interface LogMetadata {
  [key: string]: any;
}

// Options for logging
interface LogOptions {
  timestamp?: boolean;
  service?: string;
  metadata?: LogMetadata;
}

/**
 * Structured logger for application monitoring
 */
export class Logger {
  private static instance: Logger;
  private logLevel: string;
  private defaultOptions: LogOptions = {
    timestamp: true,
    service: 'collegevaani-api',
  };

  private constructor() {
    this.logLevel = config.monitoring.logLevel || 'info';
  }

  /**
   * Get logger instance (singleton)
   */
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  /**
   * Check if the log level should be logged
   */
  private shouldLog(level: LogLevel): boolean {
    const configLevelValue = LOG_LEVEL_VALUES[this.logLevel] || 1; // Default to INFO
    const messageLevelValue = LOG_LEVEL_VALUES[level] || 1;
    
    return messageLevelValue >= configLevelValue;
  }

  /**
   * Format log message with metadata
   */
  private formatLog(level: LogLevel, message: string, options?: LogOptions): any {
    const timestamp = options?.timestamp !== false ? new Date().toISOString() : undefined;
    const service = options?.service || this.defaultOptions.service;
    
    return {
      level,
      message,
      timestamp,
      service,
      ...(options?.metadata || {}),
    };
  }

  /**
   * Log a message with the DEBUG level
   */
  public debug(message: string, options?: LogOptions): void {
    if (!this.shouldLog(LogLevel.DEBUG)) return;
    
    const logData = this.formatLog(LogLevel.DEBUG, message, {
      ...this.defaultOptions,
      ...options,
    });
    
    if (process.env.NODE_ENV !== 'test') {
      console.debug(JSON.stringify(logData));
    }
  }

  /**
   * Log a message with the INFO level
   */
  public info(message: string, options?: LogOptions): void {
    if (!this.shouldLog(LogLevel.INFO)) return;
    
    const logData = this.formatLog(LogLevel.INFO, message, {
      ...this.defaultOptions,
      ...options,
    });
    
    if (process.env.NODE_ENV !== 'test') {
      console.info(JSON.stringify(logData));
    }
  }

  /**
   * Log a message with the WARN level
   */
  public warn(message: string, options?: LogOptions): void {
    if (!this.shouldLog(LogLevel.WARN)) return;
    
    const logData = this.formatLog(LogLevel.WARN, message, {
      ...this.defaultOptions,
      ...options,
    });
    
    if (process.env.NODE_ENV !== 'test') {
      console.warn(JSON.stringify(logData));
    }
  }

  /**
   * Log a message with the ERROR level
   */
  public error(message: string, error?: Error, options?: LogOptions): void {
    if (!this.shouldLog(LogLevel.ERROR)) return;
    
    const metadata = {
      ...(options?.metadata || {}),
      ...(error && {
        errorName: error.name,
        errorMessage: error.message,
        stack: error.stack,
      }),
    };
    
    const logData = this.formatLog(LogLevel.ERROR, message, {
      ...this.defaultOptions,
      ...options,
      metadata,
    });
    
    if (process.env.NODE_ENV !== 'test') {
      console.error(JSON.stringify(logData));
    }
  }

  /**
   * Log a message with the FATAL level (system critical)
   */
  public fatal(message: string, error?: Error, options?: LogOptions): void {
    if (!this.shouldLog(LogLevel.FATAL)) return;
    
    const metadata = {
      ...(options?.metadata || {}),
      ...(error && {
        errorName: error.name,
        errorMessage: error.message,
        stack: error.stack,
      }),
    };
    
    const logData = this.formatLog(LogLevel.FATAL, message, {
      ...this.defaultOptions,
      ...options,
      metadata,
    });
    
    if (process.env.NODE_ENV !== 'test') {
      console.error(JSON.stringify(logData));
    }
    
    // Here you could add additional logic for critical errors
    // e.g., send email alerts, notify team via Slack, etc.
  }

  /**
   * Create a child logger with predefined metadata
   */
  public child(metadata: LogMetadata): Logger {
    const childLogger = new Logger();
    childLogger.defaultOptions = {
      ...this.defaultOptions,
      metadata: {
        ...(this.defaultOptions.metadata || {}),
        ...metadata,
      },
    };
    
    return childLogger;
  }
}

// Export default logger instance
export const logger = Logger.getInstance(); 
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { trackException } from './sentry';
import { logger } from './logger';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary component to catch and handle React errors
 * Integrates with Sentry for error tracking
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to our monitoring service
    logger.error(`React error boundary caught an error: ${error.message}`, error, {
      metadata: {
        componentStack: errorInfo.componentStack,
      },
    });

    // Track in Sentry
    trackException(error, {
      componentStack: errorInfo.componentStack,
    });
  }

  render(): ReactNode {
    const { hasError } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      // You can render any custom fallback UI
      return fallback || (
        <div className="p-4 text-center">
          <div className="rounded-lg bg-red-50 p-6 shadow-sm dark:bg-red-900/10">
            <h2 className="mb-2 text-xl font-semibold text-red-700 dark:text-red-400">Something went wrong</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We&apos;ve logged the error and our team is working to fix the issue.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.href = '/';
              }}
              className="mt-4 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      );
    }

    return children;
  }
}

/**
 * Create a higher-order component (HOC) that wraps a component with an ErrorBoundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
): React.FC<P> {
  return (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );
} 
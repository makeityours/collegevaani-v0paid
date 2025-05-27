"use client"

interface ErrorInfo {
  message: string
  stack?: string
  componentStack?: string
  url: string
  userAgent: string
  userId?: string
  timestamp: number
  severity: "low" | "medium" | "high" | "critical"
  context?: Record<string, any>
}

class ErrorTracker {
  private apiEndpoint = "/api/errors/track"

  constructor() {
    if (typeof window !== "undefined") {
      this.initializeErrorTracking()
    }
  }

  private initializeErrorTracking() {
    // Global error handler
    window.addEventListener("error", (event) => {
      this.trackError({
        message: event.message,
        stack: event.error?.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: Date.now(),
        severity: "high",
        context: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        },
      })
    })

    // Unhandled promise rejection handler
    window.addEventListener("unhandledrejection", (event) => {
      this.trackError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: Date.now(),
        severity: "critical",
        context: {
          type: "unhandledrejection",
          reason: event.reason,
        },
      })
    })
  }

  async trackError(errorInfo: Partial<ErrorInfo>) {
    try {
      const fullErrorInfo: ErrorInfo = {
        message: "Unknown error",
        url: typeof window !== "undefined" ? window.location.href : "",
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        timestamp: Date.now(),
        severity: "medium",
        ...errorInfo,
      }

      // Send to backend
      await fetch(this.apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fullErrorInfo),
      })

      // Log to console in development
      if (process.env.NODE_ENV === "development") {
        console.error("Error tracked:", fullErrorInfo)
      }
    } catch (trackingError) {
      console.error("Failed to track error:", trackingError)
    }
  }

  // Public methods for manual error tracking
  trackApiError(endpoint: string, status: number, message: string) {
    this.trackError({
      message: `API Error: ${endpoint} - ${status} - ${message}`,
      severity: status >= 500 ? "critical" : "high",
      context: {
        type: "api_error",
        endpoint,
        status,
      },
    })
  }

  trackUserAction(action: string, context?: Record<string, any>) {
    this.trackError({
      message: `User Action: ${action}`,
      severity: "low",
      context: {
        type: "user_action",
        action,
        ...context,
      },
    })
  }

  trackPerformanceIssue(metric: string, value: number, threshold: number) {
    if (value > threshold) {
      this.trackError({
        message: `Performance Issue: ${metric} exceeded threshold`,
        severity: "medium",
        context: {
          type: "performance",
          metric,
          value,
          threshold,
        },
      })
    }
  }
}

export const errorTracker = new ErrorTracker()

// React Error Boundary component
import React from "react"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error }> },
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    errorTracker.trackError({
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      severity: "critical",
      context: {
        type: "react_error",
        errorInfo,
      },
    })
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return <FallbackComponent error={this.state.error!} />
    }

    return this.props.children
  }
}

function DefaultErrorFallback({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <div className="mt-3 text-center">
          <h3 className="text-lg font-medium text-gray-900">Something went wrong</h3>
          <div className="mt-2 text-sm text-gray-500">
            <p>We're sorry, but something unexpected happened. Our team has been notified.</p>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

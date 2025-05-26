import { config } from "@/lib/config/environment"

// Google Analytics 4 integration
export class Analytics {
  private static instance: Analytics
  private gtag: any

  private constructor() {
    if (typeof window !== "undefined") {
      this.initializeGA()
    }
  }

  static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics()
    }
    return Analytics.instance
  }

  private initializeGA() {
    // Load Google Analytics script
    const script = document.createElement("script")
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.external.googleAnalytics.measurementId}`
    document.head.appendChild(script)

    // Initialize gtag
    window.dataLayer = window.dataLayer || []
    this.gtag = function gtag() {
      window.dataLayer.push(arguments)
    }
    this.gtag("js", new Date())
    this.gtag("config", config.external.googleAnalytics.measurementId)
  }

  // Track page views
  trackPageView(url: string, title?: string) {
    if (this.gtag) {
      this.gtag("config", config.external.googleAnalytics.measurementId, {
        page_location: url,
        page_title: title,
      })
    }
  }

  // Track events
  trackEvent(eventName: string, parameters?: Record<string, any>) {
    if (this.gtag) {
      this.gtag("event", eventName, parameters)
    }
  }

  // Track conversions
  trackConversion(conversionId: string, value?: number, currency?: string) {
    if (this.gtag) {
      this.gtag("event", "conversion", {
        send_to: conversionId,
        value: value,
        currency: currency || "INR",
      })
    }
  }

  // Track user engagement
  trackEngagement(action: string, category: string, label?: string, value?: number) {
    this.trackEvent("engagement", {
      event_category: category,
      event_label: label,
      value: value,
      action: action,
    })
  }

  // Track form submissions
  trackFormSubmission(formName: string, success: boolean) {
    this.trackEvent("form_submit", {
      form_name: formName,
      success: success,
    })
  }

  // Track payment events
  trackPayment(transactionId: string, value: number, currency = "INR") {
    this.trackEvent("purchase", {
      transaction_id: transactionId,
      value: value,
      currency: currency,
    })
  }
}

// Performance monitoring
export class PerformanceMonitor {
  static trackWebVitals() {
    if (typeof window !== "undefined") {
      import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(this.sendToAnalytics)
        getFID(this.sendToAnalytics)
        getFCP(this.sendToAnalytics)
        getLCP(this.sendToAnalytics)
        getTTFB(this.sendToAnalytics)
      })
    }
  }

  private static sendToAnalytics(metric: any) {
    const analytics = Analytics.getInstance()
    analytics.trackEvent("web_vitals", {
      metric_name: metric.name,
      metric_value: metric.value,
      metric_id: metric.id,
    })
  }

  static trackAPIPerformance(endpoint: string, duration: number, status: number) {
    const analytics = Analytics.getInstance()
    analytics.trackEvent("api_performance", {
      endpoint: endpoint,
      duration: duration,
      status: status,
    })
  }
}

// Error tracking
export class ErrorTracker {
  static trackError(error: Error, context?: Record<string, any>) {
    const analytics = Analytics.getInstance()
    analytics.trackEvent("error", {
      error_message: error.message,
      error_stack: error.stack,
      context: JSON.stringify(context),
    })

    // Send to external error tracking service
    if (config.monitoring.sentry.dsn) {
      // Send to Sentry
      this.sendToSentry(error, context)
    }
  }

  private static sendToSentry(error: Error, context?: Record<string, any>) {
    // Sentry integration
    if (typeof window !== "undefined" && window.Sentry) {
      window.Sentry.captureException(error, {
        extra: context,
      })
    }
  }
}

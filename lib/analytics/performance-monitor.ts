"use client"

import { useEffect } from "react"

interface PerformanceMetrics {
  pageLoadTime: number
  domContentLoaded: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  cumulativeLayoutShift: number
  firstInputDelay: number
}

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {}

  constructor() {
    if (typeof window !== "undefined") {
      this.initializeMonitoring()
    }
  }

  private initializeMonitoring() {
    // Core Web Vitals
    this.measureCLS()
    this.measureFID()
    this.measureLCP()

    // Page load metrics
    window.addEventListener("load", () => {
      this.measurePageLoad()
      this.sendMetrics()
    })
  }

  private measurePageLoad() {
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming

    this.metrics.pageLoadTime = navigation.loadEventEnd - navigation.fetchStart
    this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart

    // First Contentful Paint
    const paintEntries = performance.getEntriesByType("paint")
    const fcp = paintEntries.find((entry) => entry.name === "first-contentful-paint")
    if (fcp) {
      this.metrics.firstContentfulPaint = fcp.startTime
    }
  }

  private measureLCP() {
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        this.metrics.largestContentfulPaint = lastEntry.startTime
      })

      observer.observe({ type: "largest-contentful-paint", buffered: true })
    }
  }

  private measureFID() {
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          this.metrics.firstInputDelay = entry.processingStart - entry.startTime
        })
      })

      observer.observe({ type: "first-input", buffered: true })
    }
  }

  private measureCLS() {
    if ("PerformanceObserver" in window) {
      let clsValue = 0
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
          }
        })
        this.metrics.cumulativeLayoutShift = clsValue
      })

      observer.observe({ type: "layout-shift", buffered: true })
    }
  }

  private async sendMetrics() {
    try {
      await fetch("/api/analytics/performance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          metrics: this.metrics,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: Date.now(),
        }),
      })
    } catch (error) {
      console.error("Failed to send performance metrics:", error)
    }
  }

  // Public method to track custom metrics
  trackCustomMetric(name: string, value: number, unit = "ms") {
    fetch("/api/analytics/custom-metric", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        value,
        unit,
        url: window.location.href,
        timestamp: Date.now(),
      }),
    }).catch(console.error)
  }
}

export const performanceMonitor = new PerformanceMonitor()

// React hook for performance monitoring
export function usePerformanceMonitoring() {
  useEffect(() => {
    // Track page view
    performanceMonitor.trackCustomMetric("page_view", 1, "count")

    // Track time on page
    const startTime = Date.now()
    return () => {
      const timeOnPage = Date.now() - startTime
      performanceMonitor.trackCustomMetric("time_on_page", timeOnPage, "ms")
    }
  }, [])

  return {
    trackMetric: performanceMonitor.trackCustomMetric.bind(performanceMonitor),
  }
}

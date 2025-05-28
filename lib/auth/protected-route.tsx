"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "./auth-provider"
import { logger } from "@/lib/monitoring/logger"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: string[]
  redirectTo?: string
  requireVerified?: boolean
}

/**
 * Component for protecting routes with authentication and role-based access
 */
export function ProtectedRoute({
  children,
  allowedRoles = [],
  redirectTo = "/login",
  requireVerified = false,
}: ProtectedRouteProps) {
  const { user, loading, isAuthenticated } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Wait until auth state is loaded
    if (loading) return

    // Redirect if not authenticated
    if (!isAuthenticated) {
      logger.info("Protected route access denied: Not authenticated", {
        metadata: { pathname }
      })
      
      // Add current path to redirect URL for returning after login
      const returnUrl = encodeURIComponent(pathname)
      router.push(`${redirectTo}?returnUrl=${returnUrl}`)
      return
    }

    // Check role access if roles are specified
    if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
      logger.warn("Protected route access denied: Insufficient permissions", {
        metadata: { pathname, userRole: user.role, allowedRoles }
      })
      router.push("/unauthorized")
      return
    }

    // Check if email verification is required
    if (requireVerified && user && !user.isVerified) {
      logger.info("Protected route access denied: Email not verified", {
        metadata: { pathname, userId: user.id }
      })
      router.push("/verify-email")
      return
    }
  }, [loading, isAuthenticated, user, router, pathname, allowedRoles, redirectTo, requireVerified])

  // Show nothing while authentication is checked
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    )
  }

  // Show content if the user is authenticated and meets role requirements
  if (
    isAuthenticated &&
    (allowedRoles.length === 0 || (user && allowedRoles.includes(user.role))) &&
    (!requireVerified || (user && user.isVerified))
  ) {
    return <>{children}</>
  }

  // Fallback: show nothing (redirects will happen in useEffect)
  return null
}

/**
 * Higher-order component (HOC) that wraps a component with ProtectedRoute
 */
export function withProtection(
  Component: React.ComponentType<any>,
  options: Omit<ProtectedRouteProps, "children"> = {}
) {
  return function ProtectedComponent(props: any) {
    return (
      <ProtectedRoute {...options}>
        <Component {...props} />
      </ProtectedRoute>
    )
  }
} 
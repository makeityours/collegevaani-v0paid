"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { trackException } from "@/lib/monitoring/sentry"

interface User {
  id: string
  email: string
  name: string
  role: string
  avatar?: string
  isVerified: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => Promise<void>
  requestPasswordReset: (email: string) => Promise<void>
  resetPassword: (userId: string, token: string, password: string, confirmPassword: string) => Promise<void>
  loading: boolean
  isAuthenticated: boolean
}

interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
  phone?: string
  role: string
}

interface ApiResponse<T> {
  success: boolean
  message?: string
  error?: string
  code?: string
  details?: any
  user?: User
  accessToken?: string
  refreshToken?: string
  data?: T
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Check authentication status on mount
  useEffect(() => {
    checkAuth()
  }, [])

  // Enhanced authentication check that works with HTTP-only cookies
  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include", // Include cookies
      })

      if (response.ok) {
        const data: ApiResponse<{ user: User }> = await response.json()
        if (data.success && data.user) {
          setUser(data.user)
        }
      } else {
        // Try to refresh the token if authentication fails
        const refreshed = await refreshToken()
        
        // If refresh fails, user is not authenticated
        if (!refreshed) {
          setUser(null)
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      trackException(error as Error, { context: 'auth_check' })
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  // Function to refresh the access token using the refresh token (stored in HTTP-only cookie)
  const refreshToken = async (): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include", // Include cookies
      })

      if (response.ok) {
        const data: ApiResponse<{ user: User }> = await response.json()
        if (data.success && data.user) {
          setUser(data.user)
          return true
        }
      }
      return false
    } catch (error) {
      console.error("Token refresh failed:", error)
      trackException(error as Error, { context: 'token_refresh' })
      return false
    }
  }

  // Enhanced login function that works with HTTP-only cookies
  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies
        body: JSON.stringify({ email, password }),
      })

      const data: ApiResponse<{ user: User }> = await response.json()

      if (!response.ok) {
        throw new Error(data.error || data.message || "Login failed")
      }

      if (data.success && data.user) {
        setUser(data.user)
        router.push("/dashboard")
      } else {
        throw new Error("Login failed: Invalid response")
      }
    } catch (error) {
      console.error("Login error:", error)
      trackException(error as Error, { context: 'login' })
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Enhanced registration function that works with HTTP-only cookies
  const register = async (userData: RegisterData) => {
    try {
      setLoading(true)
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies
        body: JSON.stringify(userData),
      })

      const data: ApiResponse<{ user: User }> = await response.json()

      if (!response.ok) {
        throw new Error(data.error || data.message || "Registration failed")
      }

      if (data.success && data.user) {
        setUser(data.user)
        router.push("/dashboard")
      } else {
        throw new Error("Registration failed: Invalid response")
      }
    } catch (error) {
      console.error("Registration error:", error)
      trackException(error as Error, { context: 'register' })
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Enhanced logout function that works with HTTP-only cookies
  const logout = async () => {
    try {
      setLoading(true)
      // Call the logout API to invalidate the token on the server
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include", // Include cookies
      })
      
      // Clear user state regardless of API response
      setUser(null)
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
      trackException(error as Error, { context: 'logout' })
      // Clear user state even if API call fails
      setUser(null)
      router.push("/")
    } finally {
      setLoading(false)
    }
  }

  // Request password reset email
  const requestPasswordReset = async (email: string): Promise<void> => {
    try {
      setLoading(true)
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data: ApiResponse<{}> = await response.json()

      if (!response.ok) {
        throw new Error(data.error || data.message || "Password reset request failed")
      }
      
      // Successfully requested password reset, don't return data
    } catch (error) {
      console.error("Password reset request error:", error)
      trackException(error as Error, { context: 'password_reset_request' })
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Reset password with token
  const resetPassword = async (userId: string, token: string, password: string, confirmPassword: string): Promise<void> => {
    try {
      setLoading(true)
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, token, password, confirmPassword }),
      })

      const data: ApiResponse<{}> = await response.json()

      if (!response.ok) {
        throw new Error(data.error || data.message || "Password reset failed")
      }
      
      // Successfully reset password, don't return data
    } catch (error) {
      console.error("Password reset error:", error)
      trackException(error as Error, { context: 'password_reset' })
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        requestPasswordReset,
        resetPassword,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

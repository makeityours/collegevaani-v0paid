"use client"

import { useState } from "react"

interface PaymentData {
  amount: number
  orderId: string
  keyId: string
  currency: string
}

export function useSecurePayment() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const initializePayment = async (amount: number, orderId: string): Promise<PaymentData | null> => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, orderId }),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || "Failed to initialize payment")
      }

      return result.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Payment initialization failed"
      setError(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }

  const verifyPayment = async (paymentId: string, orderId: string, signature: string): Promise<boolean> => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/payments/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentId, orderId, signature }),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || "Payment verification failed")
      }

      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Payment verification failed"
      setError(errorMessage)
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    initializePayment,
    verifyPayment,
    loading,
    error,
  }
}

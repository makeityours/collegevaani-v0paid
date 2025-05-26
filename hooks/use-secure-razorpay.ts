"use client"

import { useState } from "react"

interface SecurePaymentData {
  orderId: string
  amount: number
  currency: string
  keyId: string
}

export function useSecureRazorpay() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createSecureOrder = async (amount: number, description: string): Promise<SecurePaymentData | null> => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/payments/create-secure-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, description }),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || "Failed to create order")
      }

      return {
        orderId: result.order.id,
        amount: result.order.amount,
        currency: result.order.currency,
        keyId: result.config.keyId,
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Order creation failed"
      setError(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }

  const verifySecurePayment = async (paymentResponse: any): Promise<boolean> => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/payments/verify-secure", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentResponse),
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
    createSecureOrder,
    verifySecurePayment,
    loading,
    error,
  }
}

"use client"

import { useState } from "react"
import { razorpayClient } from "@/lib/payments/razorpay-client"

interface UsePaymentOptions {
  onSuccess?: (response: any) => void
  onError?: (error: Error) => void
}

export function usePayment({ onSuccess, onError }: UsePaymentOptions = {}) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const initiatePayment = async (paymentData: {
    amount: number
    description: string
    customerEmail?: string
    customerName?: string
    customerPhone?: string
  }) => {
    setIsLoading(true)
    setError(null)

    try {
      // Create order on server
      const orderResponse = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: paymentData.amount,
          currency: "INR",
          description: paymentData.description,
        }),
      })

      const orderData = await orderResponse.json()

      if (!orderData.success) {
        throw new Error(orderData.error || "Failed to create order")
      }

      // Initialize payment with Razorpay
      const paymentResponse = await razorpayClient.createPayment({
        amount: paymentData.amount,
        orderId: orderData.orderId,
        description: paymentData.description,
        customerEmail: paymentData.customerEmail,
        customerName: paymentData.customerName,
        customerPhone: paymentData.customerPhone,
      })

      // Verify payment on server
      const verifyResponse = await fetch("/api/payments/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentResponse),
      })

      const verifyData = await verifyResponse.json()

      if (!verifyData.success) {
        throw new Error("Payment verification failed")
      }

      onSuccess?.(verifyData)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Payment failed"
      setError(errorMessage)
      onError?.(err instanceof Error ? err : new Error(errorMessage))
    } finally {
      setIsLoading(false)
    }
  }

  return {
    initiatePayment,
    isLoading,
    error,
  }
}

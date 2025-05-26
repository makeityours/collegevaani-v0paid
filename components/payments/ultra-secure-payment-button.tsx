"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useSecureRazorpay } from "@/hooks/use-secure-razorpay"

interface UltraSecurePaymentButtonProps {
  amount: number
  description: string
  onSuccess?: (paymentId: string) => void
  onError?: (error: string) => void
  children: React.ReactNode
  disabled?: boolean
}

export function UltraSecurePaymentButton({
  amount,
  description,
  onSuccess,
  onError,
  children,
  disabled = false,
}: UltraSecurePaymentButtonProps) {
  const [processing, setProcessing] = useState(false)
  const { createSecureOrder, verifySecurePayment, loading, error } = useSecureRazorpay()

  const handleSecurePayment = async () => {
    setProcessing(true)

    try {
      // Step 1: Create secure order from server
      const orderData = await createSecureOrder(amount, description)

      if (!orderData) {
        throw new Error("Failed to create secure order")
      }

      // Step 2: Load Razorpay script dynamically
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => {
        // Step 3: Initialize Razorpay with secure data
        const options = {
          key: orderData.keyId, // Securely fetched from server
          amount: orderData.amount,
          currency: orderData.currency,
          order_id: orderData.orderId,
          name: "CollegeVaani",
          description: description,
          handler: async (response: any) => {
            // Step 4: Verify payment on server
            const isVerified = await verifySecurePayment(response)

            if (isVerified) {
              onSuccess?.(response.razorpay_payment_id)
            } else {
              onError?.("Payment verification failed")
            }
          },
          modal: {
            ondismiss: () => {
              setProcessing(false)
            },
          },
          theme: {
            color: "#4F46E5",
          },
        }

        const rzp = new (window as any).Razorpay(options)
        rzp.open()
      }

      script.onerror = () => {
        throw new Error("Failed to load payment gateway")
      }

      document.head.appendChild(script)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Payment failed"
      onError?.(errorMessage)
      setProcessing(false)
    }
  }

  return (
    <Button onClick={handleSecurePayment} disabled={disabled || loading || processing} className="w-full">
      {loading || processing ? "Processing..." : children}
    </Button>
  )
}

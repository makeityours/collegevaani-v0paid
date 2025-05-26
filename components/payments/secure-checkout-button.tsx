"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useSecurePayment } from "@/hooks/use-secure-payment"

interface SecureCheckoutButtonProps {
  amount: number
  orderId: string
  onSuccess?: (paymentId: string) => void
  onError?: (error: string) => void
  children: React.ReactNode
}

export function SecureCheckoutButton({ amount, orderId, onSuccess, onError, children }: SecureCheckoutButtonProps) {
  const [processing, setProcessing] = useState(false)
  const { initializePayment, verifyPayment, loading, error } = useSecurePayment()

  const handlePayment = async () => {
    setProcessing(true)

    try {
      // Initialize payment securely from server
      const paymentData = await initializePayment(amount, orderId)

      if (!paymentData) {
        throw new Error("Failed to initialize payment")
      }

      // Load Razorpay script dynamically
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => {
        const options = {
          key: paymentData.keyId, // Securely fetched from server
          amount: paymentData.amount,
          currency: paymentData.currency,
          order_id: paymentData.orderId,
          name: "CollegeVaani",
          description: "Payment for CollegeVaani services",
          handler: async (response: any) => {
            // Verify payment on server
            const isVerified = await verifyPayment(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature,
            )

            if (isVerified) {
              onSuccess?.(response.razorpay_payment_id)
            } else {
              onError?.("Payment verification failed")
            }
          },
          prefill: {
            name: "",
            email: "",
            contact: "",
          },
          theme: {
            color: "#4F46E5",
          },
        }

        const rzp = new (window as any).Razorpay(options)
        rzp.open()
      }
      document.head.appendChild(script)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Payment failed"
      onError?.(errorMessage)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <Button onClick={handlePayment} disabled={loading || processing} className="w-full">
      {loading || processing ? "Processing..." : children}
    </Button>
  )
}

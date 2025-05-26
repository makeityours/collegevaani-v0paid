"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { usePayment } from "@/hooks/use-payment"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

interface SecurePaymentButtonProps {
  amount: number
  description: string
  customerEmail?: string
  customerName?: string
  customerPhone?: string
  onSuccess?: (response: any) => void
  children: React.ReactNode
  disabled?: boolean
}

export function SecurePaymentButton({
  amount,
  description,
  customerEmail,
  customerName,
  customerPhone,
  onSuccess,
  children,
  disabled = false,
}: SecurePaymentButtonProps) {
  const { initiatePayment, isLoading, error } = usePayment({
    onSuccess: (response) => {
      toast.success("Payment successful!")
      onSuccess?.(response)
    },
    onError: (error) => {
      toast.error(`Payment failed: ${error.message}`)
    },
  })

  const handlePayment = () => {
    initiatePayment({
      amount,
      description,
      customerEmail,
      customerName,
      customerPhone,
    })
  }

  return (
    <Button onClick={handlePayment} disabled={disabled || isLoading} className="w-full">
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        children
      )}
    </Button>
  )
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { CreditCard, Shield, Lock } from "lucide-react"

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const selectedPlan = searchParams.get("plan") || "premium"

  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    agreeToTerms: false,
  })

  const plans = {
    premium: { name: "Premium", price: 499, yearlyPrice: 4990 },
    pro: { name: "Pro", price: 999, yearlyPrice: 9990 },
    enterprise: { name: "Enterprise", price: 2499, yearlyPrice: 24990 },
  }

  const [billingCycle, setBillingCycle] = useState("monthly")
  const currentPlan = plans[selectedPlan as keyof typeof plans] || plans.premium

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePayment = async () => {
    if (!formData.agreeToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Create order on backend
      const orderResponse = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: billingCycle === "yearly" ? currentPlan.yearlyPrice : currentPlan.price,
          currency: "INR",
          plan: selectedPlan,
          billingCycle,
          customerData: formData,
        }),
      })

      const orderData = await orderResponse.json()

      if (!orderData.success) {
        throw new Error(orderData.error)
      }

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "CollegeVaani",
        description: `${currentPlan.name} Plan - ${billingCycle}`,
        order_id: orderData.order.id,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#3B82F6",
        },
        handler: async (response: any) => {
          // Verify payment on backend
          const verifyResponse = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              customerData: formData,
              plan: selectedPlan,
              billingCycle,
            }),
          })

          const verifyData = await verifyResponse.json()

          if (verifyData.success) {
            toast({
              title: "Payment Successful!",
              description: "Your subscription has been activated.",
            })
            window.location.href = "/dashboard/student?welcome=true"
          } else {
            toast({
              title: "Payment Verification Failed",
              description: "Please contact support.",
              variant: "destructive",
            })
          }
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false)
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error("Payment error:", error)
      toast({
        title: "Payment Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Complete Your Purchase</h1>
          <p className="text-muted-foreground">Secure checkout powered by Razorpay</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">{currentPlan.name} Plan</span>
                <Badge variant="outline">{billingCycle}</Badge>
              </div>

              <div className="space-y-2">
                <Label>Billing Cycle</Label>
                <Select value={billingCycle} onValueChange={setBillingCycle}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly - ₹{currentPlan.price}</SelectItem>
                    <SelectItem value="yearly">
                      Yearly - ₹{currentPlan.yearlyPrice}
                      <Badge className="ml-2 bg-green-100 text-green-700">Save 17%</Badge>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{billingCycle === "yearly" ? currentPlan.yearlyPrice : currentPlan.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span>
                    ₹{Math.round((billingCycle === "yearly" ? currentPlan.yearlyPrice : currentPlan.price) * 0.18)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>
                    ₹{Math.round((billingCycle === "yearly" ? currentPlan.yearlyPrice : currentPlan.price) * 1.18)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Secured by 256-bit SSL encryption</span>
              </div>
            </CardContent>
          </Card>

          {/* Billing Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Billing Information
              </CardTitle>
              <CardDescription>Your information is secure and encrypted</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input id="state" name="state" value={formData.state} onChange={handleInputChange} required />
                </div>
              </div>

              <div>
                <Label htmlFor="pincode">PIN Code</Label>
                <Input id="pincode" name="pincode" value={formData.pincode} onChange={handleInputChange} required />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))}
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <a href="/terms" className="text-primary hover:underline">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>

              <Button onClick={handlePayment} className="w-full" disabled={isLoading || !formData.agreeToTerms}>
                {isLoading
                  ? "Processing..."
                  : `Pay ₹${Math.round((billingCycle === "yearly" ? currentPlan.yearlyPrice : currentPlan.price) * 1.18)}`}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By clicking "Pay", you agree to our terms and authorize the payment.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

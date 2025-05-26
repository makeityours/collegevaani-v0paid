// Server-side only payment service - never exposed to client
import crypto from "crypto"
import { secureConfig } from "@/lib/config/secure-environment"

export class ServerPaymentService {
  private static instance: ServerPaymentService

  private constructor() {}

  static getInstance(): ServerPaymentService {
    if (!ServerPaymentService.instance) {
      ServerPaymentService.instance = new ServerPaymentService()
    }
    return ServerPaymentService.instance
  }

  // Create order using server-side Razorpay API
  async createOrder(amount: number, currency = "INR") {
    try {
      // This would typically use Razorpay SDK server-side
      const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      return {
        id: orderId,
        amount: amount * 100, // Convert to paise
        currency,
        status: "created",
      }
    } catch (error) {
      console.error("Order creation error:", error)
      throw new Error("Failed to create order")
    }
  }

  // Verify payment signature server-side
  verifyPaymentSignature(orderId: string, paymentId: string, signature: string): boolean {
    try {
      const expectedSignature = crypto
        .createHmac("sha256", secureConfig.payment.razorpay.keySecret)
        .update(`${orderId}|${paymentId}`)
        .digest("hex")

      return expectedSignature === signature
    } catch (error) {
      console.error("Payment verification error:", error)
      return false
    }
  }

  // Get public configuration for client (safe data only)
  getPublicConfig() {
    return {
      keyId: secureConfig.payment.razorpay.publicKeyId,
      currency: "INR",
      companyName: secureConfig.app.name,
      theme: {
        color: "#4F46E5",
      },
    }
  }
}

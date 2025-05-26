// Secure payment service that handles all payment operations server-side
import { config } from "@/lib/config/environment"

export class SecurePaymentService {
  private static instance: SecurePaymentService

  private constructor() {}

  static getInstance(): SecurePaymentService {
    if (!SecurePaymentService.instance) {
      SecurePaymentService.instance = new SecurePaymentService()
    }
    return SecurePaymentService.instance
  }

  // Get public configuration for client-side (safe data only)
  getPublicConfig() {
    return {
      currency: "INR",
      companyName: "CollegeVaani",
      theme: {
        color: "#4F46E5",
      },
    }
  }

  // Server-side payment initialization
  async initializePayment(amount: number, orderId: string) {
    // This method runs server-side only
    // Uses RAZORPAY_KEY_SECRET which is never exposed to client
    return {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      orderId,
      // Key ID is fetched server-side and passed to client securely
      keyId: config.payment.razorpay.keyId,
    }
  }

  // Server-side payment verification
  async verifyPayment(paymentId: string, orderId: string, signature: string) {
    // This method runs server-side only
    // Uses RAZORPAY_KEY_SECRET for verification
    const crypto = require("crypto")
    const expectedSignature = crypto
      .createHmac("sha256", config.payment.razorpay.keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex")

    return expectedSignature === signature
  }
}

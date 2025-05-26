import { type NextRequest, NextResponse } from "next/server"
import { SecurePaymentService } from "@/lib/payments/secure-payment-service"

export async function POST(request: NextRequest) {
  try {
    const { paymentId, orderId, signature } = await request.json()

    if (!paymentId || !orderId || !signature) {
      return NextResponse.json(
        { success: false, error: "Payment ID, order ID, and signature are required" },
        { status: 400 },
      )
    }

    const paymentService = SecurePaymentService.getInstance()
    const isValid = await paymentService.verifyPayment(paymentId, orderId, signature)

    if (isValid) {
      // Payment is verified, update database, send confirmation, etc.
      return NextResponse.json({
        success: true,
        message: "Payment verified successfully",
      })
    } else {
      return NextResponse.json({ success: false, error: "Payment verification failed" }, { status: 400 })
    }
  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json({ success: false, error: "Failed to verify payment" }, { status: 500 })
  }
}

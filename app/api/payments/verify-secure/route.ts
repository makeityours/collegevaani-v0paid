import { type NextRequest, NextResponse } from "next/server"
import { ServerPaymentService } from "@/lib/payments/server-payment-service"

export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json()

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, error: "Order ID, payment ID, and signature are required" },
        { status: 400 },
      )
    }

    const paymentService = ServerPaymentService.getInstance()
    const isValid = paymentService.verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)

    if (isValid) {
      // Payment verified successfully
      // Here you would typically:
      // 1. Update database with payment status
      // 2. Send confirmation email
      // 3. Activate user subscription
      // 4. Log the transaction

      return NextResponse.json({
        success: true,
        message: "Payment verified successfully",
        paymentId: razorpay_payment_id,
      })
    } else {
      return NextResponse.json({ success: false, error: "Invalid payment signature" }, { status: 400 })
    }
  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json({ success: false, error: "Payment verification failed" }, { status: 500 })
  }
}

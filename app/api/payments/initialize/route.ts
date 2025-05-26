import { type NextRequest, NextResponse } from "next/server"
import { SecurePaymentService } from "@/lib/payments/secure-payment-service"

export async function POST(request: NextRequest) {
  try {
    const { amount, orderId } = await request.json()

    if (!amount || !orderId) {
      return NextResponse.json({ success: false, error: "Amount and order ID are required" }, { status: 400 })
    }

    const paymentService = SecurePaymentService.getInstance()
    const paymentData = await paymentService.initializePayment(amount, orderId)

    return NextResponse.json({
      success: true,
      data: paymentData,
    })
  } catch (error) {
    console.error("Payment initialization error:", error)
    return NextResponse.json({ success: false, error: "Failed to initialize payment" }, { status: 500 })
  }
}

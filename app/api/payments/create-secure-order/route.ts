import { type NextRequest, NextResponse } from "next/server"
import { ServerPaymentService } from "@/lib/payments/server-payment-service"

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = "INR", description } = await request.json()

    if (!amount || amount <= 0) {
      return NextResponse.json({ success: false, error: "Valid amount is required" }, { status: 400 })
    }

    const paymentService = ServerPaymentService.getInstance()
    const order = await paymentService.createOrder(amount, currency)
    const publicConfig = paymentService.getPublicConfig()

    return NextResponse.json({
      success: true,
      order,
      config: publicConfig,
    })
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customerData, plan, billingCycle } = body

    // Verify signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(sign.toString())
      .digest("hex")

    if (razorpay_signature !== expectedSign) {
      return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 })
    }

    // Here you would typically:
    // 1. Save the subscription to your database
    // 2. Update user's plan
    // 3. Send confirmation email
    // 4. Create invoice

    // For now, we'll just return success
    console.log("Payment verified successfully:", {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      customerData,
      plan,
      billingCycle,
    })

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
    })
  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json({ success: false, error: "Payment verification failed" }, { status: 500 })
  }
}

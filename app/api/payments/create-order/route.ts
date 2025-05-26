import { type NextRequest, NextResponse } from "next/server"
import Razorpay from "razorpay"

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency, plan, billingCycle, customerData } = body

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: currency || "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        plan,
        billingCycle,
        customerEmail: customerData.email,
        customerName: customerData.name,
      },
    }

    const order = await razorpay.orders.create(options)

    return NextResponse.json({
      success: true,
      order,
    })
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 })
  }
}

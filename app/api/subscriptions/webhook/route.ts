import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("x-razorpay-signature")

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 })
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest("hex")

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    const event = JSON.parse(body)

    // Handle different webhook events
    switch (event.event) {
      case "subscription.activated":
        // Handle subscription activation
        console.log("Subscription activated:", event.payload.subscription.entity)
        break

      case "subscription.charged":
        // Handle successful payment
        console.log("Subscription charged:", event.payload.payment.entity)
        break

      case "subscription.cancelled":
        // Handle subscription cancellation
        console.log("Subscription cancelled:", event.payload.subscription.entity)
        break

      case "subscription.completed":
        // Handle subscription completion
        console.log("Subscription completed:", event.payload.subscription.entity)
        break

      default:
        console.log("Unhandled webhook event:", event.event)
    }

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}

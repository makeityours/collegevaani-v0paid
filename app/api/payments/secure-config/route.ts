import { NextResponse } from "next/server"
import { secureConfig } from "@/lib/config/secure-environment"

export async function GET() {
  try {
    // Only return absolutely safe public configuration
    const publicConfig = {
      razorpayKeyId: secureConfig.payment.razorpay.publicKeyId,
      currency: "INR",
      companyName: secureConfig.app.name,
      theme: {
        color: "#4F46E5",
      },
    }

    return NextResponse.json({
      success: true,
      config: publicConfig,
    })
  } catch (error) {
    console.error("Payment config error:", error)
    return NextResponse.json({ success: false, error: "Failed to get payment config" }, { status: 500 })
  }
}

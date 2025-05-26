import { NextResponse } from "next/server"
import { config } from "@/lib/config/environment"

export async function GET() {
  try {
    // Only return public configuration that's safe for client-side
    const paymentConfig = {
      razorpayKeyId: config.payment.razorpay.keyId,
      currency: "INR",
      companyName: "CollegeVaani",
      theme: {
        color: "#4F46E5",
      },
    }

    return NextResponse.json({
      success: true,
      config: paymentConfig,
    })
  } catch (error) {
    console.error("Payment config error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to get payment config",
        config: {
          razorpayKeyId: "",
          currency: "INR",
          companyName: "CollegeVaani",
          theme: { color: "#4F46E5" },
        },
      },
      { status: 500 },
    )
  }
}

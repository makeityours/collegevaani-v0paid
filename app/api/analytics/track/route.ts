import { type NextRequest, NextResponse } from "next/server"
import { AnalyticsModel } from "@/lib/database/models"

export async function POST(request: NextRequest) {
  try {
    const eventData = await request.json()
    const userAgent = request.headers.get("user-agent")
    const forwarded = request.headers.get("x-forwarded-for")
    const ipAddress = forwarded ? forwarded.split(",")[0] : request.ip

    await AnalyticsModel.track({
      ...eventData,
      userAgent,
      ipAddress,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error tracking analytics:", error)
    return NextResponse.json({ success: false, error: "Failed to track event" }, { status: 500 })
  }
}

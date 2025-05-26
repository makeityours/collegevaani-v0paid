import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, form_type, course, source } = body

    // Send to Google Analytics 4
    const gaResponse = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${process.env.GA_MEASUREMENT_ID}&api_secret=${process.env.GA_API_SECRET}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: "collegevaani-server",
          events: [
            {
              name: event,
              parameters: {
                form_type: form_type,
                course_category: course,
                traffic_source: source,
                engagement_time_msec: 1000,
              },
            },
          ],
        }),
      },
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json({ success: false, error: "Failed to track event" }, { status: 500 })
  }
}

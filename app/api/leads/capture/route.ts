import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, course, location, budget, timeline, source, formType } = body

    if (!process.env.HUBSPOT_API_KEY) {
      console.error("HubSpot API key is missing in environment variables.")
      return NextResponse.json({ success: false, error: "HubSpot API key is missing" }, { status: 500 })
    }

    // Submit to HubSpot
    const hubspotResponse = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: {
          firstname: name.split(" ")[0],
          lastname: name.split(" ").slice(1).join(" "),
          email: email,
          phone: phone,
          course_interest: course,
          preferred_location: location,
          budget_range: budget,
          timeline: timeline,
          lead_source: source,
          form_type: formType,
          lifecyclestage: "lead",
        },
      }),
    })

    if (!hubspotResponse.ok) {
      const errorData = await hubspotResponse.json()
      console.error("HubSpot API error:", errorData)
      return NextResponse.json(
        { success: false, error: "Failed to submit lead to HubSpot", hubspotError: errorData },
        { status: 500 },
      )
    }

    // Calculate lead score
    let leadScore = 0
    if (email.includes(".edu")) leadScore += 20
    if (phone) leadScore += 15
    if (budget === "above-10lakh") leadScore += 25
    if (timeline === "immediate") leadScore += 30
    if (course) leadScore += 10

    if (!process.env.ADMIN_EMAIL) {
      console.warn("ADMIN_EMAIL is not set. Skipping notification email.")
    } else {
      // Send notification email to admin
      try {
        const notificationResponse = await fetch("/api/notifications/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "new_lead",
            data: { name, email, course, leadScore },
            recipient: process.env.ADMIN_EMAIL,
          }),
        })

        if (!notificationResponse.ok) {
          console.error("Failed to send notification email:", notificationResponse.statusText)
        }
      } catch (notificationError) {
        console.error("Error sending notification email:", notificationError)
      }
    }

    return NextResponse.json({
      success: true,
      leadScore,
      message: "Lead captured successfully",
    })
  } catch (error) {
    console.error("Lead capture error:", error)
    return NextResponse.json({ success: false, error: "Failed to capture lead" }, { status: 500 })
  }
}

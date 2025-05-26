import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data, recipient } = body

    let subject = ""
    let message = ""

    switch (type) {
      case "new_lead":
        subject = `New Lead: ${data.name} - Score: ${data.leadScore}`
        message = `
          New lead captured:
          Name: ${data.name}
          Email: ${data.email}
          Course: ${data.course}
          Lead Score: ${data.leadScore}/100
          
          Please follow up within 24 hours.
        `
        break
      case "high_score_lead":
        subject = `High-Quality Lead Alert: ${data.name}`
        message = `
          High-scoring lead (${data.leadScore}/100) requires immediate attention:
          Name: ${data.name}
          Email: ${data.email}
          Course: ${data.course}
        `
        break
      default:
        subject = "CollegeVaani Notification"
        message = "You have a new notification from CollegeVaani."
    }

    // Here you would integrate with your email service (SendGrid, AWS SES, etc.)
    // For now, we'll just log it
    console.log("Email notification:", { recipient, subject, message })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Notification error:", error)
    return NextResponse.json({ success: false, error: "Failed to send notification" }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"
import { LeadModel } from "@/lib/database/models"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const assignedTo = searchParams.get("assignedTo")

    const filters = { status, assignedTo }
    const leads = await LeadModel.findAll(filters)

    return NextResponse.json({
      success: true,
      data: leads,
      count: leads.length,
    })
  } catch (error) {
    console.error("Error fetching leads:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch leads" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const leadData = await request.json()

    // Calculate lead score
    let leadScore = 0
    if (leadData.email?.includes(".edu")) leadScore += 20
    if (leadData.phone) leadScore += 15
    if (leadData.budgetRange === "above-10lakh") leadScore += 25
    if (leadData.courseInterest) leadScore += 10

    const lead = await LeadModel.create({
      ...leadData,
      leadScore,
      status: "new",
    })

    return NextResponse.json(
      {
        success: true,
        data: lead,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating lead:", error)
    return NextResponse.json({ success: false, error: "Failed to create lead" }, { status: 500 })
  }
}

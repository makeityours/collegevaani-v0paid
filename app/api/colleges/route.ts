import { type NextRequest, NextResponse } from "next/server"
import { CollegeModel } from "@/lib/database/models"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const state = searchParams.get("state")
    const city = searchParams.get("city")
    const type = searchParams.get("type")
    const featured = searchParams.get("featured") === "true"

    const filters = { state, city, type, featured }
    const colleges = await CollegeModel.findAll(filters)

    return NextResponse.json({
      success: true,
      data: colleges,
      count: colleges.length,
    })
  } catch (error) {
    console.error("Error fetching colleges:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch colleges" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const collegeData = await request.json()
    const college = await CollegeModel.create(collegeData)

    return NextResponse.json(
      {
        success: true,
        data: college,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating college:", error)
    return NextResponse.json({ success: false, error: "Failed to create college" }, { status: 500 })
  }
}

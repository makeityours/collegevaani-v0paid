import { type NextRequest, NextResponse } from "next/server"
import { CourseModel } from "@/lib/database/models"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const field = searchParams.get("field")
    const popular = searchParams.get("popular") === "true"

    const filters = { type, field, popular }
    const courses = await CourseModel.findAll(filters)

    return NextResponse.json({
      success: true,
      data: courses,
      count: courses.length,
    })
  } catch (error) {
    console.error("Error fetching courses:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch courses" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const courseData = await request.json()
    const course = await CourseModel.create(courseData)

    return NextResponse.json(
      {
        success: true,
        data: course,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating course:", error)
    return NextResponse.json({ success: false, error: "Failed to create course" }, { status: 500 })
  }
}

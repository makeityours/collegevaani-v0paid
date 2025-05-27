import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/database/connection"
import { generateStructuredData } from "@/lib/seo/meta-generator"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Get college by ID or slug
    const college = await sql`
      SELECT * FROM colleges 
      WHERE (id = ${id} OR slug = ${id}) 
      AND is_active = true
    `

    if (college.length === 0) {
      return NextResponse.json({ success: false, error: "College not found" }, { status: 404 })
    }

    const collegeData = college[0]

    // Get related courses
    const relatedCourses = await sql`
      SELECT * FROM courses 
      WHERE field_of_study = ANY(${collegeData.courses_offered})
      AND is_active = true
      LIMIT 5
    `

    // Generate structured data for SEO
    const structuredData = generateStructuredData("EducationalOrganization", {
      name: collegeData.name,
      description: collegeData.description,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/colleges/${collegeData.slug}`,
      logo: collegeData.logo_url,
      address: {
        street: collegeData.location,
        city: collegeData.city,
        state: collegeData.state,
      },
      phone: collegeData.contact_phone,
      email: collegeData.contact_email,
    })

    // Track page view
    await sql`
      INSERT INTO analytics (event_type, event_data, page_url, ip_address, user_agent)
      VALUES (
        'college_view',
        ${JSON.stringify({ collegeId: collegeData.id, collegeName: collegeData.name })},
        ${request.url},
        ${request.ip},
        ${request.headers.get("user-agent")}
      )
    `

    return NextResponse.json({
      success: true,
      data: {
        college: collegeData,
        relatedCourses,
        structuredData,
      },
    })
  } catch (error) {
    console.error("Error fetching college:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch college" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const updateData = await request.json()

    // Validate admin access (implement proper auth middleware)
    const authHeader = request.headers.get("authorization")
    if (!authHeader) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const updatedCollege = await sql`
      UPDATE colleges 
      SET 
        name = ${updateData.name},
        description = ${updateData.description},
        location = ${updateData.location},
        state = ${updateData.state},
        city = ${updateData.city},
        college_type = ${updateData.collegeType},
        facilities = ${JSON.stringify(updateData.facilities)},
        courses_offered = ${JSON.stringify(updateData.coursesOffered)},
        fees_structure = ${JSON.stringify(updateData.feesStructure)},
        is_featured = ${updateData.isFeatured},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `

    return NextResponse.json({
      success: true,
      data: updatedCollege[0],
    })
  } catch (error) {
    console.error("Error updating college:", error)
    return NextResponse.json({ success: false, error: "Failed to update college" }, { status: 500 })
  }
}

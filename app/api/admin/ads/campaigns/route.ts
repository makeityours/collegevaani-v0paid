import { type NextRequest, NextResponse } from "next/server"

// In a real application, this would be stored in a database
const campaigns: any[] = [
  {
    id: "1",
    title: "Premium College Guide",
    description: "Get exclusive insights into top colleges",
    type: "sidebar",
    placement: "homepage-sidebar",
    ctaText: "Download Free",
    ctaLink: "/marketplace",
    imageUrl: "/placeholder.svg?height=200&width=300&text=College+Guide",
    isActive: true,
    impressions: 15420,
    clicks: 892,
    revenue: 2340,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
  },
  {
    id: "2",
    title: "Boost Your Applications",
    description: "Expert guidance from certified counselors",
    type: "banner",
    placement: "homepage-top",
    ctaText: "Book Session",
    ctaLink: "/lead-generation",
    isActive: true,
    impressions: 28750,
    clicks: 1456,
    revenue: 4580,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
  },
]

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: campaigns,
    })
  } catch (error) {
    console.error("Failed to fetch campaigns:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch campaigns",
        data: [],
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newCampaign = {
      id: Date.now().toString(),
      title: body.title || "",
      description: body.description || "",
      type: body.type || "banner",
      placement: body.placement || "",
      ctaText: body.ctaText || "Learn More",
      ctaLink: body.ctaLink || "/",
      imageUrl: body.imageUrl || "",
      isActive: true,
      impressions: 0,
      clicks: 0,
      revenue: 0,
      startDate: body.startDate || new Date().toISOString().split("T")[0],
      endDate: body.endDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    }

    campaigns.push(newCampaign)

    console.log("Campaign created:", newCampaign)

    return NextResponse.json({
      success: true,
      message: "Campaign created successfully",
      data: newCampaign,
    })
  } catch (error) {
    console.error("Failed to create campaign:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create campaign",
      },
      { status: 500 },
    )
  }
}

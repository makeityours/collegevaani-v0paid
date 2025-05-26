import { type NextRequest, NextResponse } from "next/server"

// Default ad settings
const defaultAdSettings = {
  bannerAds: { enabled: true, frequency: 3 },
  sidebarAds: { enabled: true, frequency: 1 },
  inlineAds: { enabled: true, frequency: 5 },
  popupAds: { enabled: false, frequency: 1 },
}

// In a real application, this would be stored in a database
let adSettings = { ...defaultAdSettings }

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: adSettings,
    })
  } catch (error) {
    console.error("Failed to fetch ad settings:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch ad settings",
        data: defaultAdSettings, // Return defaults on error
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the settings structure
    const validatedSettings = {
      bannerAds: {
        enabled: body.bannerAds?.enabled ?? defaultAdSettings.bannerAds.enabled,
        frequency: Math.max(1, Math.min(10, body.bannerAds?.frequency ?? defaultAdSettings.bannerAds.frequency)),
      },
      sidebarAds: {
        enabled: body.sidebarAds?.enabled ?? defaultAdSettings.sidebarAds.enabled,
        frequency: Math.max(1, Math.min(10, body.sidebarAds?.frequency ?? defaultAdSettings.sidebarAds.frequency)),
      },
      inlineAds: {
        enabled: body.inlineAds?.enabled ?? defaultAdSettings.inlineAds.enabled,
        frequency: Math.max(1, Math.min(10, body.inlineAds?.frequency ?? defaultAdSettings.inlineAds.frequency)),
      },
      popupAds: {
        enabled: body.popupAds?.enabled ?? defaultAdSettings.popupAds.enabled,
        frequency: Math.max(1, Math.min(10, body.popupAds?.frequency ?? defaultAdSettings.popupAds.frequency)),
      },
    }

    // Update settings (in a real app, this would update the database)
    adSettings = validatedSettings

    console.log("Ad settings updated:", validatedSettings)

    return NextResponse.json({
      success: true,
      message: "Ad settings updated successfully",
      data: adSettings,
    })
  } catch (error) {
    console.error("Failed to update ad settings:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update ad settings",
      },
      { status: 500 },
    )
  }
}

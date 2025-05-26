import { NextResponse } from "next/server"

export class AppError extends Error {
  public statusCode: number
  public isOperational: boolean

  constructor(message: string, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

export function handleApiError(error: unknown) {
  console.error("API Error:", error)

  if (error instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: error.statusCode },
    )
  }

  // Handle database errors
  if (error instanceof Error && error.message.includes("database")) {
    return NextResponse.json(
      {
        success: false,
        error: "Database connection error",
      },
      { status: 503 },
    )
  }

  // Default error response
  return NextResponse.json(
    {
      success: false,
      error: "Internal server error",
    },
    { status: 500 },
  )
}

export function validateEnvironment() {
  const required = ["DATABASE_URL"]
  const missing = required.filter((key) => !process.env[key])

  if (missing.length > 0) {
    throw new AppError(`Missing environment variables: ${missing.join(", ")}`, 500)
  }
}

import type React from "react"
import { render, type RenderOptions } from "@testing-library/react"
import type { ReactElement } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { GlobalStateProvider } from "@/lib/global-state"

// Custom render function with providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <GlobalStateProvider>{children}</GlobalStateProvider>
    </ThemeProvider>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from "@testing-library/react"
export { customRender as render }

// Mock data generators
export const mockUser = {
  id: "user-1",
  email: "test@example.com",
  name: "Test User",
  role: "student" as const,
  isVerified: true,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const mockCollege = {
  id: "college-1",
  name: "Test College",
  slug: "test-college",
  description: "A test college",
  images: [],
  location: {
    address: "Test Address",
    city: "Test City",
    state: "Test State",
    country: "India",
    pincode: "123456",
  },
  contact: {
    phone: "+91XXXXXXXXXX",
    email: "contact@testcollege.edu",
  },
  type: "private" as const,
  category: "engineering" as const,
  accreditation: ["NAAC"],
  rankings: [],
  facilities: ["Library", "Hostel"],
  fees: {
    tuition: { min: 100000, max: 200000, currency: "INR" },
  },
  admissions: {
    process: "Online application",
    eligibility: ["12th pass"],
    exams: ["JEE"],
    deadlines: [],
  },
  stats: {},
  isVerified: true,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
}

// API mocking utilities
export const mockApiResponse = (data: any, success = true) => ({
  success,
  data: success ? data : undefined,
  error: success ? undefined : "Mock error",
})

// Test database utilities
export const setupTestDatabase = async () => {
  // Setup test database connection
  // Clear existing data
  // Seed test data
}

export const teardownTestDatabase = async () => {
  // Clean up test database
  // Close connections
}

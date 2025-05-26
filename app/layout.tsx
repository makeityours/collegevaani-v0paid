import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { GlobalStateProvider } from "@/lib/global-state"
import ErrorBoundary from "@/components/ui/error-boundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CollegeVaani - Find Your Perfect College",
  description:
    "Discover, compare, and apply to the best colleges in India. Get expert guidance on admissions, courses, and career paths.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  generator: "Next.js",
  keywords: "college, admission, education, India, courses, career",
  authors: [{ name: "CollegeVaani Team" }],
  robots: "index, follow",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <GlobalStateProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">
                  <ErrorBoundary>{children}</ErrorBoundary>
                </main>
                <Footer />
              </div>
            </GlobalStateProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}

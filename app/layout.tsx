import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { GlobalStateProvider } from "@/lib/global-state"
import { AuthProvider } from "@/lib/auth/auth-provider"
import { ErrorBoundary } from "@/lib/monitoring/error-tracker"
import { generateMetadata } from "@/lib/seo/meta-generator"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = generateMetadata({
  title: "Find Your Perfect College",
  description:
    "Discover, compare, and apply to the best colleges in India. Get expert guidance on admissions, courses, and career paths.",
  keywords: ["college", "admission", "education", "India", "courses", "career", "engineering", "medical", "MBA"],
  url: "/",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4f46e5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CollegeVaani" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="google-site-verification" content={process.env.GOOGLE_SITE_VERIFICATION} />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <AuthProvider>
              <GlobalStateProvider>
                <div className="flex min-h-screen flex-col">
                  <Header />
                  <main className="flex-1">
                    <ErrorBoundary>{children}</ErrorBoundary>
                  </main>
                  <Footer />
                </div>
              </GlobalStateProvider>
            </AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}

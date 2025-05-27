import type { MetadataRoute } from "next"
import { sql } from "@/lib/database/connection"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://collegevaani.com"

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/colleges`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/exams`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
  ]

  try {
    // Dynamic college pages
    const colleges = await sql`
      SELECT slug, updated_at 
      FROM colleges 
      WHERE is_active = true
      ORDER BY updated_at DESC
    `

    const collegePages = colleges.map((college: any) => ({
      url: `${baseUrl}/colleges/${college.slug}`,
      lastModified: new Date(college.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))

    // Dynamic course pages
    const courses = await sql`
      SELECT slug, updated_at 
      FROM courses 
      WHERE is_active = true
      ORDER BY updated_at DESC
    `

    const coursePages = courses.map((course: any) => ({
      url: `${baseUrl}/courses/${course.slug}`,
      lastModified: new Date(course.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))

    // Dynamic exam pages
    const exams = await sql`
      SELECT slug, updated_at 
      FROM exams 
      WHERE is_active = true
      ORDER BY updated_at DESC
    `

    const examPages = exams.map((exam: any) => ({
      url: `${baseUrl}/exams/${exam.slug}`,
      lastModified: new Date(exam.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }))

    // Dynamic news pages
    const news = await sql`
      SELECT slug, updated_at 
      FROM news 
      WHERE is_published = true
      ORDER BY updated_at DESC
      LIMIT 100
    `

    const newsPages = news.map((article: any) => ({
      url: `${baseUrl}/news/${article.slug}`,
      lastModified: new Date(article.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.4,
    }))

    return [...staticPages, ...collegePages, ...coursePages, ...examPages, ...newsPages]
  } catch (error) {
    console.error("Error generating sitemap:", error)
    return staticPages
  }
}

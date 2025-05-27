import type { Metadata } from "next"

interface SEOData {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
}

export function generateMetadata(data: SEOData): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = "/images/og-default.jpg",
    url = process.env.NEXT_PUBLIC_APP_URL,
    type = "website",
    publishedTime,
    modifiedTime,
    author,
    section,
  } = data

  const fullTitle = `${title} | CollegeVaani`
  const fullUrl = url?.startsWith("http") ? url : `${process.env.NEXT_PUBLIC_APP_URL}${url}`

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    authors: author ? [{ name: author }] : [{ name: "CollegeVaani Team" }],
    creator: "CollegeVaani",
    publisher: "CollegeVaani",
    robots: "index, follow",
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: "CollegeVaani",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_IN",
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@collegevaani",
      site: "@collegevaani",
    },
    alternates: {
      canonical: fullUrl,
    },
    other: {
      "google-site-verification": process.env.GOOGLE_SITE_VERIFICATION || "",
    },
  }
}

// Structured data generator
export function generateStructuredData(type: string, data: any) {
  const baseData = {
    "@context": "https://schema.org",
    "@type": type,
  }

  switch (type) {
    case "EducationalOrganization":
      return {
        ...baseData,
        name: data.name,
        description: data.description,
        url: data.url,
        logo: data.logo,
        address: {
          "@type": "PostalAddress",
          streetAddress: data.address?.street,
          addressLocality: data.address?.city,
          addressRegion: data.address?.state,
          postalCode: data.address?.pincode,
          addressCountry: "IN",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: data.phone,
          email: data.email,
          contactType: "customer service",
        },
        sameAs: data.socialMedia || [],
      }

    case "Course":
      return {
        ...baseData,
        name: data.name,
        description: data.description,
        provider: {
          "@type": "EducationalOrganization",
          name: data.provider,
        },
        educationalLevel: data.level,
        timeRequired: data.duration,
        courseCode: data.code,
        inLanguage: "en",
        availableLanguage: ["en", "hi"],
      }

    case "Article":
      return {
        ...baseData,
        headline: data.title,
        description: data.description,
        image: data.image,
        author: {
          "@type": "Person",
          name: data.author,
        },
        publisher: {
          "@type": "Organization",
          name: "CollegeVaani",
          logo: {
            "@type": "ImageObject",
            url: `${process.env.NEXT_PUBLIC_APP_URL}/images/logo.png`,
          },
        },
        datePublished: data.publishedAt,
        dateModified: data.updatedAt,
      }

    default:
      return baseData
  }
}

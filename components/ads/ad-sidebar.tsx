"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Sparkles, BookOpen, Users } from "lucide-react"
import Link from "next/link"

interface AdSidebarProps {
  title: string
  description: string
  ctaText: string
  ctaLink: string
  type?: "content" | "course" | "community" | "premium"
  imageUrl?: string
}

export default function AdSidebar({
  title,
  description,
  ctaText,
  ctaLink,
  type = "content",
  imageUrl,
}: AdSidebarProps) {
  const [isEnabled, setIsEnabled] = useState(true)

  useEffect(() => {
    const checkAdSettings = async () => {
      try {
        const response = await fetch("/api/admin/ads/settings")
        const settings = await response.json()
        setIsEnabled(settings.sidebarAds?.enabled ?? true)
      } catch (error) {
        console.error("Failed to fetch ad settings:", error)
      }
    }

    checkAdSettings()
  }, [])

  if (!isEnabled) return null

  const getTypeConfig = () => {
    switch (type) {
      case "course":
        return {
          icon: BookOpen,
          gradient: "from-blue-500 to-indigo-500",
          badge: "Course",
        }
      case "community":
        return {
          icon: Users,
          gradient: "from-green-500 to-emerald-500",
          badge: "Community",
        }
      case "premium":
        return {
          icon: Sparkles,
          gradient: "from-purple-500 to-pink-500",
          badge: "Premium",
        }
      default:
        return {
          icon: ExternalLink,
          gradient: "from-indigo-500 to-purple-500",
          badge: "Featured",
        }
    }
  }

  const config = getTypeConfig()
  const IconComponent = config.icon

  return (
    <Card className="overflow-hidden border-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className={`h-2 bg-gradient-to-r ${config.gradient}`} />

      {imageUrl && (
        <div className="relative h-32 overflow-hidden">
          <img src={imageUrl || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
          <div className="absolute top-2 right-2">
            <Badge className={`bg-gradient-to-r ${config.gradient} text-white border-0`}>
              <IconComponent className="w-3 h-3 mr-1" />
              {config.badge}
            </Badge>
          </div>
        </div>
      )}

      <CardHeader className="pb-3">
        {!imageUrl && (
          <Badge className={`bg-gradient-to-r ${config.gradient} text-white border-0 w-fit mb-2`}>
            <IconComponent className="w-3 h-3 mr-1" />
            {config.badge}
          </Badge>
        )}
        <CardTitle className="text-lg leading-tight">{title}</CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>

        <Button
          asChild
          className={`w-full bg-gradient-to-r ${config.gradient} hover:opacity-90 shadow-md hover:shadow-lg transition-all duration-300`}
          size="sm"
        >
          <Link href={ctaLink}>
            {ctaText}
            <ExternalLink className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

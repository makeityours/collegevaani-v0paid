"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, ExternalLink, Sparkles, TrendingUp, Gift } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface AdBannerProps {
  title: string
  description: string
  ctaText: string
  ctaLink: string
  type?: "promotional" | "upgrade" | "content" | "partner"
  className?: string
  dismissible?: boolean
  imageUrl?: string
}

export default function AdBanner({
  title,
  description,
  ctaText,
  ctaLink,
  type = "promotional",
  className,
  dismissible = false,
  imageUrl,
}: AdBannerProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isEnabled, setIsEnabled] = useState(true)

  useEffect(() => {
    // Check if ads are enabled from admin settings
    const checkAdSettings = async () => {
      try {
        const response = await fetch("/api/admin/ads/settings")

        if (!response.ok) {
          console.warn("Failed to fetch ad settings, using defaults")
          return
        }

        const result = await response.json()

        if (result.success && result.data) {
          setIsEnabled(result.data.bannerAds?.enabled ?? true)
        } else {
          console.warn("Invalid ad settings response, using defaults")
        }
      } catch (error) {
        console.warn("Failed to fetch ad settings:", error)
        // Keep ads enabled by default if API fails
        setIsEnabled(true)
      }
    }

    checkAdSettings()
  }, [])

  if (!isVisible || !isEnabled) return null

  const getTypeStyles = () => {
    switch (type) {
      case "upgrade":
        return {
          gradient: "from-indigo-500 to-purple-600",
          icon: Sparkles,
          badge: "Premium",
        }
      case "content":
        return {
          gradient: "from-blue-500 to-indigo-500",
          icon: TrendingUp,
          badge: "Featured",
        }
      case "partner":
        return {
          gradient: "from-green-500 to-emerald-500",
          icon: Gift,
          badge: "Partner",
        }
      default:
        return {
          gradient: "from-purple-500 to-pink-500",
          icon: ExternalLink,
          badge: "Sponsored",
        }
    }
  }

  const typeStyles = getTypeStyles()
  const IconComponent = typeStyles.icon

  return (
    <Card
      className={cn(
        "relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300",
        className,
      )}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${typeStyles.gradient} opacity-5`} />

      <div className="relative p-6 md:p-8">
        <div className="flex items-start justify-between mb-4">
          <Badge variant="secondary" className={`bg-gradient-to-r ${typeStyles.gradient} text-white border-0`}>
            <IconComponent className="w-3 h-3 mr-1" />
            {typeStyles.badge}
          </Badge>

          {dismissible && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-gray-400 hover:text-gray-600"
              onClick={() => setIsVisible(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="grid md:grid-cols-4 gap-6 items-center">
          {imageUrl && (
            <div className="md:col-span-1">
              <div className="relative h-24 w-full rounded-lg overflow-hidden">
                <img
                  src={imageUrl || "/placeholder.svg?height=96&width=200&text=Ad+Image"}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          <div className={imageUrl ? "md:col-span-2" : "md:col-span-3"}>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>

          <div className="md:col-span-1 flex justify-end">
            <Button
              asChild
              className={`bg-gradient-to-r ${typeStyles.gradient} hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <Link href={ctaLink}>
                {ctaText}
                <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

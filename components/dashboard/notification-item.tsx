"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface NotificationItemProps {
  title: string
  description: string
  time: string
  icon: ReactNode
  isRead?: boolean
  priority?: "low" | "medium" | "high"
}

export function NotificationItem({
  title,
  description,
  time,
  icon,
  isRead = false,
  priority = "low",
}: NotificationItemProps) {
  const priorityColor = {
    low: "bg-blue-100",
    medium: "bg-yellow-100",
    high: "bg-red-100",
  }

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-3 rounded-md transition-colors",
        isRead ? "bg-transparent" : "bg-muted/30",
      )}
    >
      <div className={cn("h-8 w-8 rounded-full flex items-center justify-center", priorityColor[priority])}>{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <p className={cn("font-medium text-sm", !isRead && "font-semibold")}>{title}</p>
          <p className="text-xs text-muted-foreground ml-2">{time}</p>
        </div>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{description}</p>
      </div>
    </div>
  )
}

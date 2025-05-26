"use client"

import type { ReactNode } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface DashboardCardProps {
  title: string
  description?: string
  footer?: ReactNode
  className?: string
  children: ReactNode
}

export function DashboardCard({ title, description, footer, className, children }: DashboardCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-base md:text-lg">{title}</CardTitle>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0">{children}</CardContent>
      {footer && <CardFooter className="p-4 md:p-6 pt-0 border-t">{footer}</CardFooter>}
    </Card>
  )
}

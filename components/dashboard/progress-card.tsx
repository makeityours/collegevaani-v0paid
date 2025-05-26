import { cn } from "@/lib/utils"

interface ProgressCardProps {
  title: string
  value: number
  max: number
  description?: string
  className?: string
}

export function ProgressCard({ title, value, max, description, className }: ProgressCardProps) {
  const percentage = (value / max) * 100

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <p className="font-medium text-sm">{title}</p>
        <p className="text-sm text-muted-foreground">
          {value}/{max} steps
        </p>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </div>
  )
}

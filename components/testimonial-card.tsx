import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from 'lucide-react'

interface TestimonialCardProps {
  content: string
  author: string
  role: string
  program: string
  university: string
  rating: number
  image?: string
}

export function TestimonialCard({
  content,
  author,
  role,
  program,
  university,
  rating,
  image,
}: TestimonialCardProps) {
  // Generate initials from author name
  const initials = author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardContent className="pt-6">
        <div className="flex mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
            />
          ))}
        </div>
        <blockquote className="mb-6 italic text-muted-foreground">"{content}"</blockquote>
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12 border">
            {image ? <AvatarImage src={image || "/placeholder.svg"} alt={author} /> : null}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{author}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
        {program} • {university}
      </CardFooter>
    </Card>
  )
}

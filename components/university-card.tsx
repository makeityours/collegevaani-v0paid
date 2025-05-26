import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Award, MapPin, ExternalLink } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

interface UniversityCardProps {
  name: string
  logo: string
  location: string
  established: string
  rating: number
  accreditation: string
  programCount: number
  featured?: boolean
  href: string
}

export function UniversityCard({
  name,
  logo,
  location,
  established,
  rating,
  accreditation,
  programCount,
  featured = false,
  href,
}: UniversityCardProps) {
  return (
    <Card className={`overflow-hidden transition-all hover:shadow-md ${featured ? "border-blue-200" : ""}`}>
      {featured && (
        <div className="py-1 text-xs font-medium text-center text-white bg-gradient-to-r from-blue-600 to-indigo-600">
          Featured Partner
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 overflow-hidden rounded-md">
            <Image src={logo || "/placeholder.svg"} alt={name} fill className="object-contain" />
          </div>
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin className="w-3.5 h-3.5 mr-1 text-muted-foreground" />
              {location}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="grid grid-cols-2 gap-4 py-3 border-y">
          <div>
            <p className="text-xs text-muted-foreground">Established</p>
            <p className="font-medium">{established}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Rating</p>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1 text-yellow-400 fill-yellow-400" />
              <span className="font-medium">{rating}/5</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Accreditation</p>
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-1 text-blue-600" />
              <span className="font-medium">{accreditation}</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Programs</p>
            <p className="font-medium">{programCount}+ Online Programs</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">
          <Link href={href}>
            View Programs
            <ExternalLink className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

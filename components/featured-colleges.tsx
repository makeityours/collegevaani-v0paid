"use client"

import { useState } from "react"
import Image from "next/image"
import { MapPin, Star, ArrowRight, BookOpen, Users, Building } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const collegeCategories = [
  { value: "all", label: "All" },
  { value: "engineering", label: "Engineering" },
  { value: "medical", label: "Medical" },
  { value: "business", label: "Business" },
  { value: "arts", label: "Arts & Science" },
]

const colleges = {
  all: [
    {
      id: 1,
      name: "Indian Institute of Technology",
      location: "Delhi",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
      reviews: 1240,
      courses: "Engineering, Science, Technology",
      fees: "₹2.2L - ₹2.5L per year",
      featured: true,
    },
    {
      id: 2,
      name: "All India Institute of Medical Sciences",
      location: "New Delhi",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.9,
      reviews: 980,
      courses: "Medicine, Nursing, Paramedical",
      fees: "₹1.5L - ₹6.8L per year",
      featured: true,
    },
    {
      id: 3,
      name: "Indian Institute of Management",
      location: "Ahmedabad",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.7,
      reviews: 850,
      courses: "MBA, Executive MBA, PhD",
      fees: "₹23L - ₹28L for 2 years",
      featured: false,
    },
    {
      id: 4,
      name: "Delhi University",
      location: "Delhi",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.5,
      reviews: 1560,
      courses: "Arts, Science, Commerce",
      fees: "₹20K - ₹60K per year",
      featured: false,
    },
    {
      id: 5,
      name: "Birla Institute of Technology",
      location: "Pilani",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.6,
      reviews: 720,
      courses: "Engineering, Pharmacy, Management",
      fees: "₹1.8L - ₹4.5L per year",
      featured: false,
    },
    {
      id: 6,
      name: "National Law School of India University",
      location: "Bangalore",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
      reviews: 480,
      courses: "Law, Legal Studies",
      fees: "₹2.3L - ₹3.1L per year",
      featured: true,
    },
  ],
  engineering: [
    {
      id: 1,
      name: "Indian Institute of Technology",
      location: "Delhi",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
      reviews: 1240,
      courses: "Engineering, Science, Technology",
      fees: "₹2.2L - ₹2.5L per year",
      featured: true,
    },
    {
      id: 5,
      name: "Birla Institute of Technology",
      location: "Pilani",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.6,
      reviews: 720,
      courses: "Engineering, Pharmacy, Management",
      fees: "₹1.8L - ₹4.5L per year",
      featured: false,
    },
    {
      id: 7,
      name: "National Institute of Technology",
      location: "Trichy",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.5,
      reviews: 650,
      courses: "Engineering, Architecture",
      fees: "₹1.4L - ₹2.2L per year",
      featured: false,
    },
  ],
  medical: [
    {
      id: 2,
      name: "All India Institute of Medical Sciences",
      location: "New Delhi",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.9,
      reviews: 980,
      courses: "Medicine, Nursing, Paramedical",
      fees: "₹1.5L - ₹6.8L per year",
      featured: true,
    },
  ],
  business: [
    {
      id: 3,
      name: "Indian Institute of Management",
      location: "Ahmedabad",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.7,
      reviews: 850,
      courses: "MBA, Executive MBA, PhD",
      fees: "₹23L - ₹28L for 2 years",
      featured: false,
    },
  ],
  arts: [
    {
      id: 4,
      name: "Delhi University",
      location: "Delhi",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.5,
      reviews: 1560,
      courses: "Arts, Science, Commerce",
      fees: "₹20K - ₹60K per year",
      featured: false,
    },
    {
      id: 6,
      name: "National Law School of India University",
      location: "Bangalore",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
      reviews: 480,
      courses: "Law, Legal Studies",
      fees: "₹2.3L - ₹3.1L per year",
      featured: true,
    },
  ],
}

export default function FeaturedColleges() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
      <div className="flex justify-center mb-8 overflow-x-auto pb-2">
        <TabsList className="h-auto p-1 w-full sm:w-auto">
          {collegeCategories.map((category) => (
            <TabsTrigger
              key={category.value}
              value={category.value}
              className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {collegeCategories.map((category) => (
        <TabsContent key={category.value} value={category.value} className="mt-6">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {colleges[category.value as keyof typeof colleges].map((college) => (
              <Card
                key={college.id}
                className="overflow-hidden group hover:shadow-lg transition-all duration-300 animate-in fade-in-50 duration-1000"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={college.image || "/placeholder.svg"}
                    alt={college.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {college.featured && (
                    <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">Featured</Badge>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {college.name}
                      </CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin className="mr-1 h-3 w-3" /> {college.location}
                      </CardDescription>
                    </div>
                    <div className="flex items-center bg-primary/10 text-primary rounded-md px-2 py-1">
                      <Star className="h-3 w-3 fill-primary mr-1" />
                      <span className="text-sm font-medium">{college.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-start gap-1.5">
                      <BookOpen className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{college.courses}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Users className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{college.reviews} reviews</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5">
                    <Building className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-sm font-medium">Fees:</span>
                    <span className="text-sm text-muted-foreground">{college.fees}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full group/btn">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Clock, Users, Download, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceFilter, setPriceFilter] = useState("all")

  const courses = [
    {
      id: 1,
      title: "JEE Main Complete Preparation Course",
      instructor: "Dr. Rajesh Kumar",
      price: 2999,
      originalPrice: 4999,
      rating: 4.8,
      students: 1250,
      duration: "120 hours",
      level: "Intermediate",
      category: "Engineering",
      image: "/placeholder.svg?height=200&width=300&text=JEE+Course",
      description:
        "Complete preparation course for JEE Main with live classes, practice tests, and doubt clearing sessions.",
      features: ["Live Classes", "Practice Tests", "Doubt Clearing", "Study Material"],
      bestseller: true,
    },
    {
      id: 2,
      title: "NEET Biology Masterclass",
      instructor: "Dr. Priya Sharma",
      price: 1999,
      originalPrice: 2999,
      rating: 4.9,
      students: 890,
      duration: "80 hours",
      level: "Advanced",
      category: "Medical",
      image: "/placeholder.svg?height=200&width=300&text=NEET+Biology",
      description:
        "Comprehensive biology course for NEET preparation with detailed explanations and practice questions.",
      features: ["Video Lectures", "Practice Questions", "Mock Tests", "Notes"],
      bestseller: false,
    },
    {
      id: 3,
      title: "CAT Quantitative Aptitude Workshop",
      instructor: "Prof. Amit Singh",
      price: 1499,
      originalPrice: 2499,
      rating: 4.7,
      students: 567,
      duration: "40 hours",
      level: "Beginner",
      category: "Management",
      image: "/placeholder.svg?height=200&width=300&text=CAT+Quant",
      description: "Master quantitative aptitude for CAT with shortcuts, tricks, and extensive practice.",
      features: ["Shortcut Techniques", "Practice Sets", "Time Management", "Strategy"],
      bestseller: false,
    },
    {
      id: 4,
      title: "English Communication for Interviews",
      instructor: "Ms. Neha Gupta",
      price: 999,
      originalPrice: 1499,
      rating: 4.6,
      students: 2340,
      duration: "25 hours",
      level: "Beginner",
      category: "Soft Skills",
      image: "/placeholder.svg?height=200&width=300&text=English+Course",
      description: "Improve your English communication skills for college interviews and group discussions.",
      features: ["Speaking Practice", "Interview Tips", "Group Discussion", "Confidence Building"],
      bestseller: true,
    },
  ]

  const workshops = [
    {
      id: 1,
      title: "College Application Essay Writing Workshop",
      instructor: "Dr. Sarah Johnson",
      price: 799,
      date: "2024-02-15",
      time: "10:00 AM - 2:00 PM",
      duration: "4 hours",
      participants: 45,
      maxParticipants: 50,
      category: "Application",
      description: "Learn to write compelling college application essays that stand out.",
      upcoming: true,
    },
    {
      id: 2,
      title: "Scholarship Application Masterclass",
      instructor: "Prof. Michael Brown",
      price: 599,
      date: "2024-02-20",
      time: "2:00 PM - 5:00 PM",
      duration: "3 hours",
      participants: 32,
      maxParticipants: 40,
      category: "Scholarships",
      description: "Maximize your chances of getting scholarships with expert guidance.",
      upcoming: true,
    },
  ]

  const resources = [
    {
      id: 1,
      title: "JEE Main Previous Year Papers (2010-2023)",
      type: "PDF Bundle",
      price: 299,
      downloads: 5670,
      size: "45 MB",
      category: "Engineering",
      description: "Complete collection of JEE Main papers with detailed solutions.",
    },
    {
      id: 2,
      title: "NEET Biology Notes - Complete Syllabus",
      type: "Study Notes",
      price: 199,
      downloads: 3450,
      size: "25 MB",
      category: "Medical",
      description: "Comprehensive biology notes covering entire NEET syllabus.",
    },
  ]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || course.category.toLowerCase() === selectedCategory
    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "free" && course.price === 0) ||
      (priceFilter === "paid" && course.price > 0) ||
      (priceFilter === "under1000" && course.price < 1000) ||
      (priceFilter === "1000-3000" && course.price >= 1000 && course.price <= 3000) ||
      (priceFilter === "above3000" && course.price > 3000)

    return matchesSearch && matchesCategory && matchesPrice
  })

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Educational Marketplace</h1>
        <p className="text-xl text-muted-foreground">
          Premium courses, workshops, and resources to accelerate your learning
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search courses, workshops, or resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="medical">Medical</SelectItem>
            <SelectItem value="management">Management</SelectItem>
            <SelectItem value="soft skills">Soft Skills</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priceFilter} onValueChange={setPriceFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="under1000">Under ₹1,000</SelectItem>
            <SelectItem value="1000-3000">₹1,000 - ₹3,000</SelectItem>
            <SelectItem value="above3000">Above ₹3,000</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="workshops">Workshops</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  {course.bestseller && <Badge className="absolute top-2 left-2 bg-orange-500">Bestseller</Badge>}
                  <Badge className="absolute top-2 right-2 bg-black/70 text-white">{course.level}</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                  <CardDescription>by {course.instructor}</CardDescription>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {course.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">₹{course.price}</span>
                      {course.originalPrice > course.price && (
                        <span className="text-sm text-muted-foreground line-through">₹{course.originalPrice}</span>
                      )}
                    </div>
                    <Button asChild>
                      <Link href={`/marketplace/course/${course.id}`}>Enroll Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="workshops" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workshops.map((workshop) => (
              <Card key={workshop.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{workshop.title}</CardTitle>
                      <CardDescription>by {workshop.instructor}</CardDescription>
                    </div>
                    {workshop.upcoming && <Badge className="bg-green-500">Upcoming</Badge>}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{workshop.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Date:</span>
                      <span>{new Date(workshop.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Time:</span>
                      <span>{workshop.time}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Duration:</span>
                      <span>{workshop.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Participants:</span>
                      <span>
                        {workshop.participants}/{workshop.maxParticipants}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">₹{workshop.price}</span>
                    <Button>Register Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <Card key={resource.id}>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{resource.title}</CardTitle>
                  <CardDescription>{resource.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      <span>{resource.downloads} downloads</span>
                    </div>
                    <span>Size: {resource.size}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">₹{resource.price}</span>
                    <Button>Download</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

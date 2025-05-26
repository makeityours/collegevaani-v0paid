"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, MapPin, GraduationCap, Star, ArrowRight, Calendar, Target } from "lucide-react"
import Link from "next/link"
import AdBanner from "@/components/ads/ad-banner"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")

  const featuredColleges = [
    {
      id: 1,
      name: "Indian Institute of Technology Delhi",
      location: "New Delhi",
      rating: 4.8,
      fees: "₹2.5L/year",
      courses: 45,
      image: "/placeholder.svg?height=200&width=300&text=IIT+Delhi",
      badge: "Top Ranked",
    },
    {
      id: 2,
      name: "Indian Institute of Science",
      location: "Bangalore",
      rating: 4.9,
      fees: "₹1.8L/year",
      courses: 32,
      image: "/placeholder.svg?height=200&width=300&text=IISc+Bangalore",
      badge: "Research Excellence",
    },
    {
      id: 3,
      name: "All India Institute of Medical Sciences",
      location: "New Delhi",
      rating: 4.7,
      fees: "₹1.2L/year",
      courses: 28,
      image: "/placeholder.svg?height=200&width=300&text=AIIMS+Delhi",
      badge: "Medical Leader",
    },
  ]

  const popularCourses = [
    { name: "Computer Science Engineering", colleges: 1250, icon: "💻" },
    { name: "Medicine (MBBS)", colleges: 542, icon: "🏥" },
    { name: "Business Administration", colleges: 890, icon: "💼" },
    { name: "Mechanical Engineering", colleges: 756, icon: "⚙️" },
  ]

  const upcomingExams = [
    { name: "JEE Main 2024", date: "April 6-15", registrations: "12L+" },
    { name: "NEET 2024", date: "May 5", registrations: "18L+" },
    { name: "CAT 2024", date: "November 24", registrations: "2.3L+" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Find Your Perfect
            </span>
            <br />
            <span className="text-gray-900">College Match</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover the best colleges and courses tailored to your dreams. Get expert guidance, compare options, and
            make informed decisions for your future.
          </p>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="border-indigo-200 shadow-xl">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Search colleges, courses, exams..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-indigo-200 focus:border-indigo-500"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Location"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="pl-10 border-indigo-200 focus:border-indigo-500"
                    />
                  </div>
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">5000+</div>
              <div className="text-gray-600">Colleges</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">500+</div>
              <div className="text-gray-600">Courses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">1M+</div>
              <div className="text-gray-600">Students Helped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">50+</div>
              <div className="text-gray-600">Exams Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Banner Ad */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <AdBanner
          title="🎯 Boost Your College Applications"
          description="Get expert guidance from certified counselors and increase your admission chances by 3x"
          ctaText="Book Free Session"
          ctaLink="/lead-generation"
          type="upgrade"
          dismissible={true}
        />
      </section>

      {/* Featured Colleges */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Featured Colleges
            </span>
          </h2>
          <p className="text-gray-600 text-lg">Top-ranked institutions trusted by millions of students</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredColleges.map((college) => (
            <Card key={college.id} className="group hover:shadow-xl transition-all duration-300 border-indigo-100">
              <div className="relative overflow-hidden">
                <img
                  src={college.image || "/placeholder.svg"}
                  alt={college.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
                  {college.badge}
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2 group-hover:text-indigo-600 transition-colors">{college.name}</h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  {college.location}
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="font-medium">{college.rating}</span>
                  </div>
                  <div className="text-indigo-600 font-semibold">{college.fees}</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{college.courses} Courses</span>
                  <Button variant="ghost" size="sm" className="text-indigo-600 hover:bg-indigo-50">
                    View Details <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            <Link href="/colleges">
              Explore All Colleges <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Sidebar Ad */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <AdBanner
          title="📚 Premium College Guide 2024"
          description="Download our comprehensive guide with insider tips, admission strategies, and college rankings"
          ctaText="Download Free"
          ctaLink="/marketplace"
          type="content"
          imageUrl="/placeholder.svg?height=100&width=200&text=College+Guide"
        />
      </section>

      {/* Popular Courses */}
      <section className="max-w-7xl mx-auto px-4 py-16 bg-white/50 rounded-3xl mx-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Popular Courses
            </span>
          </h2>
          <p className="text-gray-600 text-lg">Explore trending courses with high demand</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularCourses.map((course, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-indigo-100">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{course.icon}</div>
                <h3 className="font-semibold mb-2 group-hover:text-indigo-600 transition-colors">{course.name}</h3>
                <p className="text-gray-600 text-sm">{course.colleges} colleges offering</p>
                <Button variant="ghost" size="sm" className="mt-4 text-indigo-600 hover:bg-indigo-50">
                  Explore <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Upcoming Exams */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Upcoming Exams
            </span>
          </h2>
          <p className="text-gray-600 text-lg">Stay updated with important exam dates</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {upcomingExams.map((exam, index) => (
            <Card key={index} className="border-indigo-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Calendar className="h-8 w-8 text-indigo-600" />
                  <Badge variant="outline" className="border-indigo-200 text-indigo-700">
                    {exam.registrations}
                  </Badge>
                </div>
                <h3 className="font-bold text-lg mb-2">{exam.name}</h3>
                <p className="text-gray-600 mb-4">Exam Date: {exam.date}</p>
                <Button variant="outline" className="w-full border-indigo-200 text-indigo-600 hover:bg-indigo-50">
                  Get Exam Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Bottom Banner Ad */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <AdBanner
          title="🤝 Partner with Top Colleges"
          description="Join our network of premium educational institutions and reach millions of students"
          ctaText="Become Partner"
          ctaLink="/partners"
          type="partner"
          dismissible={true}
        />
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Find Your Dream College?</h2>
          <p className="text-indigo-100 text-lg mb-8">
            Join thousands of students who found their perfect college match with CollegeVaani
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
              <Link href="/colleges">
                <GraduationCap className="h-5 w-5 mr-2" />
                Explore Colleges
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-indigo-600"
            >
              <Link href="/resources/college-predictor">
                <Target className="h-5 w-5 mr-2" />
                College Predictor
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

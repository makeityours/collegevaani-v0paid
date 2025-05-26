import Image from "next/image"
import { ArrowRight, BookOpen, GraduationCap, Users, Target } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import HeroSearch from "@/components/hero-search"
import FeaturedColleges from "@/components/featured-colleges"
import PopularCourses from "@/components/popular-courses"
import ExamCalendar from "@/components/exam-calendar"
import Testimonials from "@/components/testimonials"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container px-4 md:px-6 py-12 md:py-24 relative z-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4 animate-in slide-in-from-left-5 duration-700">
              <div className="space-y-2">
                <Badge variant="outline" className="mb-2 bg-primary/10 text-primary border-primary/20">
                  #1 College Search Platform in India
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Find Your Perfect <span className="text-primary">College Journey</span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Discover, compare, and apply to the best colleges in India. Your education journey starts here.
                </p>
              </div>

              <HeroSearch />

              <div className="flex flex-wrap gap-2 pt-2">
                <Button variant="outline" size="sm" className="rounded-full bg-background">
                  Engineering
                </Button>
                <Button variant="outline" size="sm" className="rounded-full bg-background">
                  Medical
                </Button>
                <Button variant="outline" size="sm" className="rounded-full bg-background">
                  Business
                </Button>
                <Button variant="outline" size="sm" className="rounded-full bg-background">
                  Arts
                </Button>
                <Button variant="outline" size="sm" className="rounded-full bg-background">
                  Science
                </Button>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted overflow-hidden">
                      <Image
                        src={`/placeholder-icon.png?height=32&width=32&text=${i}`}
                        alt={`User ${i}`}
                        width={32}
                        height={32}
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">10,000+</span> students found their ideal college last month
                </p>
              </div>
            </div>

            <div className="mx-auto lg:mx-0 relative animate-in slide-in-from-right-5 duration-700">
              <div className="relative h-[300px] w-full sm:h-[400px] md:h-[500px] md:w-[500px]">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="College students"
                  fill
                  className="object-cover rounded-lg shadow-2xl"
                  priority
                />

                {/* Floating cards */}
                <div className="absolute left-2 sm:-left-6 top-10 bg-background rounded-lg shadow-lg p-3 animate-float">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <GraduationCap className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">Top Colleges</p>
                      <p className="text-xs text-muted-foreground">1000+ options</p>
                    </div>
                  </div>
                </div>

                <div className="absolute right-2 sm:-right-6 bottom-20 bg-background rounded-lg shadow-lg p-3 animate-float-delay">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">Expert Guidance</p>
                      <p className="text-xs text-muted-foreground">24/7 support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-auto">
            <path
              fill="currentColor"
              fillOpacity="1"
              className="text-background"
              d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 animate-in fade-in-50 duration-1000">
              <Badge variant="outline" className="mb-2 bg-primary/10 text-primary border-primary/20">
                Why Choose CollegeVaani
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How We Help You Succeed</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                We simplify your college search with comprehensive information and tools to make informed decisions.
              </p>
            </div>
          </div>

          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            <Link href="/engagement" className="group">
              <Card className="h-full transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Interactive Community</h3>
                  <p className="text-muted-foreground">Join quizzes, forums, and live sessions with fellow students</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/lead-generation" className="group">
              <Card className="h-full transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Expert Counseling</h3>
                  <p className="text-muted-foreground">Get personalized guidance from education experts</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/resources" className="group">
              <Card className="h-full transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Study Resources</h3>
                  <p className="text-muted-foreground">Access comprehensive study materials and tools</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Colleges Section */}
      <section className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2 animate-in fade-in-50 duration-1000">
              <Badge variant="outline" className="mb-2 bg-primary/10 text-primary border-primary/20">
                Top Institutions
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Colleges</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Discover top-rated institutions across India
              </p>
            </div>
          </div>

          <FeaturedColleges />

          <div className="mt-12 flex justify-center animate-in fade-in-50 duration-1000">
            <Button size="lg" className="group">
              View All Colleges
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2 animate-in fade-in-50 duration-1000">
              <Badge variant="outline" className="mb-2 bg-primary/10 text-primary border-primary/20">
                In-Demand Programs
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Popular Courses</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Explore trending courses with high career potential
              </p>
            </div>
          </div>

          <PopularCourses />

          <div className="mt-12 flex justify-center animate-in fade-in-50 duration-1000">
            <Button variant="outline" size="lg" className="group">
              Explore All Courses
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Exam Calendar Section */}
      <section className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4 animate-in slide-in-from-left-5 duration-700">
              <div className="space-y-2">
                <Badge variant="outline" className="mb-2 bg-primary/10 text-primary border-primary/20">
                  Stay Updated
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Upcoming Entrance Exams</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Stay updated with the latest entrance exam schedules, application deadlines, and preparation
                  resources.
                </p>
              </div>

              <ExamCalendar />

              <Button className="w-full sm:w-auto group">
                View All Exams
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            <div className="mx-auto lg:mx-0 animate-in slide-in-from-right-5 duration-700">
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="Students preparing for exams"
                width={500}
                height={500}
                className="rounded-lg object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2 animate-in fade-in-50 duration-1000">
              <Badge variant="outline" className="mb-2 bg-primary/10 text-primary border-primary/20">
                Success Stories
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Students Say</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Hear from students who found their dream colleges through CollegeVaani
              </p>
            </div>
          </div>

          <Testimonials />
        </div>
      </section>

      {/* New Features Showcase */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <Badge variant="outline" className="mb-2 bg-primary/10 text-primary border-primary/20">
              New Features
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Enhanced Learning Experience
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Discover our new interactive features designed to enhance your educational journey
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Link href="/engagement" className="group">
              <Card className="h-full transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Interactive Community</h3>
                  <p className="text-muted-foreground">Join quizzes, forums, and live sessions with fellow students</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/lead-generation" className="group">
              <Card className="h-full transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Expert Counseling</h3>
                  <p className="text-muted-foreground">Get personalized guidance from education experts</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/resources" className="group">
              <Card className="h-full transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Study Resources</h3>
                  <p className="text-muted-foreground">Access comprehensive study materials and tools</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 animate-in fade-in-50 duration-1000">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Find Your Dream College?
              </h2>
              <p className="max-w-[900px] md:text-xl/relaxed">
                Get personalized college recommendations, connect with peers, and access exclusive resources.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in-50 duration-1000">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/colleges">Explore Colleges</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                asChild
              >
                <Link href="/lead-generation">Get Expert Guidance</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

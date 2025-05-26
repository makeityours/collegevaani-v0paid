import Link from "next/link"
import Image from "next/image"
import {
  BookOpen,
  Briefcase,
  ChevronRight,
  Clock,
  Filter,
  GraduationCap,
  Search,
  Users,
  ArrowRight,
  Building,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import CourseComparisonTool from "@/components/course-comparison-tool"

export default function CoursesPage() {
  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Explore Courses</h1>
          <p className="text-muted-foreground">
            Discover and compare courses across various disciplines and institutions
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 bg-muted/50 p-4 rounded-lg">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Search courses by name..." className="w-full pl-9 rounded-lg border" />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Course Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="undergraduate">Undergraduate</SelectItem>
                <SelectItem value="postgraduate">Postgraduate</SelectItem>
                <SelectItem value="diploma">Diploma</SelectItem>
                <SelectItem value="certificate">Certificate</SelectItem>
                <SelectItem value="doctorate">Doctorate</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Stream" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="management">Management</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="arts">Arts</SelectItem>
                <SelectItem value="commerce">Commerce</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" className="shrink-0">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <div className="md:hidden mt-4">
          <details className="bg-card rounded-lg border p-4">
            <summary className="font-semibold cursor-pointer">Filters</summary>
            <div className="mt-4">
              <Accordion type="multiple" defaultValue={["level", "stream", "duration", "fees"]}>
                <AccordionItem value="level">
                  <AccordionTrigger>Course Level</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {["Undergraduate", "Postgraduate", "Diploma", "Certificate", "Doctorate"].map((level) => (
                        <div key={level} className="flex items-center space-x-2">
                          <Checkbox id={`mobile-level-${level.toLowerCase()}`} />
                          <label
                            htmlFor={`mobile-level-${level.toLowerCase()}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {level}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="stream">
                  <AccordionTrigger>Stream</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {["Engineering", "Medical", "Management", "Science", "Arts", "Commerce", "Law", "Design"].map(
                        (stream) => (
                          <div key={stream} className="flex items-center space-x-2">
                            <Checkbox id={`stream-${stream.toLowerCase()}`} />
                            <label
                              htmlFor={`stream-${stream.toLowerCase()}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {stream}
                            </label>
                          </div>
                        ),
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="duration">
                  <AccordionTrigger>Duration</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {["Less than 1 year", "1 year", "2 years", "3 years", "4 years", "5 years or more"].map(
                        (duration) => (
                          <div key={duration} className="flex items-center space-x-2">
                            <Checkbox id={`duration-${duration.replace(/\s+/g, "-").toLowerCase()}`} />
                            <label
                              htmlFor={`duration-${duration.replace(/\s+/g, "-").toLowerCase()}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {duration}
                            </label>
                          </div>
                        ),
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="fees">
                  <AccordionTrigger>Fees Range</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {["Under ₹1 Lakh", "₹1-3 Lakh", "₹3-5 Lakh", "₹5-10 Lakh", "₹10-15 Lakh", "Above ₹15 Lakh"].map(
                        (fee) => (
                          <div key={fee} className="flex items-center space-x-2">
                            <Checkbox id={`fee-${fee.replace(/\s+/g, "-").toLowerCase()}`} />
                            <label
                              htmlFor={`fee-${fee.replace(/\s+/g, "-").toLowerCase()}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {fee}
                            </label>
                          </div>
                        ),
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="eligibility">
                  <AccordionTrigger>Eligibility</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {["10th Pass", "12th Pass", "Graduate", "Post Graduate", "Entrance Exam"].map((eligibility) => (
                        <div key={eligibility} className="flex items-center space-x-2">
                          <Checkbox id={`eligibility-${eligibility.replace(/\s+/g, "-").toLowerCase()}`} />
                          <label
                            htmlFor={`eligibility-${eligibility.replace(/\s+/g, "-").toLowerCase()}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {eligibility}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="mt-4 space-y-2">
                <Button className="w-full">Apply Filters</Button>
                <Button variant="outline" className="w-full">
                  Reset
                </Button>
              </div>
            </div>
          </details>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="hidden md:block">
            <div className="bg-card rounded-lg border p-4 sticky top-20">
              <h3 className="font-semibold mb-4">Filters</h3>

              <Accordion type="multiple" defaultValue={["level", "stream", "duration", "fees"]}>
                <AccordionItem value="level">
                  <AccordionTrigger>Course Level</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {["Undergraduate", "Postgraduate", "Diploma", "Certificate", "Doctorate"].map((level) => (
                        <div key={level} className="flex items-center space-x-2">
                          <Checkbox id={`level-${level.toLowerCase()}`} />
                          <label
                            htmlFor={`level-${level.toLowerCase()}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {level}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="stream">
                  <AccordionTrigger>Stream</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {["Engineering", "Medical", "Management", "Science", "Arts", "Commerce", "Law", "Design"].map(
                        (stream) => (
                          <div key={stream} className="flex items-center space-x-2">
                            <Checkbox id={`stream-${stream.toLowerCase()}`} />
                            <label
                              htmlFor={`stream-${stream.toLowerCase()}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {stream}
                            </label>
                          </div>
                        ),
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="duration">
                  <AccordionTrigger>Duration</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {["Less than 1 year", "1 year", "2 years", "3 years", "4 years", "5 years or more"].map(
                        (duration) => (
                          <div key={duration} className="flex items-center space-x-2">
                            <Checkbox id={`duration-${duration.replace(/\s+/g, "-").toLowerCase()}`} />
                            <label
                              htmlFor={`duration-${duration.replace(/\s+/g, "-").toLowerCase()}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {duration}
                            </label>
                          </div>
                        ),
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="fees">
                  <AccordionTrigger>Fees Range</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {["Under ₹1 Lakh", "₹1-3 Lakh", "₹3-5 Lakh", "₹5-10 Lakh", "₹10-15 Lakh", "Above ₹15 Lakh"].map(
                        (fee) => (
                          <div key={fee} className="flex items-center space-x-2">
                            <Checkbox id={`fee-${fee.replace(/\s+/g, "-").toLowerCase()}`} />
                            <label
                              htmlFor={`fee-${fee.replace(/\s+/g, "-").toLowerCase()}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {fee}
                            </label>
                          </div>
                        ),
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="eligibility">
                  <AccordionTrigger>Eligibility</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {["10th Pass", "12th Pass", "Graduate", "Post Graduate", "Entrance Exam"].map((eligibility) => (
                        <div key={eligibility} className="flex items-center space-x-2">
                          <Checkbox id={`eligibility-${eligibility.replace(/\s+/g, "-").toLowerCase()}`} />
                          <label
                            htmlFor={`eligibility-${eligibility.replace(/\s+/g, "-").toLowerCase()}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {eligibility}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-4 space-y-2">
                <Button className="w-full">Apply Filters</Button>
                <Button variant="outline" className="w-full">
                  Reset
                </Button>
              </div>
            </div>
          </div>

          {/* Course Listings */}
          <div className="md:col-span-3">
            {/* Popular Course Categories */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Popular Categories</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4">
                {[
                  { name: "Engineering", icon: Building, count: 250 },
                  { name: "Medical", icon: Briefcase, count: 120 },
                  { name: "Management", icon: Users, count: 180 },
                  { name: "Science", icon: BookOpen, count: 150 },
                  { name: "Arts", icon: GraduationCap, count: 200 },
                  { name: "Commerce", icon: Briefcase, count: 160 },
                ].map((category, index) => (
                  <Card key={index} className="hover:shadow-md transition-all duration-300 cursor-pointer">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                        <category.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-base">{category.name}</CardTitle>
                      <CardDescription>{category.count} courses</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Featured Courses */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Featured Courses</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[
                  {
                    title: "Bachelor of Technology (B.Tech)",
                    level: "Undergraduate",
                    stream: "Engineering",
                    duration: "4 Years",
                    eligibility: "10+2 with PCM",
                    avgFees: "₹2-8 Lakh per year",
                    image: "/placeholder.svg?height=200&width=300&text=B.Tech",
                    trending: true,
                  },
                  {
                    title: "Bachelor of Medicine and Surgery (MBBS)",
                    level: "Undergraduate",
                    stream: "Medical",
                    duration: "5.5 Years",
                    eligibility: "10+2 with PCB, NEET Qualification",
                    avgFees: "₹5-25 Lakh per year",
                    image: "/placeholder.svg?height=200&width=300&text=MBBS",
                    trending: true,
                  },
                  {
                    title: "Master of Business Administration (MBA)",
                    level: "Postgraduate",
                    stream: "Management",
                    duration: "2 Years",
                    eligibility: "Bachelor's Degree, CAT/MAT/XAT Score",
                    avgFees: "₹5-20 Lakh total",
                    image: "/placeholder.svg?height=200&width=300&text=MBA",
                    trending: true,
                  },
                ].map((course, index) => (
                  <Card key={index} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                    <div className="relative h-40">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {course.trending && (
                        <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">Trending</Badge>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {course.title}
                      </CardTitle>
                      <CardDescription>
                        {course.level} • {course.stream}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{course.avgFees}</span>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-1.5">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          <span className="font-medium">Eligibility:</span> {course.eligibility}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/courses/compare?course=${course.title.toLowerCase().replace(/\s+/g, "-")}`}>
                          Compare
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" className="group/btn" asChild>
                        <Link href={`/courses/${course.title.toLowerCase().replace(/\s+/g, "-")}`}>
                          View Details
                          <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <Button variant="outline" className="group">
                  View All Featured Courses
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>

            {/* Course Comparison Tool */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Compare Courses</h2>
              <CourseComparisonTool />
            </div>

            {/* All Courses */}
            <div>
              <h2 className="text-2xl font-bold mb-4">All Courses</h2>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="w-full justify-start overflow-x-auto">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="engineering">Engineering</TabsTrigger>
                  <TabsTrigger value="medical">Medical</TabsTrigger>
                  <TabsTrigger value="management">Management</TabsTrigger>
                  <TabsTrigger value="science">Science</TabsTrigger>
                  <TabsTrigger value="arts">Arts</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                  <div className="space-y-4">
                    {[
                      {
                        title: "Bachelor of Technology (B.Tech)",
                        level: "Undergraduate",
                        stream: "Engineering",
                        duration: "4 Years",
                        eligibility: "10+2 with PCM",
                        avgFees: "₹2-8 Lakh per year",
                        career: "Software Engineer, Data Scientist, Product Manager",
                        avgSalary: "₹6-12 LPA",
                        colleges: 500,
                      },
                      {
                        title: "Bachelor of Medicine and Surgery (MBBS)",
                        level: "Undergraduate",
                        stream: "Medical",
                        duration: "5.5 Years",
                        eligibility: "10+2 with PCB, NEET Qualification",
                        avgFees: "₹5-25 Lakh per year",
                        career: "Doctor, Surgeon, Medical Researcher",
                        avgSalary: "₹8-25 LPA",
                        colleges: 350,
                      },
                      {
                        title: "Master of Business Administration (MBA)",
                        level: "Postgraduate",
                        stream: "Management",
                        duration: "2 Years",
                        eligibility: "Bachelor's Degree, CAT/MAT/XAT Score",
                        avgFees: "₹5-20 Lakh total",
                        career: "Business Analyst, Marketing Manager, Consultant",
                        avgSalary: "₹10-20 LPA",
                        colleges: 600,
                      },
                      {
                        title: "Bachelor of Computer Applications (BCA)",
                        level: "Undergraduate",
                        stream: "Computer Science",
                        duration: "3 Years",
                        eligibility: "10+2 in any stream",
                        avgFees: "₹1-3 Lakh per year",
                        career: "Software Developer, Web Designer, System Analyst",
                        avgSalary: "₹4-8 LPA",
                        colleges: 450,
                      },
                      {
                        title: "Bachelor of Science in Data Science",
                        level: "Undergraduate",
                        stream: "Science",
                        duration: "3 Years",
                        eligibility: "10+2 with Mathematics",
                        avgFees: "₹1.5-4 Lakh per year",
                        career: "Data Analyst, Machine Learning Engineer, Statistician",
                        avgSalary: "₹5-15 LPA",
                        colleges: 200,
                      },
                      {
                        title: "Bachelor of Arts in Psychology",
                        level: "Undergraduate",
                        stream: "Arts",
                        duration: "3 Years",
                        eligibility: "10+2 in any stream",
                        avgFees: "₹0.5-2 Lakh per year",
                        career: "Counselor, HR Specialist, Researcher",
                        avgSalary: "₹3-8 LPA",
                        colleges: 300,
                      },
                      {
                        title: "Master of Computer Applications (MCA)",
                        level: "Postgraduate",
                        stream: "Computer Science",
                        duration: "2 Years",
                        eligibility: "Bachelor's degree with Mathematics",
                        avgFees: "₹1-4 Lakh per year",
                        career: "Software Developer, Project Manager, Database Administrator",
                        avgSalary: "₹6-12 LPA",
                        colleges: 250,
                      },
                      {
                        title: "Bachelor of Commerce (B.Com)",
                        level: "Undergraduate",
                        stream: "Commerce",
                        duration: "3 Years",
                        eligibility: "10+2 in any stream",
                        avgFees: "₹0.3-2 Lakh per year",
                        career: "Accountant, Financial Analyst, Banking Professional",
                        avgSalary: "₹3-7 LPA",
                        colleges: 700,
                      },
                    ].map((course, index) => (
                      <Card key={index} className="overflow-hidden hover:shadow-md transition-all duration-300">
                        <div className="flex flex-col md:flex-row">
                          <div className="p-4 md:p-6 flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-semibold hover:text-primary transition-colors">
                                  <Link href={`/courses/${course.title.toLowerCase().replace(/\s+/g, "-")}`}>
                                    {course.title}
                                  </Link>
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {course.level} • {course.stream}
                                </p>
                              </div>
                              <Badge variant="outline" className="bg-background">
                                {course.duration}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                              <div className="flex items-start gap-1.5">
                                <GraduationCap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-xs text-muted-foreground">Eligibility</p>
                                  <p className="text-sm font-medium">{course.eligibility}</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-1.5">
                                <Building className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-xs text-muted-foreground">Average Fees</p>
                                  <p className="text-sm font-medium">{course.avgFees}</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-1.5">
                                <Briefcase className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-xs text-muted-foreground">Average Salary</p>
                                  <p className="text-sm font-medium">{course.avgSalary}</p>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4">
                              <p className="text-sm">
                                <span className="font-medium">Career Options:</span> {course.career}
                              </p>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link
                                  href={`/courses/compare?course=${course.title.toLowerCase().replace(/\s+/g, "-")}`}
                                >
                                  Compare
                                </Link>
                              </Button>
                              <Button variant="outline" size="sm" className="group/btn" asChild>
                                <Link href={`/courses/${course.title.toLowerCase().replace(/\s+/g, "-")}`}>
                                  View Details
                                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                                </Link>
                              </Button>
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/colleges?course=${course.title.toLowerCase().replace(/\s+/g, "-")}`}>
                                  {course.colleges}+ Colleges
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Other tabs would have similar content filtered by category */}
                <TabsContent value="engineering" className="mt-6">
                  <div className="space-y-4">
                    {[
                      {
                        title: "Bachelor of Technology (B.Tech)",
                        level: "Undergraduate",
                        stream: "Engineering",
                        duration: "4 Years",
                        eligibility: "10+2 with PCM",
                        avgFees: "₹2-8 Lakh per year",
                        career: "Software Engineer, Data Scientist, Product Manager",
                        avgSalary: "₹6-12 LPA",
                        colleges: 500,
                      },
                      {
                        title: "Master of Technology (M.Tech)",
                        level: "Postgraduate",
                        stream: "Engineering",
                        duration: "2 Years",
                        eligibility: "B.Tech/B.E. with valid GATE score",
                        avgFees: "₹1-5 Lakh per year",
                        career: "Research Engineer, Technical Lead, Project Manager",
                        avgSalary: "₹8-15 LPA",
                        colleges: 300,
                      },
                    ].map((course, index) => (
                      <Card key={index} className="overflow-hidden hover:shadow-md transition-all duration-300">
                        <div className="flex flex-col md:flex-row">
                          <div className="p-4 md:p-6 flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-semibold hover:text-primary transition-colors">
                                  <Link href={`/courses/${course.title.toLowerCase().replace(/\s+/g, "-")}`}>
                                    {course.title}
                                  </Link>
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {course.level} • {course.stream}
                                </p>
                              </div>
                              <Badge variant="outline" className="bg-background">
                                {course.duration}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                              <div className="flex items-start gap-1.5">
                                <GraduationCap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-xs text-muted-foreground">Eligibility</p>
                                  <p className="text-sm font-medium">{course.eligibility}</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-1.5">
                                <Building className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-xs text-muted-foreground">Average Fees</p>
                                  <p className="text-sm font-medium">{course.avgFees}</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-1.5">
                                <Briefcase className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-xs text-muted-foreground">Average Salary</p>
                                  <p className="text-sm font-medium">{course.avgSalary}</p>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4">
                              <p className="text-sm">
                                <span className="font-medium">Career Options:</span> {course.career}
                              </p>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link
                                  href={`/courses/compare?course=${course.title.toLowerCase().replace(/\s+/g, "-")}`}
                                >
                                  Compare
                                </Link>
                              </Button>
                              <Button variant="outline" size="sm" className="group/btn" asChild>
                                <Link href={`/courses/${course.title.toLowerCase().replace(/\s+/g, "-")}`}>
                                  View Details
                                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                                </Link>
                              </Button>
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/colleges?course=${course.title.toLowerCase().replace(/\s+/g, "-")}`}>
                                  {course.colleges}+ Colleges
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-8 flex justify-center">
                <Button className="group">
                  Load More Courses
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

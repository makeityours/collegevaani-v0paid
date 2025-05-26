import Link from "next/link"
import Image from "next/image"
import { Calendar, ChevronRight, Clock, Download, Filter, FileText, GraduationCap, Info, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ExamAlertDialog from "@/components/exam-alert-dialog"
import ExamAlertSystem from "@/components/exam-alert-system"

export default function ExamsPage() {
  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Entrance Exams</h1>
          <p className="text-muted-foreground">
            Find comprehensive information about entrance exams, application dates, and preparation resources
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 bg-muted/50 p-4 rounded-lg">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Search exams by name..." className="w-full pl-9 rounded-lg border" />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Exam Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="management">Management</SelectItem>
                <SelectItem value="law">Law</SelectItem>
                <SelectItem value="design">Design</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="results">Results Declared</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" className="shrink-0">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Featured Exams */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Featured Exams</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                name: "JEE Main 2024",
                type: "Engineering",
                date: "January 24 - February 1, 2024",
                registrationEnd: "November 30, 2023",
                status: "upcoming",
                image: "/placeholder.svg?height=200&width=300&text=JEE Main",
              },
              {
                name: "NEET UG 2024",
                type: "Medical",
                date: "May 5, 2024",
                registrationEnd: "December 15, 2023",
                status: "upcoming",
                image: "/placeholder.svg?height=200&width=300&text=NEET UG",
              },
              {
                name: "CAT 2023",
                type: "Management",
                date: "November 26, 2023",
                registrationEnd: "September 20, 2023",
                status: "ongoing",
                image: "/placeholder.svg?height=200&width=300&text=CAT",
              },
            ].map((exam, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="relative h-40">
                  <Image
                    src={exam.image || "/placeholder.svg"}
                    alt={exam.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge
                    className={`absolute top-2 right-2 ${
                      exam.status === "upcoming"
                        ? "bg-primary/90 text-primary-foreground"
                        : exam.status === "ongoing"
                          ? "bg-green-500/90 text-white"
                          : "bg-orange-500/90 text-white"
                    }`}
                  >
                    {exam.status === "upcoming"
                      ? "Upcoming"
                      : exam.status === "ongoing"
                        ? "Ongoing"
                        : "Results Declared"}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">{exam.name}</CardTitle>
                  <CardDescription>{exam.type} Entrance Exam</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <span className="font-medium">Exam Date:</span>
                        <span className="text-muted-foreground ml-1">{exam.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <span className="font-medium">Registration Ends:</span>
                        <span className="text-muted-foreground ml-1">{exam.registrationEnd}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <ExamAlertDialog examName={exam.name} examDate={exam.date} />
                  <Button variant="outline" size="sm" className="group/btn" asChild>
                    <Link href={`/exams/${exam.name.toLowerCase().replace(/\s+/g, "-")}`}>
                      View Details
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Exam Categories */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Browse by Category</h2>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="all">All Exams</TabsTrigger>
              <TabsTrigger value="engineering">Engineering</TabsTrigger>
              <TabsTrigger value="medical">Medical</TabsTrigger>
              <TabsTrigger value="management">Management</TabsTrigger>
              <TabsTrigger value="law">Law</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="space-y-4">
                {[
                  {
                    name: "JEE Main 2024",
                    fullName: "Joint Entrance Examination Main",
                    type: "Engineering",
                    date: "January 24 - February 1, 2024",
                    registrationEnd: "November 30, 2023",
                    applicationFee: "₹1000 (General), ₹500 (SC/ST/PwD)",
                    status: "upcoming",
                  },
                  {
                    name: "NEET UG 2024",
                    fullName: "National Eligibility cum Entrance Test Undergraduate",
                    type: "Medical",
                    date: "May 5, 2024",
                    registrationEnd: "December 15, 2023",
                    applicationFee: "₹1600 (General), ₹900 (SC/ST/PwD)",
                    status: "upcoming",
                  },
                  {
                    name: "CAT 2023",
                    fullName: "Common Admission Test",
                    type: "Management",
                    date: "November 26, 2023",
                    registrationEnd: "September 20, 2023",
                    applicationFee: "₹2200 (General), ₹1100 (SC/ST/PwD)",
                    status: "ongoing",
                  },
                  {
                    name: "GATE 2024",
                    fullName: "Graduate Aptitude Test in Engineering",
                    type: "Engineering",
                    date: "February 3-11, 2024",
                    registrationEnd: "October 5, 2023",
                    applicationFee: "₹1800 (General), ₹900 (SC/ST/PwD)",
                    status: "upcoming",
                  },
                  {
                    name: "CLAT 2024",
                    fullName: "Common Law Admission Test",
                    type: "Law",
                    date: "December 3, 2023",
                    registrationEnd: "October 15, 2023",
                    applicationFee: "₹4000 (General), ₹3500 (SC/ST/PwD)",
                    status: "upcoming",
                  },
                  {
                    name: "NATA 2024",
                    fullName: "National Aptitude Test in Architecture",
                    type: "Design",
                    date: "April 20, 2024",
                    registrationEnd: "March 15, 2024",
                    applicationFee: "₹2000 (General), ₹1500 (SC/ST/PwD)",
                    status: "upcoming",
                  },
                  {
                    name: "XAT 2024",
                    fullName: "Xavier Aptitude Test",
                    type: "Management",
                    date: "January 7, 2024",
                    registrationEnd: "November 30, 2023",
                    applicationFee: "₹1800 (All Categories)",
                    status: "upcoming",
                  },
                  {
                    name: "CMAT 2024",
                    fullName: "Common Management Admission Test",
                    type: "Management",
                    date: "April 2024",
                    registrationEnd: "March 2024",
                    applicationFee: "₹2000 (General), ₹1000 (SC/ST/PwD)",
                    status: "upcoming",
                  },
                ].map((exam, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-md transition-all duration-300">
                    <div className="flex flex-col md:flex-row">
                      <div className="p-4 md:p-6 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold hover:text-primary transition-colors">
                              <Link href={`/exams/${exam.name.toLowerCase().replace(/\s+/g, "-")}`}>{exam.name}</Link>
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">{exam.fullName}</p>
                          </div>
                          <Badge
                            className={`${
                              exam.status === "upcoming"
                                ? "bg-primary/90 text-primary-foreground"
                                : exam.status === "ongoing"
                                  ? "bg-green-500/90 text-white"
                                  : "bg-orange-500/90 text-white"
                            }`}
                          >
                            {exam.status === "upcoming"
                              ? "Upcoming"
                              : exam.status === "ongoing"
                                ? "Ongoing"
                                : "Results Declared"}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div className="flex items-start gap-1.5">
                            <Calendar className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs text-muted-foreground">Exam Date</p>
                              <p className="text-sm font-medium">{exam.date}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-1.5">
                            <Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs text-muted-foreground">Registration Ends</p>
                              <p className="text-sm font-medium">{exam.registrationEnd}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-1.5">
                            <FileText className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs text-muted-foreground">Application Fee</p>
                              <p className="text-sm font-medium">{exam.applicationFee}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                          <Badge variant="outline" className="bg-background">
                            {exam.type}
                          </Badge>
                          {exam.status === "upcoming" && (
                            <Badge variant="outline" className="bg-background text-primary">
                              Registration Open
                            </Badge>
                          )}
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          <Button variant="outline" size="sm" className="group/btn" asChild>
                            <Link href={`/exams/${exam.name.toLowerCase().replace(/\s+/g, "-")}`}>
                              View Details
                              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="mr-1 h-4 w-4" />
                            Download Brochure
                          </Button>
                          <ExamAlertDialog examName={exam.name} examDate={exam.date} />
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
                    name: "JEE Main 2024",
                    fullName: "Joint Entrance Examination Main",
                    type: "Engineering",
                    date: "January 24 - February 1, 2024",
                    registrationEnd: "November 30, 2023",
                    applicationFee: "₹1000 (General), ₹500 (SC/ST/PwD)",
                    status: "upcoming",
                  },
                  {
                    name: "GATE 2024",
                    fullName: "Graduate Aptitude Test in Engineering",
                    type: "Engineering",
                    date: "February 3-11, 2024",
                    registrationEnd: "October 5, 2023",
                    applicationFee: "₹1800 (General), ₹900 (SC/ST/PwD)",
                    status: "upcoming",
                  },
                ].map((exam, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-md transition-all duration-300">
                    <div className="flex flex-col md:flex-row">
                      <div className="p-4 md:p-6 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold hover:text-primary transition-colors">
                              <Link href={`/exams/${exam.name.toLowerCase().replace(/\s+/g, "-")}`}>{exam.name}</Link>
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">{exam.fullName}</p>
                          </div>
                          <Badge
                            className={`${
                              exam.status === "upcoming"
                                ? "bg-primary/90 text-primary-foreground"
                                : exam.status === "ongoing"
                                  ? "bg-green-500/90 text-white"
                                  : "bg-orange-500/90 text-white"
                            }`}
                          >
                            {exam.status === "upcoming"
                              ? "Upcoming"
                              : exam.status === "ongoing"
                                ? "Ongoing"
                                : "Results Declared"}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div className="flex items-start gap-1.5">
                            <Calendar className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs text-muted-foreground">Exam Date</p>
                              <p className="text-sm font-medium">{exam.date}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-1.5">
                            <Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs text-muted-foreground">Registration Ends</p>
                              <p className="text-sm font-medium">{exam.registrationEnd}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-1.5">
                            <FileText className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs text-muted-foreground">Application Fee</p>
                              <p className="text-sm font-medium">{exam.applicationFee}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                          <Badge variant="outline" className="bg-background">
                            {exam.type}
                          </Badge>
                          {exam.status === "upcoming" && (
                            <Badge variant="outline" className="bg-background text-primary">
                              Registration Open
                            </Badge>
                          )}
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          <Button variant="outline" size="sm" className="group/btn" asChild>
                            <Link href={`/exams/${exam.name.toLowerCase().replace(/\s+/g, "-")}`}>
                              View Details
                              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="mr-1 h-4 w-4" />
                            Download Brochure
                          </Button>
                          <ExamAlertDialog examName={exam.name} examDate={exam.date} />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Exam Calendar */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Exam Calendar</h2>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Exam Dates</CardTitle>
              <CardDescription>Stay updated with important exam dates and deadlines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    month: "November 2023",
                    exams: [
                      { name: "CAT 2023", date: "November 26, 2023", type: "Management" },
                      { name: "SNAP 2023", date: "November 10, 2023", type: "Management" },
                    ],
                  },
                  {
                    month: "December 2023",
                    exams: [
                      { name: "CLAT 2024", date: "December 3, 2023", type: "Law" },
                      { name: "IIFT 2024", date: "December 10, 2023", type: "Management" },
                      { name: "SNAP 2023 (2nd Phase)", date: "December 22, 2023", type: "Management" },
                    ],
                  },
                  {
                    month: "January 2024",
                    exams: [
                      { name: "XAT 2024", date: "January 7, 2024", type: "Management" },
                      { name: "JEE Main 2024 (Session 1)", date: "January 24 - February 1, 2024", type: "Engineering" },
                    ],
                  },
                ].map((monthData, monthIndex) => (
                  <div key={monthIndex}>
                    <h3 className="font-semibold text-lg mb-2">{monthData.month}</h3>
                    <div className="space-y-2">
                      {monthData.exams.map((exam, examIndex) => (
                        <div
                          key={examIndex}
                          className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Calendar className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{exam.name}</p>
                              <p className="text-sm text-muted-foreground">{exam.date}</p>
                            </div>
                          </div>
                          <Badge variant="outline">{exam.type}</Badge>
                        </div>
                      ))}
                    </div>
                    {monthIndex < 2 && <Separator className="my-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Full Calendar
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Exam Alert System */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Stay Updated with Exam Alerts</h2>
          <ExamAlertSystem />
        </div>

        {/* Exam Preparation Resources */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Exam Preparation Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: "Free Study Material",
                description:
                  "Access free study materials, previous year papers, and sample questions for various entrance exams.",
                icon: FileText,
                link: "/resources/study-material",
              },
              {
                title: "Exam Guides",
                description:
                  "Comprehensive guides on exam patterns, syllabus, preparation strategies, and tips from toppers.",
                icon: GraduationCap,
                link: "/resources/exam-guides",
              },
              {
                title: "Mock Tests",
                description:
                  "Practice with free and premium mock tests to assess your preparation level and improve performance.",
                icon: Info,
                link: "/resources/mock-tests",
              },
            ].map((resource, index) => (
              <Card key={index} className="hover:shadow-md transition-all duration-300">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <resource.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{resource.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full group" asChild>
                    <Link href={resource.link}>
                      Explore Resources
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

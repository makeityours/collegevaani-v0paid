import { Select, SelectItem as SelectItemComponent } from "@/components/ui/select"
import { SelectContent } from "@/components/ui/select"
import { SelectValue } from "@/components/ui/select"
import { SelectTrigger } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"
import {
  BookOpen,
  Briefcase,
  Building,
  ChevronRight,
  Clock,
  Download,
  FileText,
  GraduationCap,
  Info,
  MapPin,
  CheckCircle,
  ArrowRight,
  Bookmark,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const courseSlug = params.slug

  // This would be fetched from an API in a real application
  const course = {
    title: "Bachelor of Technology (B.Tech)",
    level: "Undergraduate",
    stream: "Engineering",
    description:
      "Bachelor of Technology (B.Tech) is an undergraduate engineering degree program that typically spans four years. It is one of the most sought-after courses in India, offering specializations in various fields such as Computer Science, Mechanical, Electrical, Civil, and more. The program combines theoretical knowledge with practical applications to prepare students for careers in engineering and technology.",
    duration: "4 Years",
    eligibility: {
      qualification: "10+2 with Physics, Chemistry, and Mathematics",
      minMarks: "Minimum 60% aggregate in PCM (varies by institution)",
      entranceExams: ["JEE Main", "JEE Advanced", "State-level Engineering Entrance Exams"],
    },
    fees: {
      government: "₹40,000 - ₹1.5 Lakh per year",
      private: "₹1.5 Lakh - ₹8 Lakh per year",
      deemed: "₹2 Lakh - ₹10 Lakh per year",
    },
    specializations: [
      "Computer Science Engineering",
      "Mechanical Engineering",
      "Electrical Engineering",
      "Civil Engineering",
      "Electronics & Communication Engineering",
      "Chemical Engineering",
      "Aerospace Engineering",
      "Biotechnology Engineering",
    ],
    syllabus: {
      year1: [
        "Engineering Mathematics",
        "Engineering Physics",
        "Engineering Chemistry",
        "Basic Electrical Engineering",
        "Engineering Mechanics",
        "Programming Fundamentals",
        "Communication Skills",
        "Environmental Studies",
      ],
      year2: [
        "Data Structures and Algorithms",
        "Digital Electronics",
        "Computer Organization",
        "Discrete Mathematics",
        "Object-Oriented Programming",
        "Database Management Systems",
        "Numerical Methods",
        "Specialization Core Subjects",
      ],
      year3: [
        "Design and Analysis of Algorithms",
        "Operating Systems",
        "Computer Networks",
        "Software Engineering",
        "Web Technologies",
        "Specialization Electives",
        "Minor Project",
        "Industrial Training",
      ],
      year4: [
        "Advanced Specialization Courses",
        "Elective Subjects",
        "Major Project",
        "Seminar",
        "Professional Ethics",
        "Entrepreneurship Development",
      ],
    },
    careerProspects: {
      roles: [
        "Software Engineer",
        "Hardware Engineer",
        "System Analyst",
        "Network Administrator",
        "Data Scientist",
        "Project Manager",
        "Research & Development Engineer",
        "Technical Consultant",
      ],
      industries: [
        "Information Technology",
        "Manufacturing",
        "Telecommunications",
        "Automotive",
        "Aerospace",
        "Energy",
        "Healthcare",
        "Defense",
      ],
      avgSalary: "₹6-12 LPA (Entry Level)",
      topRecruiters: ["Google", "Microsoft", "Amazon", "TCS", "Infosys", "Wipro", "IBM", "Accenture"],
    },
    topColleges: [
      {
        name: "Indian Institute of Technology Delhi",
        location: "New Delhi",
        fees: "₹2.2L per year",
        ranking: 1,
        image: "/placeholder.svg?height=100&width=100&text=IIT Delhi",
      },
      {
        name: "Indian Institute of Technology Bombay",
        location: "Mumbai",
        fees: "₹2.2L per year",
        ranking: 2,
        image: "/placeholder.svg?height=100&width=100&text=IIT Bombay",
      },
      {
        name: "National Institute of Technology Trichy",
        location: "Tiruchirappalli",
        fees: "₹1.4L per year",
        ranking: 7,
        image: "/placeholder.svg?height=100&width=100&text=NIT Trichy",
      },
      {
        name: "Birla Institute of Technology and Science",
        location: "Pilani",
        fees: "₹4.5L per year",
        ranking: 12,
        image: "/placeholder.svg?height=100&width=100&text=BITS Pilani",
      },
      {
        name: "Delhi Technological University",
        location: "New Delhi",
        fees: "₹1.8L per year",
        ranking: 15,
        image: "/placeholder.svg?height=100&width=100&text=DTU",
      },
    ],
    faqs: [
      {
        question: "What is the difference between B.Tech and B.E.?",
        answer:
          "There is essentially no difference between B.Tech (Bachelor of Technology) and B.E. (Bachelor of Engineering) in terms of curriculum, job prospects, or higher education opportunities. Both are four-year undergraduate engineering degrees. The difference is mainly in the naming convention followed by different universities.",
      },
      {
        question: "Which B.Tech specialization has the best scope?",
        answer:
          "Computer Science Engineering, Artificial Intelligence & Machine Learning, Data Science, and Electronics & Communication Engineering currently have excellent scope due to the digital transformation across industries. However, the best specialization depends on your interests and aptitude.",
      },
      {
        question: "Is JEE Main mandatory for all B.Tech admissions?",
        answer:
          "No, JEE Main is not mandatory for all B.Tech admissions. While many government colleges and IITs/NITs require JEE scores, some private universities conduct their own entrance exams or offer direct admission based on 12th marks.",
      },
      {
        question: "What are the career options after B.Tech?",
        answer:
          "After B.Tech, you can pursue a job in your specialized field, go for higher studies like M.Tech or MBA, prepare for civil services, work as a research assistant, become an entrepreneur, or explore opportunities abroad.",
      },
      {
        question: "Can I switch my specialization after the first year?",
        answer:
          "Some colleges allow students to change their specialization after the first year, subject to availability of seats and academic performance. However, policies vary by institution, so it's best to check with your specific college.",
      },
    ],
    image: "/placeholder.svg?height=400&width=800&text=B.Tech",
    trending: true,
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/courses">Courses</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{course.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Course Header */}
      <div className="relative rounded-xl overflow-hidden mb-6">
        <div className="relative h-[200px] sm:h-[250px]">
          <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              {course.trending && <Badge className="mb-2 bg-primary/90 text-primary-foreground">Trending Course</Badge>}
              <h1 className="text-2xl md:text-3xl font-bold">{course.title}</h1>
              <p className="text-white/80 mt-1">
                {course.level} • {course.stream}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>Duration: {course.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Building className="h-4 w-4" />
                  <span>500+ Colleges</span>
                </div>
              </div>
            </div>
            <div className="hidden md:flex flex-col gap-2">
              <Button className="w-full">Find Colleges</Button>
              <Button variant="outline" className="w-full bg-white/10 text-white border-white/20 hover:bg-white/20">
                <Download className="mr-2 h-4 w-4" />
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden flex gap-2 mb-6">
        <Button className="flex-1">Find Colleges</Button>
        <Button variant="outline" className="flex-1">
          <Download className="mr-2 h-4 w-4" />
          Download Brochure
        </Button>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4 mb-8">
        {[
          { icon: Clock, label: "Duration", value: course.duration },
          { icon: GraduationCap, label: "Level", value: course.level },
          { icon: Building, label: "Avg. Fees (Private)", value: "₹1.5L - ₹8L / year" },
          { icon: Briefcase, label: "Avg. Salary", value: course.careerProspects.avgSalary },
        ].map((item, index) => (
          <Card key={index} className="border-none shadow-sm bg-muted/50">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="font-medium">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
              <TabsTrigger value="specializations">Specializations</TabsTrigger>
              <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
              <TabsTrigger value="career">Career Prospects</TabsTrigger>
              <TabsTrigger value="colleges">Top Colleges</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{course.description}</p>

                  <h3 className="font-semibold text-lg mt-6 mb-3">Highlights</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      {[
                        "4-year undergraduate engineering degree",
                        "Focuses on technical and practical knowledge",
                        "Multiple specializations available",
                        "Recognized by technical education bodies",
                        "Excellent career prospects in tech industry",
                      ].map((highlight, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      {[
                        "Hands-on laboratory and project work",
                        "Industry internships in the curriculum",
                        "Gateway to higher studies like M.Tech/MS",
                        "Opportunities for research and innovation",
                        "Global recognition and job opportunities",
                      ].map((highlight, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <h3 className="font-semibold text-lg mt-6 mb-3">Fee Structure</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                    <Card className="border-none shadow-sm bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Government Colleges</p>
                            <p className="text-lg font-semibold">{course.fees.government}</p>
                          </div>
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Building className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Private Colleges</p>
                            <p className="text-lg font-semibold">{course.fees.private}</p>
                          </div>
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Building className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Deemed Universities</p>
                            <p className="text-lg font-semibold">{course.fees.deemed}</p>
                          </div>
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Building className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <Button className="flex-1">Find Colleges Offering B.Tech</Button>
                    <Button variant="outline" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Download Brochure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="eligibility" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Eligibility Criteria</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <GraduationCap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Educational Qualification</h3>
                        <p className="text-muted-foreground mt-1">{course.eligibility.qualification}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <CheckCircle className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Minimum Marks Requirement</h3>
                        <p className="text-muted-foreground mt-1">{course.eligibility.minMarks}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Entrance Exams</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                          {course.eligibility.entranceExams.map((exam, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 rounded-md border">
                              <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                              <span>{exam}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-muted">
                    <div className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold">Important Note</h3>
                        <p className="text-muted-foreground mt-1">
                          Eligibility criteria may vary from one institution to another. Some private universities may
                          have their own entrance exams or offer direct admission based on 12th marks. It's advisable to
                          check the specific requirements of the colleges you're interested in.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specializations" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>B.Tech Specializations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                    {course.specializations.map((specialization, index) => (
                      <Card key={index} className="hover:shadow-md transition-all duration-300">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                              <GraduationCap className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{specialization}</h3>
                              <Button variant="link" className="p-0 h-auto mt-1" asChild>
                                <Link href={`/courses/b-tech-${specialization.toLowerCase().replace(/\s+/g, "-")}`}>
                                  View Details
                                  <ChevronRight className="ml-1 h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold">Choosing a Specialization</h3>
                        <p className="text-muted-foreground mt-1">
                          When choosing a B.Tech specialization, consider your interests, aptitude, career goals, and
                          industry demand. Research the curriculum, job prospects, and scope for higher education before
                          making a decision. You can also compare different specializations to find the best fit for
                          you.
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Compare Specializations
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="syllabus" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>B.Tech Syllabus</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="year1" className="w-full">
                    <TabsList className="w-full justify-start overflow-x-auto mb-4">
                      <TabsTrigger value="year1">First Year</TabsTrigger>
                      <TabsTrigger value="year2">Second Year</TabsTrigger>
                      <TabsTrigger value="year3">Third Year</TabsTrigger>
                      <TabsTrigger value="year4">Fourth Year</TabsTrigger>
                    </TabsList>

                    <TabsContent value="year1" className="mt-0">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                        {course.syllabus.year1.map((subject, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-3 rounded-md border hover:bg-muted/50 transition-colors"
                          >
                            <BookOpen className="h-4 w-4 text-primary shrink-0" />
                            <span>{subject}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="year2" className="mt-0">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                        {course.syllabus.year2.map((subject, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-3 rounded-md border hover:bg-muted/50 transition-colors"
                          >
                            <BookOpen className="h-4 w-4 text-primary shrink-0" />
                            <span>{subject}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="year3" className="mt-0">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                        {course.syllabus.year3.map((subject, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-3 rounded-md border hover:bg-muted/50 transition-colors"
                          >
                            <BookOpen className="h-4 w-4 text-primary shrink-0" />
                            <span>{subject}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="year4" className="mt-0">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                        {course.syllabus.year4.map((subject, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-3 rounded-md border hover:bg-muted/50 transition-colors"
                          >
                            <BookOpen className="h-4 w-4 text-primary shrink-0" />
                            <span>{subject}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="mt-6 flex justify-center">
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download Complete Syllabus
                    </Button>
                  </div>

                  <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-muted">
                    <div className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold">Note</h3>
                        <p className="text-muted-foreground mt-1">
                          The syllabus provided is a general outline for B.Tech programs. The actual curriculum may vary
                          based on the university, specialization, and academic year. Always refer to the official
                          university syllabus for the most accurate information.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="career" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Career Prospects</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold text-lg mb-3">Job Roles</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 mb-6">
                    {course.careerProspects.roles.map((role, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-3 rounded-md border hover:bg-muted/50 transition-colors"
                      >
                        <Briefcase className="h-4 w-4 text-primary shrink-0" />
                        <span>{role}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="font-semibold text-lg mt-6 mb-3">Industries</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-6">
                    {course.careerProspects.industries.map((industry, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-3 rounded-md border hover:bg-muted/50 transition-colors"
                      >
                        <Building className="h-4 w-4 text-primary shrink-0" />
                        <span>{industry}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="font-semibold text-lg mt-6 mb-3">Top Recruiters</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-6">
                    {course.careerProspects.topRecruiters.map((company, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center h-16 p-3 rounded-md border hover:bg-muted/50 transition-colors"
                      >
                        <span className="font-medium">{company}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="font-semibold text-lg mt-6 mb-3">Salary Trends</h3>
                  <Card className="border-none shadow-sm bg-muted/50 mb-6">
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Entry Level (0-2 years)</span>
                            <span className="text-sm font-medium">₹4-8 LPA</span>
                          </div>
                          <Progress value={40} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Mid Level (3-5 years)</span>
                            <span className="text-sm font-medium">₹8-15 LPA</span>
                          </div>
                          <Progress value={60} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Senior Level (6-10 years)</span>
                            <span className="text-sm font-medium">₹15-25 LPA</span>
                          </div>
                          <Progress value={80} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Leadership Roles (10+ years)</span>
                            <span className="text-sm font-medium">₹25+ LPA</span>
                          </div>
                          <Progress value={100} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <h3 className="font-semibold text-lg mt-6 mb-3">Higher Education Options</h3>
                  <div className="space-y-2">
                    {[
                      "M.Tech (Master of Technology)",
                      "MS (Master of Science) in specialized fields",
                      "MBA (Master of Business Administration)",
                      "Ph.D. in Engineering or related disciplines",
                      "Specialized certifications in emerging technologies",
                    ].map((option, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <GraduationCap className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{option}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="colleges" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Colleges Offering {course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {course.topColleges.map((college, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-lg border hover:shadow-md transition-all duration-300"
                      >
                        <div className="h-16 w-16 relative rounded-md overflow-hidden">
                          <Image
                            src={college.image || "/placeholder.svg"}
                            alt={college.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{college.name}</h3>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{college.location}</span>
                          </div>
                          <div className="flex items-center gap-4 mt-1">
                            <Badge variant="outline" className="text-xs">
                              Fees: {college.fees}
                            </Badge>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                              <span className="text-xs font-medium">NIRF Rank: #{college.ranking}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="shrink-0 group" asChild>
                          <Link href={`/colleges/${college.name.toLowerCase().replace(/\s+/g, "-")}`}>
                            View College
                            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-center">
                    <Button className="group">
                      View All Colleges
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="faqs" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {course.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          {/* Compare Courses */}
          <Card className="mb-6 sticky top-20">
            <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
              <CardTitle className="text-center">Compare Courses</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="course1" className="text-sm font-medium">
                    Course 1
                  </label>
                  <Input id="course1" value={course.title} readOnly />
                </div>
                <div className="space-y-2">
                  <label htmlFor="course2" className="text-sm font-medium">
                    Course 2
                  </label>
                  <Select>
                    <SelectTrigger id="course2">
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItemComponent value="bca">Bachelor of Computer Applications (BCA)</SelectItemComponent>
                      <SelectItemComponent value="bsc-cs">B.Sc. Computer Science</SelectItemComponent>
                      <SelectItemComponent value="bba">Bachelor of Business Administration (BBA)</SelectItemComponent>
                      <SelectItemComponent value="barch">Bachelor of Architecture (B.Arch)</SelectItemComponent>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Compare Now</Button>
              </form>
            </CardContent>
          </Card>

          {/* Related Courses */}
          <Card>
            <CardHeader>
              <CardTitle>Related Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Bachelor of Engineering (B.E.)",
                    level: "Undergraduate",
                    duration: "4 Years",
                    description: "Similar to B.Tech with focus on engineering principles",
                  },
                  {
                    title: "Bachelor of Science (B.Sc.) in Computer Science",
                    level: "Undergraduate",
                    duration: "3 Years",
                    description: "Focus on theoretical aspects of computer science",
                  },
                  {
                    title: "Bachelor of Computer Applications (BCA)",
                    level: "Undergraduate",
                    duration: "3 Years",
                    description: "Focus on computer applications and software development",
                  },
                  {
                    title: "Diploma in Engineering",
                    level: "Diploma",
                    duration: "3 Years",
                    description: "Practical engineering education with faster entry to workforce",
                  },
                ].map((relatedCourse, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{relatedCourse.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {relatedCourse.level} • {relatedCourse.duration}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">{relatedCourse.description}</p>
                      <Button variant="link" className="p-0 h-auto mt-1" asChild>
                        <Link href={`/courses/${relatedCourse.title.toLowerCase().replace(/\s+/g, "-")}`}>
                          View Course
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-start gap-2">
                  <Bookmark className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Save for Later</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Bookmark this course to access it quickly from your dashboard.
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Bookmark className="mr-2 h-4 w-4" />
                      Save Course
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

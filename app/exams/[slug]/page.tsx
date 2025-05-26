import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import {
  Calendar,
  Clock,
  Download,
  FileText,
  GraduationCap,
  Info,
  CheckCircle,
  AlertCircle,
  BookOpen,
  MapPin,
  ArrowRight,
  ChevronRight,
  Users,
  Bookmark,
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
import ExamAlertDialog from "@/components/exam-alert-dialog"

export default function ExamDetailPage({ params }: { params: { slug: string } }) {
  const examSlug = params.slug

  // This would be fetched from an API in a real application
  const exam = {
    name: "JEE Main 2024",
    fullName: "Joint Entrance Examination Main",
    description:
      "JEE Main is a standardized test conducted for admission to various engineering colleges in India. It is constituted by two papers - Paper 1 and Paper 2. JEE Main is conducted by the National Testing Agency (NTA).",
    type: "Engineering",
    conductedBy: "National Testing Agency (NTA)",
    website: "jeemain.nta.nic.in",
    dates: {
      registration: "November 1 - 30, 2023",
      examDate: "January 24 - February 1, 2024",
      resultDate: "February 12, 2024",
    },
    applicationFee: {
      general: "₹1000",
      scst: "₹500",
    },
    eligibility: {
      qualification: "10+2 or equivalent with Physics, Chemistry, and Mathematics",
      minMarks: "No minimum marks requirement for appearing in JEE Main",
      age: "No age limit for appearing in JEE Main",
      attempts: "Candidates can attempt JEE Main for 3 consecutive years",
    },
    examPattern: {
      mode: "Computer Based Test (CBT)",
      duration: "3 hours",
      sections: [
        { name: "Physics", questions: 30, marks: 120 },
        { name: "Chemistry", questions: 30, marks: 120 },
        { name: "Mathematics", questions: 30, marks: 120 },
      ],
      totalQuestions: 90,
      totalMarks: 360,
      markingScheme: "+4 for correct answer, -1 for incorrect answer, 0 for unattempted",
      languages: [
        "English",
        "Hindi",
        "Assamese",
        "Bengali",
        "Gujarati",
        "Kannada",
        "Malayalam",
        "Marathi",
        "Odia",
        "Punjabi",
        "Tamil",
        "Telugu",
        "Urdu",
      ],
    },
    syllabus: {
      physics: [
        "Physics and Measurement",
        "Kinematics",
        "Laws of Motion",
        "Work, Energy and Power",
        "Rotational Motion",
        "Gravitation",
        "Properties of Solids and Liquids",
        "Thermodynamics",
        "Kinetic Theory of Gases",
        "Oscillations and Waves",
        "Electrostatics",
        "Current Electricity",
        "Magnetic Effects of Current and Magnetism",
        "Electromagnetic Induction and Alternating Currents",
        "Electromagnetic Waves",
        "Optics",
        "Dual Nature of Matter and Radiation",
        "Atoms and Nuclei",
        "Electronic Devices",
        "Communication Systems",
      ],
      chemistry: [
        "Some Basic Concepts of Chemistry",
        "Structure of Atom",
        "Classification of Elements and Periodicity in Properties",
        "Chemical Bonding and Molecular Structure",
        "States of Matter: Gases and Liquids",
        "Thermodynamics",
        "Equilibrium",
        "Redox Reactions",
        "Hydrogen",
        "s-Block Elements",
        "p-Block Elements",
        "Organic Chemistry - Some Basic Principles and Techniques",
        "Hydrocarbons",
        "Environmental Chemistry",
        "Solid State",
        "Solutions",
        "Electrochemistry",
        "Chemical Kinetics",
        "Surface Chemistry",
        "General Principles and Processes of Isolation of Elements",
        "p-Block Elements",
        "d and f Block Elements",
        "Coordination Compounds",
        "Haloalkanes and Haloarenes",
        "Alcohols, Phenols and Ethers",
        "Aldehydes, Ketones and Carboxylic Acids",
        "Organic Compounds Containing Nitrogen",
        "Biomolecules",
        "Polymers",
        "Chemistry in Everyday Life",
      ],
      mathematics: [
        "Sets, Relations and Functions",
        "Complex Numbers and Quadratic Equations",
        "Matrices and Determinants",
        "Permutations and Combinations",
        "Mathematical Induction",
        "Binomial Theorem and its Simple Applications",
        "Sequences and Series",
        "Limit, Continuity and Differentiability",
        "Integral Calculus",
        "Differential Equations",
        "Coordinate Geometry",
        "Three Dimensional Geometry",
        "Vector Algebra",
        "Statistics and Probability",
        "Trigonometry",
        "Mathematical Reasoning",
      ],
    },
    topColleges: [
      {
        name: "Indian Institute of Technology Delhi",
        location: "New Delhi",
        cutoff: "95-99 percentile",
        image: "/placeholder.svg?height=100&width=100&text=IIT Delhi",
      },
      {
        name: "Indian Institute of Technology Bombay",
        location: "Mumbai",
        cutoff: "98-99 percentile",
        image: "/placeholder.svg?height=100&width=100&text=IIT Bombay",
      },
      {
        name: "National Institute of Technology Trichy",
        location: "Tiruchirappalli",
        cutoff: "97-99 percentile",
        image: "/placeholder.svg?height=100&width=100&text=NIT Trichy",
      },
      {
        name: "Birla Institute of Technology and Science",
        location: "Pilani",
        cutoff: "90-95 percentile",
        image: "/placeholder.svg?height=100&width=100&text=BITS Pilani",
      },
      {
        name: "Delhi Technological University",
        location: "New Delhi",
        cutoff: "95-98 percentile",
        image: "/placeholder.svg?height=100&width=100&text=DTU",
      },
    ],
    faqs: [
      {
        question: "How many attempts are allowed for JEE Main?",
        answer:
          "A candidate can attempt JEE Main for 3 consecutive years. JEE Main is conducted twice a year, so a candidate can appear for a maximum of 6 times in 3 consecutive years.",
      },
      {
        question: "Is there any age limit for JEE Main?",
        answer: "There is no age limit for appearing in JEE Main examination.",
      },
      {
        question: "What is the syllabus for JEE Main?",
        answer:
          "JEE Main syllabus includes topics from Physics, Chemistry, and Mathematics of class 11th and 12th. The detailed syllabus is available on the official website.",
      },
      {
        question: "How can I prepare for JEE Main?",
        answer:
          "For JEE Main preparation, candidates should focus on NCERT books, solve previous year papers, take mock tests, and follow a disciplined study schedule. Joining a coaching institute can also be helpful.",
      },
      {
        question: "What is the difference between JEE Main and JEE Advanced?",
        answer:
          "JEE Main is the first stage of the JEE examination, which is for admission to NITs, IIITs, and other CFTIs. JEE Advanced is the second stage, which is for admission to IITs. Only the top 2.5 lakh candidates from JEE Main can appear for JEE Advanced.",
      },
    ],
    image: "/placeholder.svg?height=400&width=800&text=JEE Main 2024",
    status: "upcoming",
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
            <BreadcrumbLink href="/exams">Exams</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{exam.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Exam Header */}
      <div className="relative rounded-xl overflow-hidden mb-6">
        <div className="relative h-[200px] sm:h-[250px]">
          <Image src={exam.image || "/placeholder.svg"} alt={exam.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <Badge
                className={`mb-2 ${
                  exam.status === "upcoming"
                    ? "bg-primary/90 text-primary-foreground"
                    : exam.status === "ongoing"
                      ? "bg-green-500/90 text-white"
                      : "bg-orange-500/90 text-white"
                }`}
              >
                {exam.status === "upcoming" ? "Upcoming" : exam.status === "ongoing" ? "Ongoing" : "Results Declared"}
              </Badge>
              <h1 className="text-2xl md:text-3xl font-bold">{exam.name}</h1>
              <p className="text-white/80 mt-1">{exam.fullName}</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>Exam Date: {exam.dates.examDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>Registration: {exam.dates.registration}</span>
                </div>
              </div>
            </div>
            <div className="hidden md:flex flex-col gap-2">
              <Button className="w-full">Apply Now</Button>
              <Button variant="outline" className="w-full bg-white/10 text-white border-white/20 hover:bg-white/20">
                <Download className="mr-2 h-4 w-4" />
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden flex gap-2 mb-6">
        <Button className="flex-1">Apply Now</Button>
        <Button variant="outline" className="flex-1">
          <Download className="mr-2 h-4 w-4" />
          Download Brochure
        </Button>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4 mb-8">
        {[
          { icon: Calendar, label: "Exam Date", value: exam.dates.examDate },
          { icon: Clock, label: "Registration", value: exam.dates.registration },
          { icon: FileText, label: "Result Date", value: exam.dates.resultDate },
          { icon: Info, label: "Conducted By", value: exam.conductedBy },
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
              <TabsTrigger value="dates">Important Dates</TabsTrigger>
              <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
              <TabsTrigger value="pattern">Exam Pattern</TabsTrigger>
              <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
              <TabsTrigger value="preparation">Preparation</TabsTrigger>
              <TabsTrigger value="practice">Practice Tests</TabsTrigger>
              <TabsTrigger value="colleges">Top Colleges</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {exam.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{exam.description}</p>

                  <h3 className="font-semibold text-lg mt-6 mb-3">Highlights</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      {[
                        "Computer Based Test (CBT)",
                        "Conducted twice a year (January and April sessions)",
                        "Gateway for admission to NITs, IIITs, and other CFTIs",
                        "Top 2.5 lakh candidates eligible for JEE Advanced",
                        "Available in 13 languages",
                      ].map((highlight, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      {[
                        "3-hour examination with 90 questions",
                        "Total marks: 360",
                        "Negative marking: -1 for incorrect answers",
                        "No age limit for candidates",
                        "Maximum 3 consecutive years (6 attempts)",
                      ].map((highlight, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <h3 className="font-semibold text-lg mt-6 mb-3">Application Fee</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card className="border-none shadow-sm bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">General/OBC</p>
                            <p className="text-lg font-semibold">{exam.applicationFee.general}</p>
                          </div>
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">SC/ST/PwD</p>
                            <p className="text-lg font-semibold">{exam.applicationFee.scst}</p>
                          </div>
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <Button className="flex-1">Apply Now</Button>
                    <Button variant="outline" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Download Brochure
                    </Button>
                    <ExamAlertDialog examName={exam.name} examDate={exam.dates.examDate} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dates" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Important Dates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative border-l-2 border-primary/30 pl-6 ml-2">
                    {[
                      { event: "Registration Starts", date: "November 1, 2023", status: "completed" },
                      { event: "Registration Ends", date: "November 30, 2023", status: "upcoming" },
                      { event: "Admit Card Release", date: "January 15, 2024", status: "upcoming" },
                      { event: "Exam Date (Session 1)", date: "January 24 - February 1, 2024", status: "upcoming" },
                      { event: "Answer Key Release", date: "February 5, 2024", status: "upcoming" },
                      { event: "Result Declaration", date: "February 12, 2024", status: "upcoming" },
                    ].map((item, index) => (
                      <div key={index} className="mb-8 relative">
                        <div
                          className={`absolute -left-8 h-4 w-4 rounded-full ${
                            item.status === "completed" ? "bg-primary" : "bg-muted-foreground/30"
                          }`}
                        ></div>
                        <div className="bg-card rounded-lg p-4 shadow-sm">
                          <h3 className="font-semibold">{item.event}</h3>
                          <p className="text-muted-foreground">{item.date}</p>
                          <Badge
                            className={`mt-2 ${
                              item.status === "completed"
                                ? "bg-green-500/90 text-white"
                                : "bg-primary/90 text-primary-foreground"
                            }`}
                          >
                            {item.status === "completed" ? "Completed" : "Upcoming"}
                          </Badge>
                        </div>
                      </div>
                    ))}
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
                        <p className="text-muted-foreground mt-1">{exam.eligibility.qualification}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <CheckCircle className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Minimum Marks Requirement</h3>
                        <p className="text-muted-foreground mt-1">{exam.eligibility.minMarks}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Age Limit</h3>
                        <p className="text-muted-foreground mt-1">{exam.eligibility.age}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <AlertCircle className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Number of Attempts</h3>
                        <p className="text-muted-foreground mt-1">{exam.eligibility.attempts}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-muted">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold">Important Note</h3>
                        <p className="text-muted-foreground mt-1">
                          Candidates must ensure they meet all eligibility criteria before applying. Any discrepancy
                          found at any stage will result in cancellation of candidature. For detailed eligibility
                          criteria, please refer to the official JEE Main 2024 Information Bulletin.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pattern" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Exam Pattern</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Exam Mode</h3>
                          <p className="text-muted-foreground mt-1">{exam.examPattern.mode}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Duration</h3>
                          <p className="text-muted-foreground mt-1">{exam.examPattern.duration}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Total Questions</h3>
                          <p className="text-muted-foreground mt-1">{exam.examPattern.totalQuestions} questions</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Total Marks</h3>
                          <p className="text-muted-foreground mt-1">{exam.examPattern.totalMarks} marks</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <CheckCircle className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Marking Scheme</h3>
                          <p className="text-muted-foreground mt-1">{exam.examPattern.markingScheme}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <GraduationCap className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Medium of Examination</h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {exam.examPattern.languages.map((language, index) => (
                              <Badge key={index} variant="outline" className="bg-background">
                                {language}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-semibold text-lg mt-8 mb-4">Section-wise Distribution</h3>
                  <div className="space-y-4">
                    {exam.examPattern.sections.map((section, index) => (
                      <div key={index} className="p-4 rounded-lg border">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold">{section.name}</h4>
                          <Badge variant="outline">{section.marks} marks</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                          <span>Number of Questions: {section.questions}</span>
                          <span>Marks per Question: 4</span>
                        </div>
                        <Progress value={(section.marks / exam.examPattern.totalMarks) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="syllabus" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Syllabus</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="physics" className="w-full">
                    <TabsList className="w-full justify-start overflow-x-auto mb-4">
                      <TabsTrigger value="physics">Physics</TabsTrigger>
                      <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
                      <TabsTrigger value="mathematics">Mathematics</TabsTrigger>
                    </TabsList>

                    <TabsContent value="physics" className="mt-0">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                        {exam.syllabus.physics.map((topic, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors"
                          >
                            <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="chemistry" className="mt-0">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                        {exam.syllabus.chemistry.map((topic, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors"
                          >
                            <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="mathematics" className="mt-0">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                        {exam.syllabus.mathematics.map((topic, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors"
                          >
                            <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                            <span>{topic}</span>
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
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preparation" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Exam Preparation Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="study-plan" className="w-full">
                    <TabsList className="w-full justify-start overflow-x-auto mb-4">
                      <TabsTrigger value="study-plan">Study Plan</TabsTrigger>
                      <TabsTrigger value="books">Recommended Books</TabsTrigger>
                      <TabsTrigger value="tips">Preparation Tips</TabsTrigger>
                      <TabsTrigger value="previous-papers">Previous Papers</TabsTrigger>
                    </TabsList>

                    <TabsContent value="study-plan" className="mt-0">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg">6-Month Study Plan for JEE Main 2024</h3>
                        <div className="grid gap-4">
                          {[
                            {
                              month: "Month 1-2: Foundation Building",
                              topics: [
                                "Complete NCERT Physics, Chemistry, Mathematics",
                                "Basic concept clarity",
                                "Formula memorization",
                              ],
                              target: "Complete syllabus overview and identify weak areas",
                            },
                            {
                              month: "Month 3-4: Intensive Practice",
                              topics: [
                                "Topic-wise practice questions",
                                "Previous year questions",
                                "Time management practice",
                              ],
                              target: "Solve 50+ questions daily across all subjects",
                            },
                            {
                              month: "Month 5-6: Mock Tests & Revision",
                              topics: ["Full-length mock tests", "Revision of important formulas", "Error analysis"],
                              target: "Attempt 3 mock tests per week, target 85%+ accuracy",
                            },
                          ].map((phase, index) => (
                            <Card key={index} className="p-4">
                              <h4 className="font-semibold text-primary mb-2">{phase.month}</h4>
                              <div className="space-y-2">
                                <div>
                                  <h5 className="font-medium">Focus Areas:</h5>
                                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                                    {phase.topics.map((topic, i) => (
                                      <li key={i}>{topic}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h5 className="font-medium">Target:</h5>
                                  <p className="text-sm text-muted-foreground">{phase.target}</p>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="books" className="mt-0">
                      <div className="grid gap-4 md:grid-cols-3">
                        {[
                          {
                            subject: "Physics",
                            books: [
                              "H.C. Verma - Concepts of Physics",
                              "D.C. Pandey - Understanding Physics",
                              "NCERT Physics Class 11 & 12",
                            ],
                          },
                          {
                            subject: "Chemistry",
                            books: [
                              "NCERT Chemistry Class 11 & 12",
                              "O.P. Tandon - Physical Chemistry",
                              "M.S. Chauhan - Organic Chemistry",
                            ],
                          },
                          {
                            subject: "Mathematics",
                            books: [
                              "NCERT Mathematics Class 11 & 12",
                              "R.D. Sharma",
                              "S.L. Loney - Coordinate Geometry",
                            ],
                          },
                        ].map((subject, index) => (
                          <Card key={index} className="p-4">
                            <h4 className="font-semibold text-primary mb-3">{subject.subject}</h4>
                            <ul className="space-y-2">
                              {subject.books.map((book, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                  <span className="text-sm">{book}</span>
                                </li>
                              ))}
                            </ul>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="practice" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Practice Tests & Mock Exams</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-4">
                      <h3 className="font-semibold mb-3">Free Mock Tests</h3>
                      <div className="space-y-3">
                        {[
                          { name: "JEE Main Mock Test 1", questions: 90, duration: "3 hours", attempted: false },
                          {
                            name: "JEE Main Mock Test 2",
                            questions: 90,
                            duration: "3 hours",
                            attempted: true,
                            score: "245/360",
                          },
                          { name: "Physics Chapter Test", questions: 30, duration: "1 hour", attempted: false },
                        ].map((test, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <h4 className="font-medium">{test.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {test.questions} Questions • {test.duration}
                              </p>
                              {test.attempted && test.score && (
                                <p className="text-sm text-green-600">Score: {test.score}</p>
                              )}
                            </div>
                            <Button variant={test.attempted ? "outline" : "default"} size="sm">
                              {test.attempted ? "Retake" : "Start Test"}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </Card>

                    <Card className="p-4">
                      <h3 className="font-semibold mb-3">Subject-wise Practice</h3>
                      <div className="space-y-3">
                        {[
                          { subject: "Physics", completed: 65, total: 100 },
                          { subject: "Chemistry", completed: 45, total: 80 },
                          { subject: "Mathematics", completed: 30, total: 90 },
                        ].map((subject, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="font-medium">{subject.subject}</span>
                              <span className="text-sm text-muted-foreground">
                                {subject.completed}/{subject.total} questions
                              </span>
                            </div>
                            <Progress value={(subject.completed / subject.total) * 100} className="h-2" />
                          </div>
                        ))}
                      </div>
                      <Button className="w-full mt-4">Continue Practice</Button>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="colleges" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Colleges Accepting {exam.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {exam.topColleges.map((college, index) => (
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
                          <div className="flex items-center mt-1">
                            <Badge variant="outline" className="text-xs">
                              Cutoff: {college.cutoff}
                            </Badge>
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
                    {exam.faqs.map((faq, index) => (
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
          {/* Application Form */}
          <Card className="mb-6 sticky top-20">
            <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
              <CardTitle className="text-center">Get Updates</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <Input id="name" placeholder="Enter your full name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </label>
                  <Input id="phone" placeholder="Enter your phone number" />
                </div>
                <Button className="w-full">Get Exam Updates</Button>
              </form>
              <div className="mt-4 text-center text-sm text-muted-foreground">
                <p>We'll send you important updates about:</p>
                <ul className="mt-2 space-y-1">
                  <li className="flex items-center justify-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-primary" />
                    <span>Registration deadlines</span>
                  </li>
                  <li className="flex items-center justify-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-primary" />
                    <span>Admit card release</span>
                  </li>
                  <li className="flex items-center justify-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-primary" />
                    <span>Result announcements</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Preparation Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Preparation Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Study Material</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Access free study materials, previous year papers, and sample questions.
                    </p>
                    <Button variant="link" className="p-0 h-auto mt-1" asChild>
                      <Link href="/resources/study-material">View Resources</Link>
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Mock Tests</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Practice with free and premium mock tests to assess your preparation level.
                    </p>
                    <Button variant="link" className="p-0 h-auto mt-1" asChild>
                      <Link href="/resources/mock-tests">Take Mock Test</Link>
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Expert Counseling</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Get personalized guidance from our expert counselors for exam preparation.
                    </p>
                    <Button variant="link" className="p-0 h-auto mt-1" asChild>
                      <Link href="/counseling">Book Session</Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-start gap-2">
                  <Bookmark className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Save for Later</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Bookmark this exam to access it quickly from your dashboard.
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Bookmark className="mr-2 h-4 w-4" />
                      Save Exam
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

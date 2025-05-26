import Image from "next/image"
import {
  MapPin,
  Star,
  Calendar,
  Clock,
  Users,
  Building,
  Phone,
  Mail,
  Globe,
  ChevronRight,
  Check,
  Info,
  FileText,
  GraduationCap,
  Award,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function CollegeDetailPage({ params }: { params: { id: string } }) {
  const collegeId = params.id

  // This would be fetched from an API in a real application
  const college = {
    id: collegeId,
    name: "Indian Institute of Technology Delhi",
    location: "Hauz Khas, New Delhi, Delhi 110016",
    image: "/placeholder.svg?height=400&width=800",
    logo: "/placeholder.svg?height=100&width=100",
    rating: 4.8,
    reviews: 1240,
    established: 1961,
    type: "Public/Government",
    approved: "AICTE, UGC",
    campus: "320 acres",
    courses: "Engineering, Science, Technology, Management",
    fees: {
      btech: "₹2.2L - ₹2.5L per year",
      mtech: "₹2.0L - ₹2.2L per year",
      phd: "₹1.5L - ₹1.8L per year",
    },
    ranking: {
      nirf: 2,
      outlook: 1,
      theWeek: 2,
      indiaToday: 1,
    },
    facilities: [
      "Hostel",
      "Sports Complex",
      "Library",
      "Labs",
      "Cafeteria",
      "Gym",
      "Wi-Fi Campus",
      "Auditorium",
      "Medical Center",
      "Bank",
    ],
    contact: {
      phone: "+91-11-2659-7135",
      email: "info@iitd.ac.in",
      website: "https://home.iitd.ac.in/",
    },
    about:
      "The Indian Institute of Technology Delhi (IIT Delhi) is one of the 23 IITs created to be Centres of Excellence for training, research and development in science, engineering and technology in India. Established as College of Engineering in 1961, the Institute was later declared as an Institution of National Importance under the 'Institutes of Technology (Amendment) Act, 1963' and was renamed as 'Indian Institute of Technology Delhi'. It was then accorded the status of a Deemed University with powers to decide its own academic policy, to conduct its own examinations, and to award its own degrees.",
    admissionProcess:
      "Admission to undergraduate programs at IIT Delhi is through the Joint Entrance Examination (JEE) Advanced, for which qualifying in JEE Main is a prerequisite. Admission to postgraduate programs is primarily through the Graduate Aptitude Test in Engineering (GATE). Some programs also accept scores from the Joint Admission Test for M.Sc. (JAM) or the Common Admission Test (CAT).",
    placements: {
      averagePackage: "₹16 LPA",
      highestPackage: "₹1.8 CPA",
      topRecruiters: ["Microsoft", "Google", "Amazon", "Goldman Sachs", "Morgan Stanley"],
      placementRate: "95%",
    },
    courses: [
      {
        name: "B.Tech in Computer Science and Engineering",
        duration: "4 Years",
        fees: "₹2.2L per year",
        eligibility: "10+2 with PCM, JEE Advanced",
        seats: 120,
      },
      {
        name: "B.Tech in Electrical Engineering",
        duration: "4 Years",
        fees: "₹2.2L per year",
        eligibility: "10+2 with PCM, JEE Advanced",
        seats: 100,
      },
      {
        name: "B.Tech in Mechanical Engineering",
        duration: "4 Years",
        fees: "₹2.2L per year",
        eligibility: "10+2 with PCM, JEE Advanced",
        seats: 100,
      },
      {
        name: "M.Tech in Computer Science and Engineering",
        duration: "2 Years",
        fees: "₹2.0L per year",
        eligibility: "B.Tech/B.E., GATE",
        seats: 60,
      },
      {
        name: "MBA",
        duration: "2 Years",
        fees: "₹10L for 2 years",
        eligibility: "Bachelor's Degree, CAT",
        seats: 100,
      },
    ],
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Campus",
      "/placeholder.svg?height=300&width=400&text=Library",
      "/placeholder.svg?height=300&width=400&text=Hostel",
      "/placeholder.svg?height=300&width=400&text=Labs",
      "/placeholder.svg?height=300&width=400&text=Sports",
      "/placeholder.svg?height=300&width=400&text=Cafeteria",
    ],
    faqs: [
      {
        question: "What is the admission process for B.Tech programs?",
        answer:
          "Admission to B.Tech programs at IIT Delhi is through JEE Advanced, for which qualifying in JEE Main is a prerequisite.",
      },
      {
        question: "Does IIT Delhi provide hostel facilities?",
        answer:
          "Yes, IIT Delhi provides hostel facilities for both boys and girls. The campus has multiple hostels with modern amenities.",
      },
      {
        question: "What is the placement record of IIT Delhi?",
        answer:
          "IIT Delhi has an excellent placement record with an average package of ₹16 LPA and highest package of ₹1.8 CPA. The placement rate is around 95%.",
      },
      {
        question: "Are there any scholarships available?",
        answer:
          "Yes, IIT Delhi offers various scholarships based on merit, means, and other criteria. These include Merit-cum-Means Scholarship, Institute Free Studentship, and SC/ST Scholarships.",
      },
      {
        question: "What are the research opportunities at IIT Delhi?",
        answer:
          "IIT Delhi has extensive research facilities across various departments. Students can participate in research projects, internships, and collaborate with faculty members on cutting-edge research.",
      },
    ],
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
            <BreadcrumbLink href="/colleges">Colleges</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{college.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* College Header */}
      <div className="relative rounded-xl overflow-hidden mb-6">
        <div className="relative h-[250px] sm:h-[300px]">
          <Image src={college.image || "/placeholder.svg"} alt={college.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="h-20 w-20 rounded-lg bg-white p-1 shadow-lg">
              <Image
                src={college.logo || "/placeholder.svg"}
                alt={`${college.name} logo`}
                width={80}
                height={80}
                className="rounded-md"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold">{college.name}</h1>
              <p className="flex items-center mt-1 text-white/80">
                <MapPin className="mr-1 h-4 w-4" /> {college.location}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{college.rating}</span>
                  <span className="text-white/80 ml-1">({college.reviews} reviews)</span>
                </div>
                <Badge className="bg-primary/90 text-white">NIRF Rank: {college.ranking.nirf}</Badge>
              </div>
            </div>
            <div className="hidden md:flex flex-col gap-2">
              <Button className="w-full">Apply Now</Button>
              <Button variant="outline" className="w-full bg-white/10 text-white border-white/20 hover:bg-white/20">
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden flex gap-2 mb-6">
        <Button className="flex-1">Apply Now</Button>
        <Button variant="outline" className="flex-1">
          Download Brochure
        </Button>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4 mb-8">
        {[
          { icon: Calendar, label: "Established", value: college.established },
          { icon: Building, label: "Type", value: college.type },
          { icon: Award, label: "Approved By", value: college.approved },
          { icon: MapPin, label: "Campus Size", value: college.campus },
          { icon: Briefcase, label: "Avg. Package", value: college.placements.averagePackage },
          { icon: Users, label: "Placement", value: college.placements.placementRate },
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
              <TabsTrigger value="courses">Courses & Fees</TabsTrigger>
              <TabsTrigger value="admission">Admission</TabsTrigger>
              <TabsTrigger value="placements">Placements</TabsTrigger>
              <TabsTrigger value="facilities">Facilities</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {college.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{college.about}</p>

                  <h3 className="font-semibold text-lg mt-6 mb-3">Highlights</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      {[
                        "NIRF Rank #2 in Engineering Category",
                        "320-acre campus with world-class facilities",
                        "95% placement rate with top companies",
                        "International collaborations with leading universities",
                        "Strong alumni network across the globe",
                      ].map((highlight, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      {[
                        "State-of-the-art research laboratories",
                        "Vibrant campus life with numerous clubs",
                        "Excellent hostel facilities for all students",
                        "Industry-relevant curriculum updated regularly",
                        "Entrepreneurship cell to support startups",
                      ].map((highlight, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <h3 className="font-semibold text-lg mt-6 mb-3">Rankings</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                    {Object.entries(college.ranking).map(([source, rank]) => (
                      <Card key={source} className="border-none shadow-sm bg-muted/50">
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                            <Award className="h-5 w-5 text-primary" />
                          </div>
                          <p className="text-xs text-muted-foreground capitalize">
                            {source === "nirf"
                              ? "NIRF"
                              : source === "theWeek"
                                ? "The Week"
                                : source === "indiaToday"
                                  ? "India Today"
                                  : source}
                          </p>
                          <p className="font-medium">Rank #{rank}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="courses" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Courses & Fees</CardTitle>
                  <CardDescription>Explore the various courses offered by {college.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {college.courses.map((course, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-all duration-300">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{course.name}</h3>
                            <div className="flex items-center gap-4 mt-1 text-sm">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{course.duration}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{course.seats} seats</span>
                              </div>
                            </div>
                          </div>
                          <Badge className="bg-primary/10 text-primary">{course.fees}</Badge>
                        </div>

                        <div className="mt-3">
                          <div className="flex items-start gap-1.5">
                            <GraduationCap className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                            <span className="text-sm">
                              <span className="font-medium">Eligibility:</span> {course.eligibility}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 flex justify-end">
                          <Button variant="outline" size="sm" className="group">
                            View Details
                            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="admission" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Admission Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{college.admissionProcess}</p>

                  <h3 className="font-semibold text-lg mb-3">Admission Highlights</h3>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 bg-muted/50">
                      <h4 className="font-medium mb-2">B.Tech Admission</h4>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <FileText className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium">Entrance Exam:</span> JEE Advanced
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium">Application Timeline:</span> January - June
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium">Eligibility:</span> 10+2 with PCM, JEE Advanced rank
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4 bg-muted/50">
                      <h4 className="font-medium mb-2">M.Tech Admission</h4>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <FileText className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium">Entrance Exam:</span> GATE
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium">Application Timeline:</span> March - May
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium">Eligibility:</span> B.Tech/B.E. with valid GATE score
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4 bg-muted/50">
                      <h4 className="font-medium mb-2">MBA Admission</h4>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <FileText className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium">Entrance Exam:</span> CAT
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium">Application Timeline:</span> December - February
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium">Eligibility:</span> Bachelor's Degree with valid CAT score
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <Button>Apply Now</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="placements" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Placements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {[
                      { label: "Average Package", value: college.placements.averagePackage },
                      { label: "Highest Package", value: college.placements.highestPackage },
                      { label: "Placement Rate", value: college.placements.placementRate },
                      { label: "Companies Visited", value: "150+" },
                    ].map((item, index) => (
                      <Card key={index} className="border-none shadow-sm bg-primary/5">
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <p className="text-xs text-muted-foreground">{item.label}</p>
                          <p className="font-semibold text-lg text-primary">{item.value}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <h3 className="font-semibold text-lg mb-3">Top Recruiters</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
                    {college.placements.topRecruiters.map((company, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-4 flex items-center justify-center h-20 bg-muted/50"
                      >
                        <span className="font-medium">{company}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="font-semibold text-lg mb-3">Placement Highlights</h3>
                  <div className="space-y-2">
                    {[
                      "95% of students placed within 6 months of graduation",
                      "Top sectors: IT, Finance, Consulting, Core Engineering",
                      "International placements in USA, UK, Singapore, and more",
                      "Pre-placement offers through internships",
                      "Dedicated Training and Placement Cell",
                    ].map((highlight, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="facilities" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Facilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {college.facilities.map((facility, index) => (
                      <div key={index} className="border rounded-lg p-4 flex items-center gap-3 bg-muted/50">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Check className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-medium">{facility}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="font-semibold text-lg mt-6 mb-3">Facility Details</h3>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Hostel Facilities</h4>
                      <p className="text-sm text-muted-foreground">
                        IIT Delhi provides separate hostels for boys and girls with modern amenities including Wi-Fi,
                        gym, recreation rooms, and mess facilities. Each hostel has a dedicated warden and support
                        staff.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Library</h4>
                      <p className="text-sm text-muted-foreground">
                        The central library houses over 300,000 books, journals, and digital resources. It provides
                        access to major international journals and databases. The library is open 24/7 during exam
                        periods.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Sports Complex</h4>
                      <p className="text-sm text-muted-foreground">
                        The sports complex includes facilities for cricket, football, basketball, tennis, swimming, and
                        indoor games. It also has a modern gymnasium with professional trainers and equipment for
                        fitness enthusiasts.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Laboratories</h4>
                      <p className="text-sm text-muted-foreground">
                        IIT Delhi has state-of-the-art laboratories across all departments equipped with the latest
                        technology and equipment. These labs provide hands-on experience and support cutting-edge
                        research.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Medical Center</h4>
                      <p className="text-sm text-muted-foreground">
                        The on-campus medical center provides 24/7 healthcare services with qualified doctors and
                        nurses. It includes an ambulance service, pharmacy, and referral system for specialized
                        treatment.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="gallery" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Campus Gallery</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
                    {college.gallery.map((image, index) => (
                      <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Campus image ${index + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
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
                  <div className="space-y-4">
                    {college.faqs.map((faq, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">{faq.question}</h4>
                        <p className="text-sm text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          {/* Application Form */}
          <Card className="mb-6 sticky top-20">
            <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
              <CardTitle className="text-center">Apply Now</CardTitle>
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
                <div className="space-y-2">
                  <label htmlFor="course" className="text-sm font-medium">
                    Interested Course
                  </label>
                  <select
                    id="course"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Select a course</option>
                    {college.courses.map((course, index) => (
                      <option key={index} value={course.name}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                </div>
                <Button className="w-full">Submit Application</Button>
              </form>
              <div className="mt-4 text-center text-sm text-muted-foreground">
                <p>Need help with admission?</p>
                <Button variant="link" className="p-0 h-auto">
                  Talk to our counselor
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{college.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{college.contact.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Website</p>
                    <p className="text-sm text-muted-foreground">{college.contact.website}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">{college.location}</p>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-center gap-4">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Facebook</span>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Instagram className="h-4 w-4" />
                  <span className="sr-only">Instagram</span>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

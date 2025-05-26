import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle, Star, Award, TrendingUp, Clock, Laptop, BookOpen, GraduationCap, Users } from "lucide-react"
import { Label } from "@/components/ui/label"

export default function OnlineDegreesPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="absolute inset-0 opacity-10 bg-grid-white/[0.2]" />
        <div className="container relative px-4 mx-auto text-center text-white md:px-6">
          <Badge className="px-4 py-1 mb-6 text-sm font-medium bg-white text-blue-600">New</Badge>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Transform Your Future with <span className="text-blue-300">Online Degree Programs</span>
          </h1>
          <p className="max-w-2xl mx-auto mb-10 text-lg text-blue-100 md:text-xl">
            Earn a recognized degree from top universities without leaving your home. Flexible, affordable, and designed
            for working professionals.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Explore Programs
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
              Talk to a Counselor
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-300" />
              <span>UGC Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-300" />
              <span>Industry Recognized</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-300" />
              <span>Flexible Learning</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-300" />
              <span>Placement Assistance</span>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Generation Form */}
      <section className="py-12 bg-gray-50">
        <div className="container px-4 mx-auto md:px-6">
          <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg -mt-14">
            <h2 className="mb-6 text-2xl font-bold text-center text-gray-900">
              Find the Perfect Online Degree Program
            </h2>
            <form className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email address"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="program" className="text-sm font-medium text-gray-700">
                  Program of Interest
                </label>
                <select
                  id="program"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a program</option>
                  <option value="bba">BBA - Bachelor of Business Administration</option>
                  <option value="mba">MBA - Master of Business Administration</option>
                  <option value="bca">BCA - Bachelor of Computer Applications</option>
                  <option value="mca">MCA - Master of Computer Applications</option>
                  <option value="btech">B.Tech - Bachelor of Technology</option>
                  <option value="mtech">M.Tech - Master of Technology</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">Get Free Counseling</Button>
                <p className="mt-2 text-xs text-center text-gray-500">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Program Finder Tool */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto md:px-6">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Find Your Perfect Program</h2>
            <p className="text-lg text-gray-600">
              Answer a few questions and we'll recommend the best online degree programs for you
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="career-goal">What's your career goal?</Label>
                    <select
                      id="career-goal"
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select your goal</option>
                      <option value="career-change">Career Change</option>
                      <option value="promotion">Get Promoted</option>
                      <option value="skill-upgrade">Skill Upgrade</option>
                      <option value="start-business">Start Own Business</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="work-experience">Work Experience</Label>
                    <select
                      id="work-experience"
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select experience</option>
                      <option value="0-2">0-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="industry">Preferred Industry</Label>
                    <select
                      id="industry"
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select industry</option>
                      <option value="technology">Technology</option>
                      <option value="finance">Finance</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="education">Education</option>
                      <option value="marketing">Marketing</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="budget">Budget Range</Label>
                    <select
                      id="budget"
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select budget</option>
                      <option value="under-1lakh">Under ₹1 Lakh</option>
                      <option value="1-3lakh">₹1-3 Lakh</option>
                      <option value="3-5lakh">₹3-5 Lakh</option>
                      <option value="above-5lakh">Above ₹5 Lakh</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="time-commitment">Time Commitment</Label>
                    <select
                      id="time-commitment"
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select time commitment</option>
                      <option value="part-time">Part-time (10-15 hrs/week)</option>
                      <option value="full-time">Full-time (25-30 hrs/week)</option>
                      <option value="flexible">Flexible schedule</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="learning-style">Preferred Learning Style</Label>
                    <select
                      id="learning-style"
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select learning style</option>
                      <option value="self-paced">Self-paced</option>
                      <option value="structured">Structured schedule</option>
                      <option value="interactive">Interactive sessions</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8">Find My Perfect Program</Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto md:px-6">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Featured Online Degree Programs</h2>
            <p className="text-lg text-gray-600">
              Choose from a wide range of UGC-approved online degree programs from top universities
            </p>
          </div>
          <Tabs defaultValue="undergraduate" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="undergraduate">Undergraduate</TabsTrigger>
              <TabsTrigger value="postgraduate">Postgraduate</TabsTrigger>
              <TabsTrigger value="diploma">Diploma & Certificate</TabsTrigger>
            </TabsList>
            <TabsContent value="undergraduate" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>BBA - Business Administration</CardTitle>
                    <CardDescription>Manipal University Jaipur</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">3 Years</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-amber-500" />
                      <span className="text-sm text-gray-600">NAAC A+ Accredited</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">100% Placement Assistance</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Comprehensive program covering all aspects of business management with specializations in
                      Marketing, Finance, and HR.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-lg font-bold">₹79,000/year</div>
                    <Button variant="outline">View Details</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>BCA - Computer Applications</CardTitle>
                    <CardDescription>Chandigarh University</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">3 Years</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-amber-500" />
                      <span className="text-sm text-gray-600">NAAC A+ Accredited</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-600">Industry-aligned curriculum</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Comprehensive program covering programming, database management, web development, and software
                      engineering.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-lg font-bold">₹65,000/year</div>
                    <Button variant="outline">View Details</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>B.Com - Commerce</CardTitle>
                    <CardDescription>Jain University</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">3 Years</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-amber-500" />
                      <span className="text-sm text-gray-600">NAAC A Accredited</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="w-4 h-4 text-indigo-500" />
                      <span className="text-sm text-gray-600">Active alumni network</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Comprehensive program covering accounting, taxation, corporate law, and financial management.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-lg font-bold">₹55,000/year</div>
                    <Button variant="outline">View Details</Button>
                  </CardFooter>
                </Card>
              </div>
              <div className="text-center">
                <Button variant="link" className="text-blue-600">
                  View All Undergraduate Programs
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="postgraduate" className="space-y-6">
              {/* Similar card structure for postgraduate programs */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>MBA - Business Administration</CardTitle>
                    <CardDescription>Amity University Online</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">2 Years</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-amber-500" />
                      <span className="text-sm text-gray-600">NAAC A+ Accredited</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">Top Recruiters</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Comprehensive MBA program with specializations in Marketing, Finance, HR, Operations, and more.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-lg font-bold">₹1,25,000/year</div>
                    <Button variant="outline">View Details</Button>
                  </CardFooter>
                </Card>
                {/* More cards */}
              </div>
              <div className="text-center">
                <Button variant="link" className="text-blue-600">
                  View All Postgraduate Programs
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="diploma" className="space-y-6">
              {/* Similar card structure for diploma programs */}
              <div className="text-center">
                <Button variant="link" className="text-blue-600">
                  View All Diploma Programs
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Why Choose Online Degrees */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto md:px-6">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Why Choose Online Degree Programs?</h2>
            <p className="text-lg text-gray-600">
              Experience the benefits of flexible learning without compromising on quality or recognition
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-blue-100">
                <Laptop className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Flexibility & Convenience</h3>
              <p className="text-gray-600">
                Study at your own pace and schedule. Access course materials anytime, anywhere, making it ideal for
                working professionals.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-100">
                <Award className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Recognized Degrees</h3>
              <p className="text-gray-600">
                All programs are UGC-approved and offered by NAAC-accredited universities, ensuring your degree has the
                same value as regular programs.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-green-100">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Career Advancement</h3>
              <p className="text-gray-600">
                Enhance your skills and qualifications while continuing your job, leading to better career opportunities
                and salary growth.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-purple-100">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Quality Education</h3>
              <p className="text-gray-600">
                Access high-quality learning materials, video lectures, and interactive sessions designed by industry
                experts and experienced faculty.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-red-100">
                <Users className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Networking Opportunities</h3>
              <p className="text-gray-600">
                Connect with peers, alumni, and industry professionals through virtual events, discussion forums, and
                alumni networks.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-amber-100">
                <GraduationCap className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Affordable Education</h3>
              <p className="text-gray-600">
                Online programs are typically more affordable than traditional on-campus programs, with various
                scholarship and EMI options available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Success Stories */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto md:px-6">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Success Stories</h2>
            <p className="text-lg text-gray-600">
              See how our graduates transformed their careers with online degree programs
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Priya Sharma",
                program: "MBA in Digital Marketing",
                company: "Google India",
                salary: "₹18 LPA",
                image: "/placeholder.svg?height=120&width=120&text=Priya",
                story:
                  "The MBA program helped me transition from traditional marketing to digital marketing. The practical projects and industry connections were invaluable.",
                rating: 5,
              },
              {
                name: "Rohit Kumar",
                program: "M.Tech in Data Science",
                company: "Microsoft",
                salary: "₹25 LPA",
                image: "/placeholder.svg?height=120&width=120&text=Rohit",
                story:
                  "The flexible schedule allowed me to study while working. The curriculum was industry-relevant and faculty support was excellent.",
                rating: 5,
              },
              {
                name: "Anjali Patel",
                program: "BBA in Finance",
                company: "HDFC Bank",
                salary: "₹8 LPA",
                image: "/placeholder.svg?height=120&width=120&text=Anjali",
                story:
                  "As a working professional, online education was perfect for me. The program content was comprehensive and placement support was great.",
                rating: 4,
              },
            ].map((story, index) => (
              <Card key={index} className="p-6">
                <div className="text-center mb-4">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xl font-bold">
                    {story.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <h3 className="font-bold text-lg">{story.name}</h3>
                  <p className="text-sm text-gray-600">{story.program}</p>
                  <div className="flex justify-center mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= story.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 italic">"{story.story}"</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Current Role:</span>
                    <span className="text-sm text-gray-600">{story.company}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Package:</span>
                    <span className="text-sm text-green-600 font-semibold">{story.salary}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto md:px-6">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Find answers to common questions about online degree programs</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Are online degrees recognized by employers?</AccordionTrigger>
                <AccordionContent>
                  Yes, all the online degree programs offered on our platform are UGC-approved and provided by
                  NAAC-accredited universities. These degrees have the same recognition and value as regular on-campus
                  degrees and are widely accepted by employers across India and globally.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do online classes work?</AccordionTrigger>
                <AccordionContent>
                  Online classes are delivered through a Learning Management System (LMS) where you can access video
                  lectures, reading materials, assignments, and tests. Most programs offer a mix of synchronous (live)
                  and asynchronous (recorded) sessions. You'll have regular interactions with faculty through discussion
                  forums, video conferencing, and email.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What are the admission requirements?</AccordionTrigger>
                <AccordionContent>
                  Admission requirements vary by program and university. Generally, undergraduate programs require a
                  10+2 qualification, while postgraduate programs require a relevant bachelor's degree. Some programs
                  may have additional requirements like entrance exams or work experience. Our counselors can provide
                  specific information for your program of interest.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Can I get a scholarship or financial aid?</AccordionTrigger>
                <AccordionContent>
                  Yes, many universities offer scholarships based on academic merit, need-based criteria, or for
                  specific categories like women in STEM. Additionally, most programs offer flexible payment options
                  including EMIs and education loans. Our counselors can guide you through the available financial
                  assistance options.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>How are exams conducted in online programs?</AccordionTrigger>
                <AccordionContent>
                  Exams are typically conducted through a combination of online proctored tests, assignments, projects,
                  and in some cases, in-person exams at designated centers. The exact examination pattern varies by
                  university and program. All methods ensure academic integrity while providing flexibility to online
                  learners.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" className="mt-4">
              View All FAQs
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container px-4 mx-auto text-center md:px-6">
          <h2 className="mb-4 text-3xl font-bold">Ready to Transform Your Career?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-blue-100">
            Take the first step towards a better future with our online degree programs. Our education counselors are
            ready to guide you.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Apply Now
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
              Download Brochure
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

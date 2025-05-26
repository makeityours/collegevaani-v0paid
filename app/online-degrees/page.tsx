import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle, Star, Award, Clock, Laptop, BookOpen, Users, ArrowRight, ChevronRight } from 'lucide-react'

export default function OnlineDegreesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="absolute inset-0 opacity-10 bg-grid-white/[0.2]" />
        <div className="container relative px-4 mx-auto text-center text-white md:px-6">
          <Badge className="px-3 py-1 mb-5 text-sm font-medium bg-white text-blue-600">New</Badge>
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Transform Your Future with <br className="hidden md:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Online Degree Programs</span>
          </h1>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-blue-100 md:text-xl">
            Earn a recognized degree from top universities without leaving your home. Flexible, affordable, and designed for working professionals.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Explore Programs
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
              Talk to a Counselor
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12">
            <div className="flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-300 fill-yellow-300" />
              <span className="text-sm font-medium">4.8/5 Student Rating</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-200" />
              <span className="text-sm font-medium">50,000+ Students Enrolled</span>
            </div>
            <div className="flex items-center">
              <Award className="w-5 h-5 mr-2 text-blue-200" />
              <span className="text-sm font-medium">UGC & AICTE Approved</span>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Generation Form */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 mx-auto md:px-6">
          <div className="max-w-4xl p-6 mx-auto -mt-20 bg-white rounded-lg shadow-xl dark:bg-gray-800">
            <h2 className="mb-6 text-2xl font-bold text-center">Find the Perfect Online Degree Program</h2>
            <Tabs defaultValue="undergraduate" className="w-full">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="undergraduate" className="flex-1">Undergraduate</TabsTrigger>
                <TabsTrigger value="postgraduate" className="flex-1">Postgraduate</TabsTrigger>
                <TabsTrigger value="diploma" className="flex-1">Diploma</TabsTrigger>
              </TabsList>
              <TabsContent value="undergraduate" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Program Category</label>
                    <select className="w-full h-10 px-3 border rounded-md border-input bg-background">
                      <option value="">Select Category</option>
                      <option value="engineering">Engineering</option>
                      <option value="management">Management</option>
                      <option value="arts">Arts & Humanities</option>
                      <option value="science">Science</option>
                      <option value="commerce">Commerce</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Specialization</label>
                    <select className="w-full h-10 px-3 border rounded-md border-input bg-background">
                      <option value="">Select Specialization</option>
                      <option value="cs">Computer Science</option>
                      <option value="it">Information Technology</option>
                      <option value="me">Mechanical Engineering</option>
                      <option value="ce">Civil Engineering</option>
                      <option value="ee">Electrical Engineering</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Study Mode</label>
                    <select className="w-full h-10 px-3 border rounded-md border-input bg-background">
                      <option value="">Select Mode</option>
                      <option value="fully-online">Fully Online</option>
                      <option value="blended">Blended Learning</option>
                      <option value="weekend">Weekend Classes</option>
                    </select>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">
                  Find Programs
                </Button>
              </TabsContent>
              <TabsContent value="postgraduate" className="space-y-4">
                {/* Similar form fields for postgraduate */}
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Program Category</label>
                    <select className="w-full h-10 px-3 border rounded-md border-input bg-background">
                      <option value="">Select Category</option>
                      <option value="mtech">M.Tech</option>
                      <option value="mba">MBA</option>
                      <option value="msc">M.Sc</option>
                      <option value="ma">MA</option>
                      <option value="mcom">M.Com</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Specialization</label>
                    <select className="w-full h-10 px-3 border rounded-md border-input bg-background">
                      <option value="">Select Specialization</option>
                      <option value="cs">Computer Science</option>
                      <option value="finance">Finance</option>
                      <option value="marketing">Marketing</option>
                      <option value="hr">Human Resources</option>
                      <option value="data-science">Data Science</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Study Mode</label>
                    <select className="w-full h-10 px-3 border rounded-md border-input bg-background">
                      <option value="">Select Mode</option>
                      <option value="fully-online">Fully Online</option>
                      <option value="blended">Blended Learning</option>
                      <option value="weekend">Weekend Classes</option>
                    </select>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">
                  Find Programs
                </Button>
              </TabsContent>
              <TabsContent value="diploma" className="space-y-4">
                {/* Similar form fields for diploma */}
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Program Category</label>
                    <select className="w-full h-10 px-3 border rounded-md border-input bg-background">
                      <option value="">Select Category</option>
                      <option value="tech">Technical</option>
                      <option value="management">Management</option>
                      <option value="design">Design</option>
                      <option value="healthcare">Healthcare</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Duration</label>
                    <select className="w-full h-10 px-3 border rounded-md border-input bg-background">
                      <option value="">Select Duration</option>
                      <option value="6months">6 Months</option>
                      <option value="1year">1 Year</option>
                      <option value="2years">2 Years</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Study Mode</label>
                    <select className="w-full h-10 px-3 border rounded-md border-input bg-background">
                      <option value="">Select Mode</option>
                      <option value="fully-online">Fully Online</option>
                      <option value="blended">Blended Learning</option>
                      <option value="weekend">Weekend Classes</option>
                    </select>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">
                  Find Programs
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container px-4 mx-auto md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 mb-10 md:flex-row">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Featured Online Degree Programs</h2>
              <p className="mt-2 text-muted-foreground">
                Explore our most popular online degree programs from top universities
              </p>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              View All Programs <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Program Card 1 */}
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <div className="relative">
                <div className="absolute top-0 right-0 z-10 px-3 py-1 m-2 text-xs font-medium text-white rounded-full bg-gradient-to-r from-blue-600 to-indigo-600">
                  Most Popular
                </div>
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="BCA Program"
                  className="object-cover w-full h-48"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-blue-600">
                    Undergraduate
                  </Badge>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">4.8</span>
                  </div>
                </div>
                <CardTitle className="mt-2">Bachelor of Computer Applications (BCA)</CardTitle>
                <CardDescription>Manipal University Jaipur</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">3 Years</span>
                  </div>
                  <div className="flex items-center">
                    <Laptop className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Fully Online</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">UGC Approved</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">10,000+ Students</span>
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Program Fee</p>
                      <p className="text-lg font-bold">₹1,20,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">EMI Starting</p>
                      <p className="text-lg font-bold">₹4,999/month</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600">Apply Now</Button>
                <Button variant="outline" className="flex-1">
                  Download Brochure
                </Button>
              </CardFooter>
            </Card>

            {/* Program Card 2 */}
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <div className="relative">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="MBA Program"
                  className="object-cover w-full h-48"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-blue-600">
                    Postgraduate
                  </Badge>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">4.7</span>
                  </div>
                </div>
                <CardTitle className="mt-2">Master of Business Administration (MBA)</CardTitle>
                <CardDescription>Amity University Online</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">2 Years</span>
                  </div>
                  <div className="flex items-center">
                    <Laptop className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Fully Online</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">UGC & AICTE Approved</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">15,000+ Students</span>
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Program Fee</p>
                      <p className="text-lg font-bold">₹1,80,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">EMI Starting</p>
                      <p className="text-lg font-bold">₹7,499/month</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600">Apply Now</Button>
                <Button variant="outline" className="flex-1">
                  Download Brochure
                </Button>
              </CardFooter>
            </Card>

            {/* Program Card 3 */}
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <div className="relative">
                <div className="absolute top-0 right-0 z-10 px-3 py-1 m-2 text-xs font-medium text-white rounded-full bg-gradient-to-r from-green-600 to-emerald-600">
                  High Placement
                </div>
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="MCA Program"
                  className="object-cover w-full h-48"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-blue-600">
                    Postgraduate
                  </Badge>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">4.9</span>
                  </div>
                </div>
                <CardTitle className="mt-2">Master of Computer Applications (MCA)</CardTitle>
                <CardDescription>BITS Pilani Work Integrated Learning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">2 Years</span>
                  </div>
                  <div className="flex items-center">
                    <Laptop className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Blended Learning</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">UGC Approved</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">8,000+ Students</span>
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Program Fee</p>
                      <p className="text-lg font-bold">₹2,50,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">EMI Starting</p>
                      <p className="text-lg font-bold">₹10,416/month</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600">Apply Now</Button>
                <Button variant="outline" className="flex-1">
                  Download Brochure
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Online Degrees */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 mx-auto md:px-6">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Why Choose Online Degree Programs?</h2>
            <p className="text-lg text-muted-foreground">
              Online degree programs offer flexibility, affordability, and quality education from the comfort of your home
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="w-12 h-12 mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Flexibility & Convenience</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Study at your own pace and schedule. Access course materials 24/7 from anywhere in the world.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500 shrink-0" />
                    <span>No need to relocate or commute</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500 shrink-0" />
                    <span>Balance work, family, and education</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500 shrink-0" />
                    <span>Self-paced learning options</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="w-12 h-12 mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Recognized Credentials</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Earn the same degree as on-campus students. All our programs are UGC/AICTE approved.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500 shrink-0" />
                    <span>Same curriculum as on-campus programs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500 shrink-0" />
                    <span>Degrees from top-ranked universities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500 shrink-0" />
                    <span>Globally recognized qualifications</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="w-12 h-12 mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Career Advancement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Enhance your skills and qualifications while continuing to work and gain experience.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500 shrink-0" />
                    <span>Dedicated placement assistance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500 shrink-0" />
                    <span>Industry-relevant curriculum</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500 shrink-0" />
                    <span>Networking opportunities with peers</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container px-4 mx-auto md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-8 text-3xl font-bold tracking-tight text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Are online degrees recognized by employers?</AccordionTrigger>
                <AccordionContent>
                  Yes, all the online degree programs offered on our platform are UGC/AICTE approved and are recognized by employers across India and globally. These degrees hold the same value as traditional on-campus degrees from the same universities.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do online classes work?</AccordionTrigger>
                <AccordionContent>
                  Online classes are delivered through a Learning Management System (LMS) where you can access video lectures, reading materials, assignments, and tests. Most programs offer a mix of synchronous (live) and asynchronous (self-paced) learning. You'll also have regular interaction with faculty and peers through discussion forums, video conferencing, and email.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What are the admission requirements?</AccordionTrigger>
                <AccordionContent>
                  Admission requirements vary by program and university. Generally, undergraduate programs require a 10+2 qualification, while postgraduate programs require a relevant bachelor's degree. Some programs may also have entrance exams or interviews. Detailed eligibility criteria are provided on each program page.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Are there any scholarships available?</AccordionTrigger>
                <AccordionContent>
                  Yes, many universities offer scholarships based on merit, need, or specific categories. Additionally, we have partnered with various financial institutions to provide education loans with favorable terms. Our counselors can guide you through the available financial aid options.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>How are exams conducted in online programs?</AccordionTrigger>
                <AccordionContent>
                  Exams are typically conducted through online proctoring systems that monitor students via webcam during the exam. Some programs may require you to visit designated exam centers for final or major exams. The exact examination pattern is communicated to students well in advance.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>Can I transfer from an online program to on-campus?</AccordionTrigger>
                <AccordionContent>
                  Transfer policies vary by university. Some institutions allow transfers between online and on-campus programs, subject to seat availability and meeting certain criteria. It's best to check with the specific university for their transfer policies.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="mt-8 text-center">
              <p className="mb-4 text-muted-foreground">Still have questions?</p>
              <Button variant="outline">Contact an Admission Counselor</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container px-4 mx-auto text-center md:px-6">
          <h2 className="mb-4 text-3xl font-bold">Ready to Transform Your Career?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-blue-100">
            Take the first step towards a better future with our online degree programs. Get expert guidance from our counselors.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Apply Now
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
              Download Brochure
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

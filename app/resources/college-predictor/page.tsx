"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Building, ChevronRight, Filter, GraduationCap, Info, MapPin, Sliders } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function CollegePredictorPage() {
  const [examType, setExamType] = useState("jee-main")
  const [rank, setRank] = useState("")
  const [category, setCategory] = useState("general")
  const [state, setState] = useState("")
  const [preferenceWeight, setPreferenceWeight] = useState([50])
  const [showResults, setShowResults] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowResults(true)
    // In a real app, this would make an API call to get predictions
  }

  return (
    <div className="container px-4 md:px-6 py-6 md:py-8">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/resources">Resources</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>College Predictor</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">College Predictor</h1>
          <p className="text-muted-foreground">
            Predict your chances of admission to top colleges based on your entrance exam rank and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Enter Your Details</CardTitle>
                <CardDescription>Provide your exam details to get college predictions</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Tabs defaultValue="jee-main" value={examType} onValueChange={setExamType}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="jee-main">JEE Main</TabsTrigger>
                      <TabsTrigger value="neet">NEET</TabsTrigger>
                      <TabsTrigger value="other">Other</TabsTrigger>
                    </TabsList>
                    <TabsContent value="jee-main" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="jee-rank">JEE Main Rank</Label>
                        <Input
                          id="jee-rank"
                          type="number"
                          placeholder="Enter your rank"
                          value={rank}
                          onChange={(e) => setRank(e.target.value)}
                          required
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="neet" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="neet-rank">NEET Rank</Label>
                        <Input
                          id="neet-rank"
                          type="number"
                          placeholder="Enter your rank"
                          value={rank}
                          onChange={(e) => setRank(e.target.value)}
                          required
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="other" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="exam-name">Exam Name</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select exam" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gate">GATE</SelectItem>
                            <SelectItem value="cat">CAT</SelectItem>
                            <SelectItem value="clat">CLAT</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="other-rank">Your Rank</Label>
                        <Input
                          id="other-rank"
                          type="number"
                          placeholder="Enter your rank"
                          value={rank}
                          onChange={(e) => setRank(e.target.value)}
                          required
                        />
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="space-y-2">
                    <Label>Category</Label>
                    <RadioGroup
                      defaultValue="general"
                      value={category}
                      onValueChange={setCategory}
                      className="grid grid-cols-2 gap-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="general" id="general" />
                        <Label htmlFor="general">General</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="obc" id="obc" />
                        <Label htmlFor="obc">OBC</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sc" id="sc" />
                        <Label htmlFor="sc">SC</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="st" id="st" />
                        <Label htmlFor="st">ST</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">Preferred State</Label>
                    <Select value={state} onValueChange={setState}>
                      <SelectTrigger id="state">
                        <SelectValue placeholder="Select state (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="maharashtra">Maharashtra</SelectItem>
                        <SelectItem value="karnataka">Karnataka</SelectItem>
                        <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                        <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                        <SelectItem value="west-bengal">West Bengal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Preference Weightage</Label>
                      <span className="text-sm text-muted-foreground">{preferenceWeight}%</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-muted-foreground">Location</span>
                      <Slider
                        value={preferenceWeight}
                        onValueChange={setPreferenceWeight}
                        max={100}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-xs text-muted-foreground">Ranking</span>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Predict Colleges
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium">Enter Your Details</h3>
                    <p className="text-sm text-muted-foreground">Provide your exam rank, category, and preferences</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium">Get Predictions</h3>
                    <p className="text-sm text-muted-foreground">
                      Our algorithm analyzes historical cutoff data to predict your chances
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium">Explore Options</h3>
                    <p className="text-sm text-muted-foreground">
                      Compare colleges and courses where you have good chances of admission
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    4
                  </div>
                  <div>
                    <h3 className="font-medium">Get Expert Guidance</h3>
                    <p className="text-sm text-muted-foreground">Connect with our counselors for personalized advice</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            {showResults ? (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">Predicted Colleges</h2>
                    <p className="text-sm text-muted-foreground">
                      Based on JEE Main Rank: {rank}, Category: {category.toUpperCase()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Colleges</SelectItem>
                        <SelectItem value="high">High Chances (80%+)</SelectItem>
                        <SelectItem value="medium">Medium Chances (50-80%)</SelectItem>
                        <SelectItem value="low">Low Chances (Below 50%)</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                      <span className="sr-only">Filter</span>
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      name: "Indian Institute of Technology Delhi",
                      location: "New Delhi",
                      courses: ["Computer Science", "Electrical Engineering"],
                      chance: 85,
                      cutoff: "2,500 - 5,000",
                      image: "/placeholder.svg?height=100&width=100&text=IIT Delhi",
                    },
                    {
                      name: "National Institute of Technology Trichy",
                      location: "Tiruchirappalli",
                      courses: ["Computer Science", "Mechanical Engineering"],
                      chance: 92,
                      cutoff: "8,000 - 15,000",
                      image: "/placeholder.svg?height=100&width=100&text=NIT Trichy",
                    },
                    {
                      name: "Delhi Technological University",
                      location: "New Delhi",
                      courses: ["Computer Science", "Electronics & Communication"],
                      chance: 78,
                      cutoff: "15,000 - 25,000",
                      image: "/placeholder.svg?height=100&width=100&text=DTU",
                    },
                    {
                      name: "Birla Institute of Technology and Science",
                      location: "Pilani",
                      courses: ["Computer Science", "Electrical & Electronics"],
                      chance: 65,
                      cutoff: "10,000 - 20,000",
                      image: "/placeholder.svg?height=100&width=100&text=BITS Pilani",
                    },
                    {
                      name: "Vellore Institute of Technology",
                      location: "Vellore",
                      courses: ["Computer Science", "Electronics & Communication"],
                      chance: 95,
                      cutoff: "25,000 - 40,000",
                      image: "/placeholder.svg?height=100&width=100&text=VIT",
                    },
                    {
                      name: "SRM Institute of Science and Technology",
                      location: "Chennai",
                      courses: ["Computer Science", "Mechanical Engineering"],
                      chance: 98,
                      cutoff: "30,000 - 50,000",
                      image: "/placeholder.svg?height=100&width=100&text=SRM",
                    },
                  ].map((college, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-md transition-all duration-300">
                      <CardContent className="p-0">
                        <div className="flex flex-row gap-4 p-4">
                          <div className="h-16 w-16 relative rounded-md overflow-hidden shrink-0">
                            <Image
                              src={college.image || "/placeholder.svg"}
                              alt={college.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-base truncate">{college.name}</h3>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <MapPin className="h-3 w-3 mr-1 shrink-0" />
                              <span>{college.location}</span>
                            </div>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {college.courses.map((course, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {course}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="px-4 pb-4 pt-0">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">Admission Chance</span>
                              <Badge
                                className={
                                  college.chance >= 80
                                    ? "bg-green-500/20 text-green-700"
                                    : college.chance >= 50
                                      ? "bg-yellow-500/20 text-yellow-700"
                                      : "bg-red-500/20 text-red-700"
                                }
                              >
                                {college.chance}%
                              </Badge>
                            </div>
                            <Progress
                              value={college.chance}
                              className={
                                college.chance >= 80
                                  ? "bg-green-100"
                                  : college.chance >= 50
                                    ? "bg-yellow-100"
                                    : "bg-red-100"
                              }
                              indicatorClassName={
                                college.chance >= 80
                                  ? "bg-green-500"
                                  : college.chance >= 50
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }
                            />
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Expected Cutoff Range:</span>
                              <span className="font-medium">{college.cutoff}</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/colleges/${college.name.toLowerCase().replace(/\s+/g, "-")}`}>
                                View College
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm" className="group">
                              Compare
                              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-center mt-4">
                  <Button className="group">
                    View More Colleges
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>

                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Info className="h-5 w-5 mr-2" />
                      Need Personalized Guidance?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Our expert counselors can help you understand your options better and guide you through the
                      admission process.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 mt-4">
                      <Button className="sm:flex-1">Schedule a Counseling Session</Button>
                      <Button variant="outline" className="sm:flex-1">
                        Download Detailed Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="h-full flex flex-col justify-center items-center p-8 text-center">
                <div className="mb-4">
                  <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <GraduationCap className="h-10 w-10 text-primary" />
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-2">Enter Your Details to Get Started</h2>
                <p className="text-muted-foreground max-w-md mb-6">
                  Fill in your exam details and preferences in the form to see which colleges you have a good chance of
                  getting into.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg">
                  <Card className="bg-muted/50">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                        <Building className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-sm font-medium">500+ Colleges</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/50">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                        <GraduationCap className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-sm font-medium">50+ Exams</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/50">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                        <Sliders className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-sm font-medium">95% Accuracy</p>
                    </CardContent>
                  </Card>
                </div>
              </Card>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How accurate is the college predictor?</AccordionTrigger>
              <AccordionContent>
                Our college predictor uses historical cutoff data and admission trends to provide predictions with
                approximately 95% accuracy. However, actual admissions depend on various factors including the number of
                applicants, reservation policies, and changes in cutoffs from year to year.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Which entrance exams are supported?</AccordionTrigger>
              <AccordionContent>
                Currently, we support predictions for JEE Main, NEET, GATE, CAT, CLAT, and several other major entrance
                exams. We're continuously adding support for more exams.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How is the admission chance percentage calculated?</AccordionTrigger>
              <AccordionContent>
                The admission chance percentage is calculated based on your rank, category, previous years' cutoff
                trends, seat availability, and your preferences. A higher percentage indicates a better chance of
                admission.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Can I get a personalized counseling session?</AccordionTrigger>
              <AccordionContent>
                Yes, we offer personalized counseling sessions with our expert advisors who can guide you through the
                college selection and admission process. You can schedule a session through our platform.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>How often is the cutoff data updated?</AccordionTrigger>
              <AccordionContent>
                We update our cutoff data annually after the completion of each admission cycle. This ensures that our
                predictions are based on the most recent trends and patterns.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

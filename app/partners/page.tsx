"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { Users, TrendingUp, CheckCircle, ArrowRight, BarChart3, Target } from "lucide-react"

export default function PartnersPage() {
  const [formData, setFormData] = useState({
    institutionName: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    type: "",
    location: "",
    studentsCount: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/partners/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Application Submitted!",
          description: "We'll review your application and get back to you within 48 hours.",
        })
        setFormData({
          institutionName: "",
          contactPerson: "",
          email: "",
          phone: "",
          website: "",
          type: "",
          location: "",
          studentsCount: "",
          message: "",
        })
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      })
    }
  }

  const benefits = [
    {
      icon: Users,
      title: "Increased Student Reach",
      description: "Access to our 100,000+ active student community",
      metric: "300% increase in applications",
    },
    {
      icon: TrendingUp,
      title: "Enhanced Visibility",
      description: "Featured placement in search results and recommendations",
      metric: "5x more profile views",
    },
    {
      icon: Target,
      title: "Quality Lead Generation",
      description: "Pre-qualified students matching your admission criteria",
      metric: "85% conversion rate",
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Detailed analytics on student engagement and applications",
      metric: "Real-time dashboard",
    },
  ]

  const partnerTypes = [
    {
      title: "Premium Partner",
      price: "₹50,000/year",
      features: [
        "Featured college listing",
        "Priority in search results",
        "Dedicated account manager",
        "Custom landing page",
        "Advanced analytics",
        "Direct student messaging",
        "Virtual tour integration",
        "Scholarship posting",
      ],
      popular: true,
    },
    {
      title: "Standard Partner",
      price: "₹25,000/year",
      features: [
        "Standard college listing",
        "Basic analytics",
        "Student inquiry management",
        "Event posting",
        "Basic support",
      ],
      popular: false,
    },
    {
      title: "Basic Partner",
      price: "₹10,000/year",
      features: ["Basic college profile", "Contact information display", "Course listing", "Email support"],
      popular: false,
    },
  ]

  const currentPartners = [
    { name: "IIT Delhi", logo: "/placeholder.svg?height=60&width=120&text=IIT+Delhi", tier: "Premium" },
    { name: "AIIMS Delhi", logo: "/placeholder.svg?height=60&width=120&text=AIIMS", tier: "Premium" },
    { name: "IIM Ahmedabad", logo: "/placeholder.svg?height=60&width=120&text=IIM", tier: "Premium" },
    { name: "NIT Trichy", logo: "/placeholder.svg?height=60&width=120&text=NIT", tier: "Standard" },
    { name: "BITS Pilani", logo: "/placeholder.svg?height=60&width=120&text=BITS", tier: "Premium" },
    { name: "VIT Vellore", logo: "/placeholder.svg?height=60&width=120&text=VIT", tier: "Standard" },
  ]

  return (
    <div className="container px-4 md:px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">University Partnership Program</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Join India's leading education platform and connect with thousands of qualified students actively seeking
          admission to top institutions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="group">
            Become a Partner
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" size="lg">
            View Partnership Benefits
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-sm text-muted-foreground">Partner Institutions</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">100K+</div>
            <div className="text-sm text-muted-foreground">Active Students</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">85%</div>
            <div className="text-sm text-muted-foreground">Conversion Rate</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Support Available</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="benefits" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="partners">Our Partners</TabsTrigger>
          <TabsTrigger value="apply">Apply Now</TabsTrigger>
        </TabsList>

        <TabsContent value="benefits" className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Why Partner with CollegeVaani?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our partnership program is designed to help educational institutions reach qualified students and grow
              their enrollment effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground mb-3">{benefit.description}</p>
                      <Badge variant="secondary">{benefit.metric}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Partnership Plans</h2>
            <p className="text-muted-foreground">Choose the plan that best fits your institution's needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partnerTypes.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">Most Popular</Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.title}</CardTitle>
                  <div className="text-3xl font-bold text-primary">{plan.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    Choose Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="partners" className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Our Trusted Partners</h2>
            <p className="text-muted-foreground">Join these prestigious institutions in our partner network</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {currentPartners.map((partner, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="h-16 flex items-center justify-center mb-2">
                    <img
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <h3 className="font-medium text-sm">{partner.name}</h3>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {partner.tier}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-4">And 500+ more institutions across India</p>
            <Button variant="outline">View All Partners</Button>
          </div>
        </TabsContent>

        <TabsContent value="apply" className="space-y-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Apply for Partnership</h2>
              <p className="text-muted-foreground">
                Fill out the form below and our team will review your application within 48 hours
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Partnership Application</CardTitle>
                <CardDescription>Please provide accurate information about your institution</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="institutionName">Institution Name</Label>
                      <Input
                        id="institutionName"
                        name="institutionName"
                        value={formData.institutionName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactPerson">Contact Person</Label>
                      <Input
                        id="contactPerson"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="website">Institution Website</Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="type">Institution Type</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="university">University</SelectItem>
                          <SelectItem value="college">College</SelectItem>
                          <SelectItem value="institute">Institute</SelectItem>
                          <SelectItem value="school">School</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="studentsCount">Number of Students</Label>
                    <Select
                      value={formData.studentsCount}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, studentsCount: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under500">Under 500</SelectItem>
                        <SelectItem value="500-1000">500 - 1,000</SelectItem>
                        <SelectItem value="1000-5000">1,000 - 5,000</SelectItem>
                        <SelectItem value="5000-10000">5,000 - 10,000</SelectItem>
                        <SelectItem value="above10000">Above 10,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Additional Information</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your institution and why you'd like to partner with us..."
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

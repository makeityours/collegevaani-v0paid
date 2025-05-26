"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { Users, Target, TrendingUp, Phone, Gift } from "lucide-react"

interface LeadData {
  id: string
  name: string
  email: string
  phone: string
  course: string
  source: string
  score: number
  status: "new" | "contacted" | "qualified" | "converted"
  createdAt: Date
}

interface FormData {
  name: string
  email: string
  phone: string
  course: string
  location: string
  budget: string
  timeline: string
  source: string
}

export default function ComprehensiveLeadSystem() {
  const [leads, setLeads] = useState<LeadData[]>([])
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    course: "",
    location: "",
    budget: "",
    timeline: "",
    source: "website",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [analytics, setAnalytics] = useState({
    totalLeads: 0,
    conversionRate: 0,
    avgScore: 0,
    topSources: [],
  })

  // Exit intent popup
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShowPopup(true)
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    return () => document.removeEventListener("mouseleave", handleMouseLeave)
  }, [])

  const handleSubmit = async (e: React.FormEvent, formType = "main") => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Submit to HubSpot
      const hubspotResponse = await fetch("/api/leads/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          formType,
          timestamp: new Date().toISOString(),
        }),
      })

      // Submit to Google Analytics
      await fetch("/api/analytics/form-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "form_submit",
          form_type: formType,
          course: formData.course,
          source: formData.source,
        }),
      })

      if (hubspotResponse.ok) {
        toast({
          title: "Success!",
          description: "Your information has been submitted. We'll contact you soon!",
        })

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          course: "",
          location: "",
          budget: "",
          timeline: "",
          source: "website",
        })

        setShowPopup(false)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const calculateLeadScore = (lead: Partial<FormData>) => {
    let score = 0
    if (lead.email?.includes(".edu")) score += 20
    if (lead.phone) score += 15
    if (lead.budget === "above-10lakh") score += 25
    if (lead.timeline === "immediate") score += 30
    if (lead.course) score += 10
    return Math.min(score, 100)
  }

  return (
    <div className="space-y-8">
      {/* Main Lead Capture Form */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Get Personalized College Recommendations
          </CardTitle>
          <CardDescription>
            Fill out this form to receive tailored college suggestions based on your preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => handleSubmit(e, "main")} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="course">Interested Course</Label>
                <Select value={formData.course} onValueChange={(value) => setFormData({ ...formData, course: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="medical">Medical</SelectItem>
                    <SelectItem value="management">Management</SelectItem>
                    <SelectItem value="law">Law</SelectItem>
                    <SelectItem value="arts">Arts & Humanities</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Preferred Location</Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) => setFormData({ ...formData, location: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="delhi">Delhi NCR</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="chennai">Chennai</SelectItem>
                    <SelectItem value="pune">Pune</SelectItem>
                    <SelectItem value="hyderabad">Hyderabad</SelectItem>
                    <SelectItem value="anywhere">Anywhere in India</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="budget">Budget Range</Label>
                <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="below-2lakh">Below ₹2 Lakh</SelectItem>
                    <SelectItem value="2-5lakh">₹2-5 Lakh</SelectItem>
                    <SelectItem value="5-10lakh">₹5-10 Lakh</SelectItem>
                    <SelectItem value="above-10lakh">Above ₹10 Lakh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="timeline">When do you plan to start?</Label>
              <Select
                value={formData.timeline}
                onValueChange={(value) => setFormData({ ...formData, timeline: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate (This year)</SelectItem>
                  <SelectItem value="next-year">Next year</SelectItem>
                  <SelectItem value="2-years">In 2 years</SelectItem>
                  <SelectItem value="exploring">Just exploring</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Get My Recommendations"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Exit Intent Popup */}
      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-orange-500" />
              Wait! Don't Miss Out
            </DialogTitle>
            <DialogDescription>Get a FREE college consultation worth ₹2,000 before you leave!</DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => handleSubmit(e, "exit-intent")} className="space-y-4">
            <Input
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              placeholder="Your Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <Input
              placeholder="Your Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Claiming..." : "Claim My FREE Consultation"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Lead Analytics Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Lead Generation Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{analytics.totalLeads}</div>
              <div className="text-sm text-gray-600">Total Leads</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{analytics.conversionRate}%</div>
              <div className="text-sm text-gray-600">Conversion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{analytics.avgScore}</div>
              <div className="text-sm text-gray-600">Avg Lead Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">₹2.5L</div>
              <div className="text-sm text-gray-600">Revenue Generated</div>
            </div>
          </div>

          <Tabs defaultValue="recent" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="recent">Recent Leads</TabsTrigger>
              <TabsTrigger value="sources">Lead Sources</TabsTrigger>
              <TabsTrigger value="scoring">Lead Scoring</TabsTrigger>
            </TabsList>

            <TabsContent value="recent" className="space-y-4">
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Student {i}</div>
                      <div className="text-sm text-gray-600">Engineering • Delhi • ₹5-10L budget</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={i <= 2 ? "default" : "secondary"}>Score: {90 - i * 10}</Badge>
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sources" className="space-y-4">
              <div className="space-y-3">
                {[
                  { source: "Website Forms", leads: 45, percentage: 60 },
                  { source: "Social Media", leads: 20, percentage: 27 },
                  { source: "Referrals", leads: 10, percentage: 13 },
                ].map((item) => (
                  <div key={item.source} className="space-y-2">
                    <div className="flex justify-between">
                      <span>{item.source}</span>
                      <span>{item.leads} leads</span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="scoring" className="space-y-4">
              <div className="space-y-4">
                <div className="text-sm text-gray-600">Lead scoring criteria and weights:</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Educational email (.edu)</span>
                    <Badge>+20 points</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Phone number provided</span>
                    <Badge>+15 points</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>High budget (₹10L+)</span>
                    <Badge>+25 points</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Immediate timeline</span>
                    <Badge>+30 points</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Course specified</span>
                    <Badge>+10 points</Badge>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Referral System */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Referral Program
          </CardTitle>
          <CardDescription>Earn ₹500 for every successful referral</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium">Your Referral Code</div>
              <div className="text-lg font-mono">COLLEGE2024</div>
              <Button size="sm" className="mt-2">
                Share Code
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-gray-600">Referrals Sent</div>
              </div>
              <div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-gray-600">Successful</div>
              </div>
              <div>
                <div className="text-2xl font-bold">₹4,000</div>
                <div className="text-sm text-gray-600">Earned</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

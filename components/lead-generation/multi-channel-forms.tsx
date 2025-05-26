"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Gift, Star, Clock, Users, TrendingUp } from "lucide-react"

interface FormVariant {
  id: string
  name: string
  headline: string
  description: string
  ctaText: string
  fields: string[]
  incentive?: string
  urgency?: string
}

interface LeadFormProps {
  variant?: string
  position?: "popup" | "embedded" | "sidebar" | "exit-intent"
  trigger?: "time" | "scroll" | "exit" | "click"
  delay?: number
  onSubmit?: (data: any) => void
  onClose?: () => void
}

const formVariants: FormVariant[] = [
  {
    id: "variant-a",
    name: "Standard Form",
    headline: "Get Expert College Guidance",
    description: "Connect with our education counselors for personalized advice",
    ctaText: "Get Free Counseling",
    fields: ["name", "email", "phone", "course"],
  },
  {
    id: "variant-b",
    name: "Incentive Form",
    headline: "Download Free College Guide",
    description: "Get our comprehensive guide to top colleges in India",
    ctaText: "Download Free Guide",
    fields: ["name", "email", "course"],
    incentive: "Free College Selection Guide (PDF)",
  },
  {
    id: "variant-c",
    name: "Urgency Form",
    headline: "Limited Time: Free Admission Consultation",
    description: "Book your slot before admissions close",
    ctaText: "Book Free Consultation",
    fields: ["name", "email", "phone", "course", "city"],
    urgency: "Only 5 slots left today!",
  },
  {
    id: "variant-d",
    name: "Social Proof Form",
    headline: "Join 10,000+ Students Who Found Their Dream College",
    description: "Get personalized college recommendations from our experts",
    ctaText: "Join Now - It's Free",
    fields: ["name", "email", "course"],
  },
]

export function MultiChannelLeadForm({
  variant = "variant-a",
  position = "embedded",
  trigger = "click",
  delay = 3000,
  onSubmit,
  onClose,
}: LeadFormProps) {
  const [isVisible, setIsVisible] = useState(position === "embedded")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    city: "",
    agreeToTerms: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentVariant, setCurrentVariant] = useState(formVariants.find((v) => v.id === variant) || formVariants[0])

  useEffect(() => {
    if (position === "popup" && trigger === "time") {
      const timer = setTimeout(() => setIsVisible(true), delay)
      return () => clearTimeout(timer)
    }

    if (position === "popup" && trigger === "scroll") {
      const handleScroll = () => {
        if (window.scrollY > window.innerHeight * 0.5) {
          setIsVisible(true)
          window.removeEventListener("scroll", handleScroll)
        }
      }
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }

    if (position === "popup" && trigger === "exit") {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) {
          setIsVisible(true)
          document.removeEventListener("mouseleave", handleMouseLeave)
        }
      }
      document.addEventListener("mouseleave", handleMouseLeave)
      return () => document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [position, trigger, delay])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Track form submission for A/B testing
      await fetch("/api/analytics/form-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          variant: currentVariant.id,
          position,
          trigger,
          formData,
          timestamp: new Date().toISOString(),
        }),
      })

      // Submit lead data
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: `${position}-${currentVariant.id}`,
          leadScore: calculateLeadScore(formData),
        }),
      })

      if (response.ok) {
        onSubmit?.(formData)
        setIsVisible(false)
        // Show success message or redirect
      }
    } catch (error) {
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const calculateLeadScore = (data: any) => {
    let score = 50 // Base score
    if (data.phone) score += 20
    if (data.course) score += 15
    if (data.city) score += 10
    if (data.email.includes("gmail") || data.email.includes("yahoo")) score += 5
    return Math.min(score, 100)
  }

  if (!isVisible) return null

  const formContent = (
    <Card className={`w-full max-w-md ${position === "popup" ? "shadow-2xl" : ""}`}>
      <CardHeader className="pb-4">
        {position === "popup" && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-6 w-6"
            onClick={() => {
              setIsVisible(false)
              onClose?.()
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        )}

        <div className="space-y-2">
          <CardTitle className="text-lg">{currentVariant.headline}</CardTitle>
          <CardDescription>{currentVariant.description}</CardDescription>

          {currentVariant.incentive && (
            <div className="flex items-center gap-2 p-2 bg-green-50 rounded-md">
              <Gift className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-700">{currentVariant.incentive}</span>
            </div>
          )}

          {currentVariant.urgency && (
            <div className="flex items-center gap-2 p-2 bg-red-50 rounded-md">
              <Clock className="h-4 w-4 text-red-600" />
              <span className="text-sm text-red-700">{currentVariant.urgency}</span>
            </div>
          )}

          {currentVariant.id === "variant-d" && (
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>10,000+ Students</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>4.8/5 Rating</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                <span>95% Success Rate</span>
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {currentVariant.fields.includes("name") && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
                required
              />
            </div>
          )}

          {currentVariant.fields.includes("email") && (
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
                required
              />
            </div>
          )}

          {currentVariant.fields.includes("phone") && (
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="Enter your phone number"
                required
              />
            </div>
          )}

          {currentVariant.fields.includes("course") && (
            <div className="space-y-2">
              <Label htmlFor="course">Course of Interest</Label>
              <Select
                value={formData.course}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, course: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
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
            </div>
          )}

          {currentVariant.fields.includes("city") && (
            <div className="space-y-2">
              <Label htmlFor="city">Preferred City</Label>
              <Select
                value={formData.city}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, city: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                  <SelectItem value="chennai">Chennai</SelectItem>
                  <SelectItem value="hyderabad">Hyderabad</SelectItem>
                  <SelectItem value="pune">Pune</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))}
              required
            />
            <Label htmlFor="terms" className="text-xs text-muted-foreground">
              I agree to receive communications and accept the terms of service
            </Label>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting || !formData.agreeToTerms}>
            {isSubmitting ? "Submitting..." : currentVariant.ctaText}
          </Button>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">🔒 Your information is secure and will not be shared</p>
          </div>
        </form>
      </CardContent>
    </Card>
  )

  if (position === "popup") {
    return <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">{formContent}</div>
  }

  return formContent
}

// A/B Testing Manager Component
export function ABTestManager() {
  const [activeTests, setActiveTests] = useState([
    {
      id: "form-headline-test",
      name: "Form Headline Test",
      variants: ["variant-a", "variant-b"],
      traffic: 50,
      status: "running",
      conversions: { "variant-a": 12, "variant-b": 18 },
      impressions: { "variant-a": 150, "variant-b": 145 },
    },
    {
      id: "cta-button-test",
      name: "CTA Button Test",
      variants: ["variant-c", "variant-d"],
      traffic: 30,
      status: "running",
      conversions: { "variant-c": 8, "variant-d": 15 },
      impressions: { "variant-c": 95, "variant-d": 98 },
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">A/B Testing Dashboard</h2>
        <Button>Create New Test</Button>
      </div>

      <div className="grid gap-4">
        {activeTests.map((test) => (
          <Card key={test.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{test.name}</CardTitle>
                <Badge variant={test.status === "running" ? "default" : "secondary"}>{test.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {test.variants.map((variant) => {
                  const conversions = test.conversions[variant] || 0
                  const impressions = test.impressions[variant] || 0
                  const conversionRate = impressions > 0 ? ((conversions / impressions) * 100).toFixed(2) : "0.00"

                  return (
                    <div key={variant} className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">{variant}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Impressions:</span>
                          <span>{impressions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Conversions:</span>
                          <span>{conversions}</span>
                        </div>
                        <div className="flex justify-between font-medium">
                          <span>Conversion Rate:</span>
                          <span>{conversionRate}%</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

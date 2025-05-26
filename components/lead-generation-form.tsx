"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface LeadGenerationFormProps {
  title?: string
  description?: string
  className?: string
  onSuccess?: () => void
}

export default function LeadGenerationForm({
  title = "Get Expert Counseling",
  description = "Fill the form below and our education counselor will contact you shortly",
  className,
  onSuccess,
}: LeadGenerationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    city: "",
    agreeToTerms: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeToTerms: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Submit to lead capture API
      const response = await fetch("/api/leads/capture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Form submitted successfully!",
          description: "Our counselor will contact you shortly.",
        })

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          program: "",
          city: "",
          agreeToTerms: false,
        })

        if (onSuccess) {
          onSuccess()
        }
      } else {
        throw new Error("Submission failed")
      }
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="program">Program of Interest</Label>
              <Select onValueChange={(value) => handleSelectChange("program", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="management">Management</SelectItem>
                  <SelectItem value="law">Law</SelectItem>
                  <SelectItem value="arts">Arts & Humanities</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="commerce">Commerce</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" checked={formData.agreeToTerms} onCheckedChange={handleCheckboxChange} required />
            <Label htmlFor="terms" className="text-sm">
              I agree to the{" "}
              <a href="/terms" className="text-blue-600 hover:underline">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </Label>
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting || !formData.agreeToTerms}>
            {isSubmitting ? "Submitting..." : "Get Free Counseling"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from 'lucide-react'

export function LeadGenerationForm() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    specialization: "",
    education: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, you would send this data to your backend
    console.log("Form submitted:", formData)
    setFormSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (formSubmitted) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-green-100">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <CardTitle className="text-center">Thank You!</CardTitle>
          <CardDescription className="text-center">
            Your information has been submitted successfully. Our counselor will contact you shortly.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className="w-full" onClick={() => setFormSubmitted(false)}>
            Submit Another Query
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Get Expert Guidance</CardTitle>
        <CardDescription>Fill the form below to connect with our admission counselors</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your full name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="program">Interested Program</Label>
            <Select onValueChange={(value) => handleSelectChange("program", value)}>
              <SelectTrigger id="program">
                <SelectValue placeholder="Select program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bca">Bachelor of Computer Applications (BCA)</SelectItem>
                <SelectItem value="bba">Bachelor of Business Administration (BBA)</SelectItem>
                <SelectItem value="mba">Master of Business Administration (MBA)</SelectItem>
                <SelectItem value="mca">Master of Computer Applications (MCA)</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="education">Highest Education</Label>
            <Select onValueChange={(value) => handleSelectChange("education", value)}>
              <SelectTrigger id="education">
                <SelectValue placeholder="Select education" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10th">10th</SelectItem>
                <SelectItem value="12th">12th</SelectItem>
                <SelectItem value="diploma">Diploma</SelectItem>
                <SelectItem value="graduate">Graduate</SelectItem>
                <SelectItem value="postgraduate">Post Graduate</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">
            Request a Callback
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-xs text-center text-muted-foreground">
          By submitting this form, you agree to our privacy policy and terms of service.
        </p>
      </CardFooter>
    </Card>
  )
}

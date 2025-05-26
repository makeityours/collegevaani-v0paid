"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save, Trash } from "lucide-react"
import { Separator } from "@/components/ui/separator"

// Mock data for a college
const collegeData = {
  id: "1",
  name: "Indian Institute of Technology Delhi",
  description:
    "The Indian Institute of Technology Delhi (IIT Delhi) is one of the 23 IITs created to be Centres of Excellence for training, research and development in science, engineering and technology in India.",
  location: "Hauz Khas, New Delhi, Delhi 110016",
  type: "public",
  established: "1961",
  approved: "AICTE, UGC",
  campus: "320 acres",
  website: "https://home.iitd.ac.in/",
  email: "info@iitd.ac.in",
  phone: "+91-11-2659-7135",
  featured: true,
  status: "active",
  ranking: {
    nirf: 2,
    outlook: 1,
    theWeek: 2,
    indiaToday: 1,
  },
  facilities: ["Hostel", "Sports Complex", "Library", "Labs", "Cafeteria", "Gym", "Wi-Fi Campus"],
  courses: ["Engineering", "Science", "Technology", "Management"],
}

export default function EditCollegePage() {
  const params = useParams()
  const router = useRouter()
  const isNew = params.id === "new"
  const [college, setCollege] = useState(isNew ? {} : collegeData)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would be an API call to save the college
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/admin/colleges")
    } catch (error) {
      console.error("Error saving college:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/colleges">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {isNew ? "Add New College" : `Edit College: ${college.name}`}
            </h1>
            <p className="text-muted-foreground">
              {isNew ? "Create a new college entry" : "Update college information"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/colleges">Cancel</Link>
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "Saving..." : "Save College"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="w-full justify-start overflow-auto">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the basic details about the college</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">College Name</Label>
                  <Input id="name" placeholder="Enter college name" defaultValue={college.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">College Type</Label>
                  <Select defaultValue={college.type}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select college type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public/Government</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="deemed">Deemed University</SelectItem>
                      <SelectItem value="autonomous">Autonomous</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter college description"
                  rows={5}
                  defaultValue={college.description}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Enter college location" defaultValue={college.location} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="established">Established Year</Label>
                  <Input id="established" placeholder="Enter established year" defaultValue={college.established} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" placeholder="Enter college website" defaultValue={college.website} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter contact email" defaultValue={college.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="Enter contact phone" defaultValue={college.phone} />
                </div>
              </div>

              <Separator />

              <div className="flex flex-col gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="featured" defaultChecked={college.featured} />
                  <Label htmlFor="featured">Featured College</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue={college.status}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>College Details</CardTitle>
              <CardDescription>Enter additional details about the college</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="approved">Approved By</Label>
                  <Input id="approved" placeholder="E.g., AICTE, UGC" defaultValue={college.approved} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="campus">Campus Size</Label>
                  <Input id="campus" placeholder="E.g., 100 acres" defaultValue={college.campus} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Rankings</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nirf">NIRF Ranking</Label>
                    <Input id="nirf" placeholder="Enter NIRF rank" defaultValue={college.ranking?.nirf} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="outlook">Outlook Ranking</Label>
                    <Input id="outlook" placeholder="Enter Outlook rank" defaultValue={college.ranking?.outlook} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="theWeek">The Week Ranking</Label>
                    <Input id="theWeek" placeholder="Enter The Week rank" defaultValue={college.ranking?.theWeek} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="indiaToday">India Today Ranking</Label>
                    <Input
                      id="indiaToday"
                      placeholder="Enter India Today rank"
                      defaultValue={college.ranking?.indiaToday}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Courses Offered</CardTitle>
              <CardDescription>Manage courses offered by this college</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["Engineering", "Medical", "Science", "Arts", "Commerce", "Management", "Law", "Design"].map(
                    (course) => (
                      <div key={course} className="flex items-center space-x-2">
                        <Checkbox
                          id={`course-${course.toLowerCase()}`}
                          defaultChecked={college.courses?.includes(course)}
                        />
                        <Label htmlFor={`course-${course.toLowerCase()}`}>{course}</Label>
                      </div>
                    ),
                  )}
                </div>

                <Button variant="outline" className="mt-4">
                  Manage Detailed Course Information
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facilities" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Facilities</CardTitle>
              <CardDescription>Select facilities available at this college</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
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
                  "Swimming Pool",
                  "Transport",
                ].map((facility) => (
                  <div key={facility} className="flex items-center space-x-2">
                    <Checkbox
                      id={`facility-${facility.toLowerCase().replace(/\s+/g, "-")}`}
                      defaultChecked={college.facilities?.includes(facility)}
                    />
                    <Label htmlFor={`facility-${facility.toLowerCase().replace(/\s+/g, "-")}`}>{facility}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Media</CardTitle>
              <CardDescription>Upload images and media files for this college</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>College Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-24 w-24 rounded-md border flex items-center justify-center bg-muted">
                      <span className="text-muted-foreground text-sm">Logo</span>
                    </div>
                    <Button variant="outline">Upload Logo</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Cover Image</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-24 w-48 rounded-md border flex items-center justify-center bg-muted">
                      <span className="text-muted-foreground text-sm">Cover Image</span>
                    </div>
                    <Button variant="outline">Upload Cover</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Gallery Images</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="relative h-24 rounded-md border flex items-center justify-center bg-muted group"
                      >
                        <span className="text-muted-foreground text-sm">Image {i}</span>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    <div className="h-24 rounded-md border border-dashed flex items-center justify-center bg-muted/50 cursor-pointer hover:bg-muted/80 transition-colors">
                      <span className="text-muted-foreground text-sm">Add Image</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

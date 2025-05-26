"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Building, Check, Download, Info, MapPin, Plus, Share2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Sample college data
const collegeData = [
  {
    id: 1,
    name: "Indian Institute of Technology Delhi",
    location: "New Delhi",
    image: "/placeholder.svg?height=100&width=100&text=IIT Delhi",
    established: 1961,
    type: "Public/Government",
    ranking: {
      nirf: 2,
      outlook: 1,
      theWeek: 2,
      indiaToday: 1,
    },
    fees: {
      btech: "₹2.2L per year",
      mtech: "₹2.0L per year",
      phd: "₹1.5L per year",
    },
    placements: {
      averagePackage: "₹16 LPA",
      highestPackage: "₹1.8 CPA",
      placementRate: "95%",
    },
    facilities: ["Hostel", "Sports Complex", "Library", "Labs", "Cafeteria", "Gym", "Wi-Fi Campus", "Auditorium"],
    courses: [
      "B.Tech in Computer Science",
      "B.Tech in Electrical Engineering",
      "B.Tech in Mechanical Engineering",
      "M.Tech in Computer Science",
      "MBA",
    ],
  },
  {
    id: 2,
    name: "National Institute of Technology Trichy",
    location: "Tiruchirappalli",
    image: "/placeholder.svg?height=100&width=100&text=NIT Trichy",
    established: 1964,
    type: "Public/Government",
    ranking: {
      nirf: 7,
      outlook: 6,
      theWeek: 8,
      indiaToday: 7,
    },
    fees: {
      btech: "₹1.4L per year",
      mtech: "₹1.2L per year",
      phd: "₹0.8L per year",
    },
    placements: {
      averagePackage: "₹12 LPA",
      highestPackage: "₹1.2 CPA",
      placementRate: "92%",
    },
    facilities: ["Hostel", "Sports Complex", "Library", "Labs", "Cafeteria", "Gym", "Wi-Fi Campus", "Auditorium"],
    courses: [
      "B.Tech in Computer Science",
      "B.Tech in Electrical Engineering",
      "B.Tech in Mechanical Engineering",
      "M.Tech in Computer Science",
      "MBA",
    ],
  },
  {
    id: 3,
    name: "Delhi Technological University",
    location: "New Delhi",
    image: "/placeholder.svg?height=100&width=100&text=DTU",
    established: 1941,
    type: "State University",
    ranking: {
      nirf: 15,
      outlook: 12,
      theWeek: 14,
      indiaToday: 13,
    },
    fees: {
      btech: "₹1.8L per year",
      mtech: "₹1.5L per year",
      phd: "₹1.0L per year",
    },
    placements: {
      averagePackage: "₹10 LPA",
      highestPackage: "₹80 LPA",
      placementRate: "90%",
    },
    facilities: ["Hostel", "Sports Complex", "Library", "Labs", "Cafeteria", "Gym", "Wi-Fi Campus"],
    courses: [
      "B.Tech in Computer Science",
      "B.Tech in Electrical Engineering",
      "B.Tech in Civil Engineering",
      "M.Tech in Electronics",
      "MBA",
    ],
  },
]

export default function CollegeComparePage() {
  const [selectedColleges, setSelectedColleges] = useState<typeof collegeData>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("overview")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Get colleges from URL params or localStorage on initial load
  useEffect(() => {
    // In a real app, this would parse URL params and fetch college data
    // For demo, we'll just set some default colleges
    if (selectedColleges.length === 0) {
      setSelectedColleges([collegeData[0], collegeData[1]])
    }
  }, [selectedColleges.length])

  const filteredColleges = collegeData.filter(
    (college) => !selectedColleges.some((selected) => selected.id === college.id),
  )

  const searchResults = filteredColleges.filter((college) =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const addCollege = (college: (typeof collegeData)[0]) => {
    if (selectedColleges.length < 3) {
      setSelectedColleges([...selectedColleges, college])
    }
    setIsDialogOpen(false)
  }

  const removeCollege = (collegeId: number) => {
    setSelectedColleges(selectedColleges.filter((college) => college.id !== collegeId))
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
            <BreadcrumbLink href="/colleges">Colleges</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Compare</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Compare Colleges</h1>
            <p className="text-muted-foreground">Compare colleges side by side to make an informed decision</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/colleges">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Colleges
              </Link>
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share Comparison
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>

        {selectedColleges.length === 0 ? (
          <Card className="p-8 text-center">
            <CardContent className="pt-6">
              <div className="mb-4">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Building className="h-10 w-10 text-primary" />
                </div>
              </div>
              <h2 className="text-xl font-semibold mb-2">No Colleges Selected</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Add colleges to compare their features, fees, placements, and more side by side.
              </p>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Add Colleges to Compare</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add College</DialogTitle>
                    <DialogDescription>Search and select colleges to add to your comparison.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <Input
                      placeholder="Search colleges..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="mb-4"
                    />
                    <ScrollArea className="h-[300px]">
                      <div className="space-y-2">
                        {searchResults.length > 0 ? (
                          searchResults.map((college) => (
                            <div
                              key={college.id}
                              className="flex items-center gap-3 p-2 rounded-md hover:bg-muted cursor-pointer"
                              onClick={() => addCollege(college)}
                            >
                              <div className="h-10 w-10 relative rounded-md overflow-hidden">
                                <Image
                                  src={college.image || "/placeholder.svg"}
                                  alt={college.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-medium text-sm">{college.name}</h3>
                                <p className="text-xs text-muted-foreground">{college.location}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-center text-muted-foreground py-4">No colleges found</p>
                        )}
                      </div>
                    </ScrollArea>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedColleges.map((college) => (
                <Card key={college.id} className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-7 w-7"
                    onClick={() => removeCollege(college.id)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="h-16 w-16 relative rounded-md overflow-hidden mb-3">
                      <Image
                        src={college.image || "/placeholder.svg"}
                        alt={college.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h2 className="font-semibold text-lg line-clamp-2 h-12">{college.name}</h2>
                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {college.location}
                    </p>
                    <Button variant="outline" size="sm" className="mt-3" asChild>
                      <Link href={`/colleges/${college.id}`}>View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
              {selectedColleges.length < 3 && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Card className="border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                      <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-3">
                          <Plus className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h2 className="font-medium">Add College</h2>
                        <p className="text-sm text-muted-foreground mt-1">Add another college to compare</p>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add College</DialogTitle>
                      <DialogDescription>Search and select colleges to add to your comparison.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <Input
                        placeholder="Search colleges..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mb-4"
                      />
                      <ScrollArea className="h-[300px]">
                        <div className="space-y-2">
                          {searchResults.length > 0 ? (
                            searchResults.map((college) => (
                              <div
                                key={college.id}
                                className="flex items-center gap-3 p-2 rounded-md hover:bg-muted cursor-pointer"
                                onClick={() => addCollege(college)}
                              >
                                <div className="h-10 w-10 relative rounded-md overflow-hidden">
                                  <Image
                                    src={college.image || "/placeholder.svg"}
                                    alt={college.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <h3 className="font-medium text-sm">{college.name}</h3>
                                  <p className="text-xs text-muted-foreground">{college.location}</p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-center text-muted-foreground py-4">No colleges found</p>
                          )}
                        </div>
                      </ScrollArea>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="overflow-x-auto pb-2">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="fees">Fees</TabsTrigger>
                  <TabsTrigger value="placements">Placements</TabsTrigger>
                  <TabsTrigger value="facilities">Facilities</TabsTrigger>
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="mt-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 border">Parameters</th>
                        {selectedColleges.map((college) => (
                          <th key={college.id} className="text-left p-3 border">
                            {college.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border font-medium">Established</td>
                        {selectedColleges.map((college) => (
                          <td key={college.id} className="p-3 border">
                            {college.established}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 border font-medium">Type</td>
                        {selectedColleges.map((college) => (
                          <td key={college.id} className="p-3 border">
                            {college.type}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 border font-medium">NIRF Ranking</td>
                        {selectedColleges.map((college) => (
                          <td key={college.id} className="p-3 border">
                            <Badge variant="outline">{college.ranking.nirf}</Badge>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 border font-medium">The Week Ranking</td>
                        {selectedColleges.map((college) => (
                          <td key={college.id} className="p-3 border">
                            <Badge variant="outline">{college.ranking.theWeek}</Badge>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 border font-medium">India Today Ranking</td>
                        {selectedColleges.map((college) => (
                          <td key={college.id} className="p-3 border">
                            <Badge variant="outline">{college.ranking.indiaToday}</Badge>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 border font-medium">Average Placement Package</td>
                        {selectedColleges.map((college) => (
                          <td key={college.id} className="p-3 border">
                            {college.placements.averagePackage}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 border font-medium">Placement Rate</td>
                        {selectedColleges.map((college) => (
                          <td key={college.id} className="p-3 border">
                            {college.placements.placementRate}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="fees" className="mt-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 border">Course</th>
                        {selectedColleges.map((college) => (
                          <th key={college.id} className="text-left p-3 border">
                            {college.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border font-medium">B.Tech</td>
                        {selectedColleges.map((college) => (
                          <td key={college.id} className="p-3 border">
                            {college.fees.btech}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 border font-medium">M.Tech</td>
                        {selectedColleges.map((college) => (
                          <td key={college.id} className="p-3 border">
                            {college.fees.mtech}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 border font-medium">Ph.D</td>
                        {selectedColleges.map((college) => (
                          <td key={college.id} className="p-3 border">
                            {college.fees.phd}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="placements" className="mt-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 border">Parameter</th>
                        {selectedColleges.map((college) => (
                          <th key={college.id} className="text-left p-3 border">
                            {college.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border font-medium">Average Package</td>
                        {selectedColleges.map((college) => (
                          <td key={college.id} className="p-3 border">
                            <span className="font-semibold text-primary">{college.placements.averagePackage}</span>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 border font-medium">Highest Package</td>
                        {selectedColleges.map((college) => (
                          <td key={college.id} className="p-3 border">
                            {college.placements.highestPackage}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 border font-medium">Placement Rate</td>
                        {selectedColleges.map((college) => (
                          <td key={college.id} className="p-3 border">
                            <Badge
                              className={
                                Number.parseFloat(college.placements.placementRate) >= 95
                                  ? "bg-green-500/20 text-green-700"
                                  : Number.parseFloat(college.placements.placementRate) >= 90
                                    ? "bg-yellow-500/20 text-yellow-700"
                                    : "bg-orange-500/20 text-orange-700"
                              }
                            >
                              {college.placements.placementRate}
                            </Badge>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="facilities" className="mt-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 border">Facility</th>
                        {selectedColleges.map((college) => (
                          <th key={college.id} className="text-left p-3 border">
                            {college.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        "Hostel",
                        "Sports Complex",
                        "Library",
                        "Labs",
                        "Cafeteria",
                        "Gym",
                        "Wi-Fi Campus",
                        "Auditorium",
                      ].map((facility) => (
                        <tr key={facility}>
                          <td className="p-3 border font-medium">{facility}</td>
                          {selectedColleges.map((college) => (
                            <td key={college.id} className="p-3 border text-center">
                              {college.facilities.includes(facility) ? (
                                <Check className="h-5 w-5 text-green-600 mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-red-500 mx-auto" />
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="courses" className="mt-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 border">Course</th>
                        {selectedColleges.map((college) => (
                          <th key={college.id} className="text-left p-3 border">
                            {college.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        "B.Tech in Computer Science",
                        "B.Tech in Electrical Engineering",
                        "B.Tech in Mechanical Engineering",
                        "B.Tech in Civil Engineering",
                        "M.Tech in Computer Science",
                        "M.Tech in Electronics",
                        "MBA",
                      ].map((course) => (
                        <tr key={course}>
                          <td className="p-3 border font-medium">{course}</td>
                          {selectedColleges.map((college) => (
                            <td key={college.id} className="p-3 border text-center">
                              {college.courses.includes(course) ? (
                                <Check className="h-5 w-5 text-green-600 mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-red-500 mx-auto" />
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>

            <Alert className="bg-primary/5 border-primary/20 mt-6">
              <Info className="h-4 w-4" />
              <AlertTitle>Need help deciding?</AlertTitle>
              <AlertDescription>
                Our expert counselors can help you understand the differences between these colleges and guide you to
                make the right choice based on your preferences and career goals.
              </AlertDescription>
              <div className="flex flex-col sm:flex-row gap-2 mt-4">
                <Button size="sm" className="sm:flex-1">
                  Schedule a Counseling Session
                </Button>
                <Button variant="outline" size="sm" className="sm:flex-1">
                  Download Comparison Report
                </Button>
              </div>
            </Alert>
          </>
        )}
      </div>
    </div>
  )
}

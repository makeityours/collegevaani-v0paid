"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, X, Star, MapPin } from "lucide-react"

interface College {
  id: string
  name: string
  location: string
  rating: number
  fees: string
  courses: number
  students: number
  placement: string
  image: string
  highlights: string[]
  facilities: string[]
  rankings: {
    nirf: number
    qs: number
  }
}

const sampleColleges: College[] = [
  {
    id: "1",
    name: "Indian Institute of Technology Delhi",
    location: "New Delhi",
    rating: 4.8,
    fees: "₹2.5L - ₹8L",
    courses: 45,
    students: 8500,
    placement: "95%",
    image: "/placeholder.svg?height=200&width=300&text=IIT+Delhi",
    highlights: ["Top Engineering College", "Excellent Placement", "Research Excellence"],
    facilities: ["Library", "Labs", "Hostel", "Sports Complex", "WiFi"],
    rankings: { nirf: 2, qs: 185 },
  },
  {
    id: "2",
    name: "Indian Institute of Science",
    location: "Bangalore",
    rating: 4.9,
    fees: "₹1.5L - ₹6L",
    courses: 38,
    students: 3500,
    placement: "98%",
    image: "/placeholder.svg?height=200&width=300&text=IISc+Bangalore",
    highlights: ["Research Institute", "PhD Programs", "Innovation Hub"],
    facilities: ["Research Labs", "Library", "Hostel", "Cafeteria", "WiFi"],
    rankings: { nirf: 1, qs: 155 },
  },
  {
    id: "3",
    name: "Indian Institute of Technology Bombay",
    location: "Mumbai",
    rating: 4.7,
    fees: "₹2.8L - ₹9L",
    courses: 42,
    students: 9200,
    placement: "94%",
    image: "/placeholder.svg?height=200&width=300&text=IIT+Bombay",
    highlights: ["Premier Engineering", "Industry Connect", "Alumni Network"],
    facilities: ["Modern Labs", "Library", "Hostel", "Sports", "Medical Center"],
    rankings: { nirf: 3, qs: 172 },
  },
]

export default function ComparisonTool() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedColleges, setSelectedColleges] = useState<College[]>([])
  const [showSearch, setShowSearch] = useState(false)

  const filteredColleges = sampleColleges.filter(
    (college) =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedColleges.find((selected) => selected.id === college.id),
  )

  const addCollege = (college: College) => {
    if (selectedColleges.length < 3) {
      setSelectedColleges([...selectedColleges, college])
      setSearchTerm("")
      setShowSearch(false)
    }
  }

  const removeCollege = (collegeId: string) => {
    setSelectedColleges(selectedColleges.filter((college) => college.id !== collegeId))
  }

  const ComparisonCard = ({ college }: { college: College }) => (
    <Card className="h-full">
      <CardHeader className="relative">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-8 w-8 p-0"
          onClick={() => removeCollege(college.id)}
        >
          <X className="h-4 w-4" />
        </Button>
        <img
          src={college.image || "/placeholder.svg"}
          alt={college.name}
          className="w-full h-32 object-cover rounded-lg mb-4"
        />
        <CardTitle className="text-lg">{college.name}</CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {college.location}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{college.rating}</span>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Fees</span>
            <span className="font-medium">{college.fees}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Courses</span>
            <span className="font-medium">{college.courses}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Students</span>
            <span className="font-medium">{college.students.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Placement</span>
            <span className="font-medium text-green-600">{college.placement}</span>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Rankings</h4>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>NIRF Rank</span>
              <Badge variant="secondary">#{college.rankings.nirf}</Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span>QS Rank</span>
              <Badge variant="secondary">#{college.rankings.qs}</Badge>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Highlights</h4>
          <div className="flex flex-wrap gap-1">
            {college.highlights.map((highlight, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {highlight}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Facilities</h4>
          <div className="flex flex-wrap gap-1">
            {college.facilities.map((facility, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {facility}
              </Badge>
            ))}
          </div>
        </div>

        <Button className="w-full" variant="outline">
          View Details
        </Button>
      </CardContent>
    </Card>
  )

  const EmptySlot = () => (
    <Card className="h-full border-dashed border-2 border-muted-foreground/25">
      <CardContent className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
        <Plus className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <h3 className="font-medium text-muted-foreground mb-2">Add College</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Click the button below to search and add a college for comparison
        </p>
        <Button onClick={() => setShowSearch(true)} variant="outline">
          <Search className="h-4 w-4 mr-2" />
          Search Colleges
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Compare Colleges</h2>
        <p className="text-muted-foreground">Compare up to 3 colleges side by side to make an informed decision</p>
      </div>

      {showSearch && (
        <Card>
          <CardHeader>
            <CardTitle>Search Colleges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for colleges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredColleges.map((college) => (
                <div
                  key={college.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                  onClick={() => addCollege(college)}
                >
                  <div>
                    <h4 className="font-medium">{college.name}</h4>
                    <p className="text-sm text-muted-foreground">{college.location}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Add
                  </Button>
                </div>
              ))}
              {filteredColleges.length === 0 && searchTerm && (
                <p className="text-center text-muted-foreground py-4">No colleges found matching your search</p>
              )}
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="ghost" onClick={() => setShowSearch(false)}>
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedColleges.map((college) => (
          <ComparisonCard key={college.id} college={college} />
        ))}
        {Array.from({ length: 3 - selectedColleges.length }).map((_, index) => (
          <EmptySlot key={`empty-${index}`} />
        ))}
      </div>

      {selectedColleges.length > 0 && (
        <div className="text-center">
          <Button onClick={() => setSelectedColleges([])} variant="outline" className="mr-4">
            Clear All
          </Button>
          <Button>Get Detailed Comparison Report</Button>
        </div>
      )}
    </div>
  )
}

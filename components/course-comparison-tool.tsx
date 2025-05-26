"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X, Star, Plus } from "lucide-react"

interface Course {
  id: string
  title: string
  level: string
  duration: string
  avgFees: string
  avgSalary: string
  eligibility: string
  topColleges: number
  rating: number
  employability: string
  popularity: string
  skills: string[]
}

const sampleCourses: Course[] = [
  {
    id: "btech",
    title: "Bachelor of Technology (B.Tech)",
    level: "Undergraduate",
    duration: "4 Years",
    avgFees: "₹2-8 Lakh/year",
    avgSalary: "₹6-12 LPA",
    eligibility: "10+2 with PCM",
    topColleges: 500,
    rating: 4.2,
    employability: "95%",
    popularity: "Very High",
    skills: ["Programming", "Problem Solving", "Technical Analysis", "Project Management"],
  },
  {
    id: "bca",
    title: "Bachelor of Computer Applications (BCA)",
    level: "Undergraduate",
    duration: "3 Years",
    avgFees: "₹1-3 Lakh/year",
    avgSalary: "₹4-8 LPA",
    eligibility: "10+2 in any stream",
    topColleges: 450,
    rating: 4.0,
    employability: "88%",
    popularity: "High",
    skills: ["Software Development", "Database Management", "Web Technologies", "System Analysis"],
  },
  {
    id: "mba",
    title: "Master of Business Administration (MBA)",
    level: "Postgraduate",
    duration: "2 Years",
    avgFees: "₹5-20 Lakh total",
    avgSalary: "₹10-20 LPA",
    eligibility: "Bachelor's Degree + Entrance Exam",
    topColleges: 600,
    rating: 4.4,
    employability: "92%",
    popularity: "Very High",
    skills: ["Leadership", "Strategic Thinking", "Financial Analysis", "Team Management"],
  },
]

export default function CourseComparisonTool() {
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const addCourse = (course: Course) => {
    if (selectedCourses.length < 3 && !selectedCourses.find((c) => c.id === course.id)) {
      setSelectedCourses([...selectedCourses, course])
    }
  }

  const removeCourse = (courseId: string) => {
    setSelectedCourses(selectedCourses.filter((c) => c.id !== courseId))
  }

  const filteredCourses = sampleCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) && !selectedCourses.find((c) => c.id === course.id),
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Course Comparison Tool</CardTitle>
          <p className="text-muted-foreground">Compare up to 3 courses side by side</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Search for courses to compare..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {searchTerm && filteredCourses.length > 0 && (
              <div className="grid gap-2 max-h-40 overflow-y-auto">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between p-2 border rounded-lg hover:bg-muted/50 cursor-pointer"
                    onClick={() => addCourse(course)}
                  >
                    <div>
                      <p className="font-medium">{course.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {course.level} • {course.duration}
                      </p>
                    </div>
                    <Plus className="h-4 w-4 text-primary" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedCourses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Comparison Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Course</th>
                    {selectedCourses.map((course) => (
                      <th key={course.id} className="text-center p-4 min-w-[200px]">
                        <div className="space-y-2">
                          <h3 className="font-semibold">{course.title}</h3>
                          <div className="flex justify-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${star <= Math.floor(course.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                              />
                            ))}
                            <span className="ml-1 text-sm">({course.rating})</span>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => removeCourse(course.id)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Level", key: "level" },
                    { label: "Duration", key: "duration" },
                    { label: "Average Fees", key: "avgFees" },
                    { label: "Average Salary", key: "avgSalary" },
                    { label: "Eligibility", key: "eligibility" },
                    { label: "Top Colleges", key: "topColleges" },
                    { label: "Employability", key: "employability" },
                    { label: "Popularity", key: "popularity" },
                  ].map((row) => (
                    <tr key={row.key} className="border-b">
                      <td className="p-4 font-medium">{row.label}</td>
                      {selectedCourses.map((course) => (
                        <td key={course.id} className="p-4 text-center">
                          {row.key === "topColleges"
                            ? `${course[row.key as keyof Course]}+`
                            : course[row.key as keyof Course]}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="p-4 font-medium">Key Skills</td>
                    {selectedCourses.map((course) => (
                      <td key={course.id} className="p-4">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {course.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-center">
              <Button>Get Detailed Comparison Report</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

"use client"

import { BookOpen, Briefcase, Clock, GraduationCap, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const courses = [
  {
    id: 1,
    title: "Bachelor of Technology (B.Tech)",
    category: "Engineering",
    duration: "4 Years",
    eligibility: "10+2 with PCM",
    career: "Software Engineer, Data Scientist, Product Manager",
    avgSalary: "₹6-12 LPA",
    popularity: 98,
    trending: true,
  },
  {
    id: 2,
    title: "Bachelor of Medicine and Surgery (MBBS)",
    category: "Medical",
    duration: "5.5 Years",
    eligibility: "10+2 with PCB, NEET Qualification",
    career: "Doctor, Surgeon, Medical Researcher",
    avgSalary: "₹8-25 LPA",
    popularity: 95,
    trending: true,
  },
  {
    id: 3,
    title: "Master of Business Administration (MBA)",
    category: "Management",
    duration: "2 Years",
    eligibility: "Bachelor's Degree, CAT/MAT/XAT Score",
    career: "Business Analyst, Marketing Manager, Consultant",
    avgSalary: "₹10-20 LPA",
    popularity: 92,
    trending: true,
  },
  {
    id: 4,
    title: "Bachelor of Computer Applications (BCA)",
    category: "Computer Science",
    duration: "3 Years",
    eligibility: "10+2 in any stream",
    career: "Software Developer, Web Designer, System Analyst",
    avgSalary: "₹4-8 LPA",
    popularity: 88,
    trending: false,
  },
  {
    id: 5,
    title: "Bachelor of Science in Data Science",
    category: "Science",
    duration: "3 Years",
    eligibility: "10+2 with Mathematics",
    career: "Data Analyst, Machine Learning Engineer, Statistician",
    avgSalary: "₹5-15 LPA",
    popularity: 90,
    trending: true,
  },
  {
    id: 6,
    title: "Bachelor of Arts in Psychology",
    category: "Arts",
    duration: "3 Years",
    eligibility: "10+2 in any stream",
    career: "Counselor, HR Specialist, Researcher",
    avgSalary: "₹3-8 LPA",
    popularity: 82,
    trending: false,
  },
]

export default function PopularCourses() {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course, index) => (
        <Card
          key={course.id}
          className="overflow-hidden hover:shadow-md transition-all duration-300 animate-in fade-in-50 duration-1000"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg line-clamp-2 min-h-[3rem]">{course.title}</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <GraduationCap className="mr-1 h-3 w-3" /> {course.category}
                </CardDescription>
              </div>
              {course.trending && <Badge className="bg-primary text-primary-foreground">Trending</Badge>}
            </div>
          </CardHeader>
          <CardContent className="pb-2 space-y-3">
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{course.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Popularity: {course.popularity}%</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-start gap-1.5">
                <BookOpen className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Eligibility:</span> {course.eligibility}
                </span>
              </div>
              <div className="flex items-start gap-1.5">
                <Briefcase className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Career:</span> {course.career}
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-sm">Avg. Salary:</span>
                <span className="text-sm text-primary font-medium">{course.avgSalary}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Course Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

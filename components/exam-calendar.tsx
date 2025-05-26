"use client"

import { useState } from "react"
import { Calendar, Clock, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const exams = [
  {
    id: 1,
    name: "JEE Main 2024",
    date: "January 24 - February 1, 2024",
    registrationEnd: "November 30, 2023",
    eligibility: "10+2 with PCM",
    website: "jeemain.nta.nic.in",
    category: "engineering",
    status: "upcoming",
  },
  {
    id: 2,
    name: "NEET UG 2024",
    date: "May 5, 2024",
    registrationEnd: "December 15, 2023",
    eligibility: "10+2 with PCB",
    website: "neet.nta.nic.in",
    category: "medical",
    status: "upcoming",
  },
  {
    id: 3,
    name: "CAT 2023",
    date: "November 26, 2023",
    registrationEnd: "September 20, 2023",
    eligibility: "Bachelor's Degree with 50% marks",
    website: "iimcat.ac.in",
    category: "management",
    status: "ongoing",
  },
  {
    id: 4,
    name: "GATE 2024",
    date: "February 3-11, 2024",
    registrationEnd: "October 5, 2023",
    eligibility: "Bachelor's Degree in Engineering/Technology",
    website: "gate.iitk.ac.in",
    category: "engineering",
    status: "upcoming",
  },
]

export default function ExamCalendar() {
  const [filter, setFilter] = useState("all")

  const filteredExams = filter === "all" ? exams : exams.filter((exam) => exam.status === filter)

  return (
    <div className="space-y-4">
      <Tabs defaultValue="all" onValueChange={setFilter}>
        <TabsList className="grid w-full grid-cols-3 overflow-x-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {filteredExams.map((exam) => (
          <Card
            key={exam.id}
            className="overflow-hidden hover:shadow-md transition-all duration-300 animate-in fade-in-50 duration-1000"
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{exam.name}</CardTitle>
                <Badge
                  className={
                    exam.status === "upcoming" ? "bg-primary/20 text-primary" : "bg-green-500/20 text-green-600"
                  }
                >
                  {exam.status === "upcoming" ? "Upcoming" : "Ongoing"}
                </Badge>
              </div>
              <CardDescription className="flex items-center mt-1">
                <FileText className="mr-1 h-3 w-3" /> {exam.category.charAt(0).toUpperCase() + exam.category.slice(1)}{" "}
                Entrance
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="font-medium">Exam Date:</span>
                    <p className="text-muted-foreground">{exam.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="font-medium">Registration Ends:</span>
                    <p className="text-muted-foreground">{exam.registrationEnd}</p>
                  </div>
                </div>
              </div>
              <div className="mt-2 text-sm">
                <span className="font-medium">Eligibility:</span> {exam.eligibility}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="p-0 h-auto text-primary">
                Visit Official Website
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

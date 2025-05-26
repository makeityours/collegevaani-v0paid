import { cn } from "@/lib/utils"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DashboardCard } from "@/components/dashboard/dashboard-card"
import { StatsCard } from "@/components/dashboard/stats-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const navItems = [
  { name: "Dashboard", href: "/dashboard/counselor", iconName: "home" },
  { name: "Students", href: "/dashboard/counselor/students", iconName: "users" },
  { name: "Appointments", href: "/dashboard/counselor/appointments", iconName: "calendar" },
  { name: "Messages", href: "/dashboard/counselor/messages", iconName: "message-square" },
  { name: "Resources", href: "/dashboard/counselor/resources", iconName: "book-open" },
  { name: "Reports", href: "/dashboard/counselor/reports", iconName: "bar-chart" },
  { name: "Settings", href: "/dashboard/counselor/settings", iconName: "settings" },
]

export default function CounselorDashboard() {
  return (
    <DashboardLayout navItems={navItems} userType="Counselor" userName="Dr. Priya Mehta" userInitials="PM">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome, Dr. Mehta!</h1>
            <p className="text-muted-foreground">Here's an overview of your counseling activities.</p>
          </div>
          <Button asChild>
            <Link href="/dashboard/counselor/appointments/new">
              <span className="flex items-center">
                <span className="mr-2">📅</span>
                Schedule Appointment
              </span>
            </Link>
          </Button>
        </div>

        <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard title="Total Students" value="48" icon={<span>👥</span>} trend={{ value: 12, isPositive: true }} />
          <StatsCard
            title="Today's Appointments"
            value="5"
            icon={<span>📅</span>}
            description="Next: Rahul Sharma at 2:30 PM"
          />
          <StatsCard title="Pending Queries" value="12" icon={<span>💬</span>} description="4 high priority" />
          <StatsCard
            title="Success Rate"
            value="92%"
            icon={<span>📈</span>}
            description="Based on student admissions"
          />
        </div>

        <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-3">
          <DashboardCard title="Today's Schedule" className="md:col-span-2">
            <div className="space-y-4">
              {[
                {
                  time: "10:00 AM - 10:45 AM",
                  student: "Ananya Patel",
                  topic: "Career Guidance",
                  status: "completed",
                },
                {
                  time: "11:30 AM - 12:15 PM",
                  student: "Vikram Singh",
                  topic: "College Selection",
                  status: "completed",
                },
                {
                  time: "2:30 PM - 3:15 PM",
                  student: "Rahul Sharma",
                  topic: "Application Review",
                  status: "upcoming",
                },
                {
                  time: "4:00 PM - 4:45 PM",
                  student: "Priya Gupta",
                  topic: "Exam Preparation",
                  status: "upcoming",
                },
                {
                  time: "5:30 PM - 6:15 PM",
                  student: "Arjun Reddy",
                  topic: "Scholarship Guidance",
                  status: "upcoming",
                },
              ].map((appointment, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 border rounded-md"
                >
                  <div
                    className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center",
                      appointment.status === "completed" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600",
                    )}
                  >
                    {appointment.status === "completed" ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Clock className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <p className="font-medium">{appointment.time}</p>
                      <Badge
                        variant={appointment.status === "completed" ? "outline" : "default"}
                        className="self-start sm:self-auto"
                      >
                        {appointment.status === "completed" ? "Completed" : "Upcoming"}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-1 mt-1">
                      <p className="text-sm">{appointment.student}</p>
                      <span className="text-muted-foreground">•</span>
                      <p className="text-sm text-muted-foreground">{appointment.topic}</p>
                    </div>
                  </div>
                  {appointment.status !== "completed" && (
                    <Button size="sm" variant="outline" className="mt-2 sm:mt-0">
                      Join
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard title="Recent Messages">
            <div className="space-y-4">
              {[
                {
                  name: "Rahul Sharma",
                  message: "I have some questions about my JEE Advanced preparation strategy.",
                  time: "10 mins ago",
                  unread: true,
                  priority: "high",
                },
                {
                  name: "Ananya Patel",
                  message: "Thank you for the guidance session today. It was very helpful!",
                  time: "2 hours ago",
                  unread: false,
                  priority: "medium",
                },
                {
                  name: "Vikram Singh",
                  message: "Could you recommend some colleges for Computer Science with my rank?",
                  time: "Yesterday",
                  unread: true,
                  priority: "medium",
                },
              ].map((message, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-md">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {message.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{message.name}</p>
                      {message.unread && (
                        <Badge variant="outline" className="text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{message.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{message.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

        <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-3">
          <DashboardCard title="Student Performance" className="md:col-span-2">
            <Tabs defaultValue="exams">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="exams">Exam Results</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="admissions">Admissions</TabsTrigger>
              </TabsList>
              <div className="mt-4">
                <TabsContent value="exams" className="space-y-4">
                  {[
                    { name: "Rahul Sharma", exam: "JEE Main", score: "96.8 percentile", improvement: "+12.3%" },
                    { name: "Ananya Patel", exam: "NEET", score: "650/720", improvement: "+8.5%" },
                    { name: "Vikram Singh", exam: "BITSAT", score: "345/400", improvement: "+5.2%" },
                    { name: "Priya Gupta", exam: "JEE Advanced", score: "Rank 1205", improvement: "+15.7%" },
                  ].map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.exam}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">{student.score}</p>
                        <p className="text-xs text-green-500">{student.improvement}</p>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="applications" className="space-y-4">
                  {[
                    { name: "Rahul Sharma", college: "IIT Delhi", status: "Submitted", date: "Apr 15, 2023" },
                    { name: "Ananya Patel", college: "AIIMS Delhi", status: "In Progress", date: "Apr 12, 2023" },
                    { name: "Vikram Singh", college: "BITS Pilani", status: "Submitted", date: "Apr 10, 2023" },
                    { name: "Priya Gupta", college: "NIT Trichy", status: "Submitted", date: "Apr 8, 2023" },
                  ].map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.college}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={student.status === "Submitted" ? "default" : "outline"}>{student.status}</Badge>
                        <p className="text-xs text-muted-foreground mt-1">{student.date}</p>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="admissions" className="space-y-4">
                  {[
                    { name: "Rahul Sharma", college: "IIT Delhi", course: "B.Tech Computer Science", year: "2022" },
                    { name: "Ananya Patel", college: "AIIMS Delhi", course: "MBBS", year: "2022" },
                    { name: "Vikram Singh", college: "BITS Pilani", course: "B.Tech Electronics", year: "2022" },
                    { name: "Priya Gupta", college: "NIT Trichy", course: "B.Tech Mechanical", year: "2022" },
                  ].map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.college}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{student.course}</p>
                        <p className="text-xs text-muted-foreground">{student.year} Batch</p>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </div>
            </Tabs>
          </DashboardCard>

          <DashboardCard title="New Student Requests">
            <div className="space-y-4">
              {[
                { name: "Aryan Kumar", grade: "Class XII", stream: "Science", date: "Today" },
                { name: "Neha Verma", grade: "Class XII", stream: "Science", date: "Yesterday" },
                { name: "Rohan Joshi", grade: "Class XII", stream: "Commerce", date: "2 days ago" },
              ].map((student, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-md">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{student.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {student.grade} • {student.stream}
                    </p>
                    <p className="text-xs text-muted-foreground">Requested: {student.date}</p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" className="flex-1">
                        Accept
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Decline
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

        <DashboardCard title="Performance Analytics">
          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3">
            <div className="space-y-2">
              <h3 className="font-medium">Student Success Rate</h3>
              <div className="h-40 bg-muted/30 rounded-md flex items-center justify-center">
                <span className="text-4xl">📊</span>
              </div>
              <p className="text-sm text-muted-foreground">
                92% of your students got admission to their preferred colleges
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Exam Performance</h3>
              <div className="h-40 bg-muted/30 rounded-md flex items-center justify-center">
                <span className="text-4xl">📈</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Average improvement of 15% in test scores after counseling
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Session Feedback</h3>
              <div className="h-40 bg-muted/30 rounded-md flex items-center justify-center">
                <span className="text-4xl">⭐</span>
              </div>
              <p className="text-sm text-muted-foreground">4.8/5 average rating from student feedback</p>
            </div>
          </div>
        </DashboardCard>
      </div>
    </DashboardLayout>
  )
}

import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DashboardCard } from "@/components/dashboard/dashboard-card"
import { StatsCard } from "@/components/dashboard/stats-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText, BarChart, PlusCircle, Edit, Upload, MessageSquare } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Use string names for icons instead of component references
const navItems = [
  { name: "Dashboard", href: "/dashboard/college-rep", iconName: "home" },
  { name: "College Profile", href: "/dashboard/college-rep/profile", iconName: "building" },
  { name: "Applications", href: "/dashboard/college-rep/applications", iconName: "file-text" },
  { name: "Courses", href: "/dashboard/college-rep/courses", iconName: "book-open" },
  { name: "Events", href: "/dashboard/college-rep/events", iconName: "calendar" },
  { name: "Analytics", href: "/dashboard/college-rep/analytics", iconName: "bar-chart" },
  { name: "Messages", href: "/dashboard/college-rep/messages", iconName: "message-square" },
  { name: "Settings", href: "/dashboard/college-rep/settings", iconName: "settings" },
]

export default function CollegeRepDashboard() {
  return (
    <DashboardLayout navItems={navItems} userType="College Representative" userName="Rajesh Kumar" userInitials="RK">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome, Rajesh!</h1>
            <p className="text-muted-foreground">Manage your college profile and applications.</p>
          </div>
          <div className="flex flex-col xs:flex-row flex-wrap gap-2">
            <Button asChild className="w-full xs:w-auto">
              <Link href="/dashboard/college-rep/profile/edit">
                <Edit className="mr-2 h-4 w-4" />
                Update Profile
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full xs:w-auto">
              <Link href="/dashboard/college-rep/events/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Event
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Applications"
            value="1,248"
            icon={<FileText className="h-4 w-4" />}
            trend={{ value: 15, isPositive: true }}
          />
          <StatsCard
            title="New Applications"
            value="86"
            icon={<FileText className="h-4 w-4" />}
            description="Last 7 days"
          />
          <StatsCard
            title="Profile Views"
            value="3,542"
            icon={<FileText className="h-4 w-4" />}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Upcoming Events"
            value="3"
            icon={<Calendar className="h-4 w-4" />}
            description="Next: Virtual Open Day"
          />
        </div>

        <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-3">
          <DashboardCard title="Application Overview" className="md:col-span-2">
            <Tabs defaultValue="new">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="new">New</TabsTrigger>
                <TabsTrigger value="under-review">Under Review</TabsTrigger>
                <TabsTrigger value="accepted">Accepted</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
              <div className="mt-4">
                <TabsContent value="new" className="space-y-4">
                  {[
                    { name: "Rahul Sharma", course: "B.Tech Computer Science", date: "Apr 15, 2023", status: "new" },
                    { name: "Ananya Patel", course: "B.Tech Electronics", date: "Apr 14, 2023", status: "new" },
                    { name: "Vikram Singh", course: "MBA", date: "Apr 13, 2023", status: "new" },
                    { name: "Priya Gupta", course: "B.Tech Mechanical", date: "Apr 12, 2023", status: "new" },
                  ].map((application, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 border rounded-md"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {application.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{application.name}</p>
                          <p className="text-xs text-muted-foreground">{application.course}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2 sm:mt-0 self-start sm:self-auto sm:ml-auto">
                        <p className="text-xs text-muted-foreground">{application.date}</p>
                        <Button size="sm">Review</Button>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="under-review" className="space-y-4">
                  {[
                    { name: "Arjun Reddy", course: "B.Tech Civil", date: "Apr 10, 2023", status: "under-review" },
                    { name: "Neha Verma", course: "BBA", date: "Apr 9, 2023", status: "under-review" },
                    {
                      name: "Rohan Joshi",
                      course: "B.Tech Computer Science",
                      date: "Apr 8, 2023",
                      status: "under-review",
                    },
                  ].map((application, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 border rounded-md"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {application.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{application.name}</p>
                          <p className="text-xs text-muted-foreground">{application.course}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2 sm:mt-0 self-start sm:self-auto sm:ml-auto">
                        <p className="text-xs text-muted-foreground">{application.date}</p>
                        <Button size="sm" variant="outline">
                          Complete Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="accepted" className="space-y-4">
                  {[
                    {
                      name: "Aditya Sharma",
                      course: "B.Tech Computer Science",
                      date: "Apr 5, 2023",
                      status: "accepted",
                    },
                    { name: "Sneha Gupta", course: "MBA", date: "Apr 4, 2023", status: "accepted" },
                  ].map((application, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 border rounded-md"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {application.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{application.name}</p>
                          <p className="text-xs text-muted-foreground">{application.course}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2 sm:mt-0 self-start sm:self-auto sm:ml-auto">
                        <Badge className="bg-green-500">Accepted</Badge>
                        <p className="text-xs text-muted-foreground">{application.date}</p>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="rejected" className="space-y-4">
                  {[
                    { name: "Karan Malhotra", course: "B.Tech Electronics", date: "Apr 3, 2023", status: "rejected" },
                    { name: "Meera Patel", course: "BBA", date: "Apr 2, 2023", status: "rejected" },
                  ].map((application, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 border rounded-md"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {application.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{application.name}</p>
                          <p className="text-xs text-muted-foreground">{application.course}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2 sm:mt-0 self-start sm:self-auto sm:ml-auto">
                        <Badge variant="outline" className="text-red-500">
                          Rejected
                        </Badge>
                        <p className="text-xs text-muted-foreground">{application.date}</p>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </div>
            </Tabs>
          </DashboardCard>

          <DashboardCard title="Upcoming Events">
            <div className="space-y-4">
              {[
                { title: "Virtual Open Day", date: "April 25, 2023", time: "10:00 AM", registrations: 125 },
                { title: "Campus Tour", date: "May 5, 2023", time: "9:00 AM", registrations: 78 },
                { title: "Admission Webinar", date: "May 12, 2023", time: "4:00 PM", registrations: 92 },
              ].map((event, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-start gap-3 p-3 border rounded-md">
                  <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {event.date} • {event.time}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{event.registrations} registrations</p>
                    <Button size="sm" variant="outline" className="mt-2">
                      Manage Event
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

        <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-3">
          <DashboardCard title="Course Applications" className="md:col-span-2">
            <div className="space-y-4">
              {[
                { course: "B.Tech Computer Science", applications: 425, seats: 120, filled: 85 },
                { course: "B.Tech Electronics", applications: 310, seats: 90, filled: 70 },
                { course: "B.Tech Mechanical", applications: 280, seats: 90, filled: 65 },
                { course: "MBA", applications: 350, seats: 60, filled: 80 },
                { course: "BBA", applications: 290, seats: 120, filled: 60 },
              ].map((course, index) => (
                <div key={index} className="p-3 border rounded-md">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-medium">{course.course}</p>
                    <Badge variant="outline">{course.applications} Applications</Badge>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs text-muted-foreground">Seats filled: {course.filled}%</p>
                      <p className="text-xs text-muted-foreground">
                        {Math.round((course.seats * course.filled) / 100)}/{course.seats} seats
                      </p>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${course.filled}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard title="Quick Actions">
            <div className="space-y-3">
              <Button className="w-full justify-start" asChild>
                <Link href="/dashboard/college-rep/applications">
                  <FileText className="mr-2 h-4 w-4" />
                  Review Applications
                </Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link href="/dashboard/college-rep/courses/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Course
                </Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link href="/dashboard/college-rep/events/new">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Event
                </Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link href="/dashboard/college-rep/gallery">
                  <Upload className="mr-2 h-4 w-4" />
                  Update Gallery
                </Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link href="/dashboard/college-rep/messages">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  View Messages
                </Link>
              </Button>
            </div>
          </DashboardCard>
        </div>

        <DashboardCard title="Application Analytics">
          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3">
            <div className="space-y-2">
              <h3 className="font-medium">Applications by Course</h3>
              <div className="h-40 bg-muted/30 rounded-md flex items-center justify-center">
                <BarChart className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                B.Tech Computer Science has the highest number of applications
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Applications Trend</h3>
              <div className="h-40 bg-muted/30 rounded-md flex items-center justify-center">
                <BarChart className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">15% increase in applications compared to last year</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Geographic Distribution</h3>
              <div className="h-40 bg-muted/30 rounded-md flex items-center justify-center">
                <BarChart className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Most applications from Delhi, Maharashtra, and Karnataka</p>
            </div>
          </div>
        </DashboardCard>
      </div>
    </DashboardLayout>
  )
}

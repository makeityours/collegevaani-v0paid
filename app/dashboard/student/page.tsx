"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DashboardCard } from "@/components/dashboard/dashboard-card"
import { StatsCard } from "@/components/dashboard/stats-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  MessageSquare,
  Calendar,
  Upload,
  Bell,
  Building,
  CreditCard,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
} from "lucide-react"

const navItems = [
  { name: "Dashboard", href: "/dashboard/student", iconName: "home" },
  { name: "Profile", href: "/dashboard/student/profile", iconName: "users" },
  { name: "Applications", href: "/dashboard/student/applications", iconName: "file-text" },
  { name: "Documents", href: "/dashboard/student/documents", iconName: "upload" },
  { name: "Messages", href: "/dashboard/student/messages", iconName: "message-square" },
  { name: "Payments", href: "/dashboard/student/payments", iconName: "credit-card" },
  { name: "Recommendations", href: "/dashboard/student/recommendations", iconName: "star" },
  { name: "Saved Colleges", href: "/dashboard/student/saved", iconName: "bookmark" },
  { name: "Counseling", href: "/dashboard/student/counseling", iconName: "calendar" },
  { name: "Settings", href: "/dashboard/student/settings", iconName: "settings" },
]

export default function StudentDashboard() {
  const [notifications] = useState([
    {
      id: 1,
      title: "Application Status Update",
      message: "Your application to IIT Delhi has been reviewed",
      time: "2 hours ago",
      type: "success",
    },
    {
      id: 2,
      title: "Document Required",
      message: "Please upload your Class XII marksheet",
      time: "1 day ago",
      type: "warning",
    },
    {
      id: 3,
      title: "Counseling Session",
      message: "Your session with Dr. Mehta is scheduled for tomorrow",
      time: "2 days ago",
      type: "info",
    },
  ])

  return (
    <DashboardLayout navItems={navItems} userType="Student" userName="Rahul Sharma" userInitials="RS">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome back, Rahul!</h1>
            <p className="text-muted-foreground">Track your college applications and stay updated on your journey.</p>
          </div>
          <div className="flex flex-col xs:flex-row gap-2">
            <Button asChild className="w-full xs:w-auto">
              <Link href="/dashboard/student/applications/new">
                <FileText className="mr-2 h-4 w-4" />
                New Application
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full xs:w-auto">
              <Link href="/dashboard/student/counseling/book">
                <Calendar className="mr-2 h-4 w-4" />
                Book Counseling
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Applications Submitted"
            value="5"
            icon={<FileText className="h-4 w-4" />}
            description="2 pending review"
          />
          <StatsCard
            title="Documents Uploaded"
            value="8/10"
            icon={<Upload className="h-4 w-4" />}
            description="2 documents pending"
          />
          <StatsCard
            title="Counseling Sessions"
            value="3"
            icon={<Users className="h-4 w-4" />}
            description="Next: Tomorrow 2:00 PM"
          />
          <StatsCard
            title="Saved Colleges"
            value="12"
            icon={<Building className="h-4 w-4" />}
            description="3 new recommendations"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-3 md:gap-4 grid-cols-1 lg:grid-cols-3">
          {/* Application Status */}
          <DashboardCard title="Application Status" className="lg:col-span-2">
            <div className="space-y-4">
              {[
                {
                  college: "Indian Institute of Technology, Delhi",
                  course: "B.Tech Computer Science",
                  status: "under-review",
                  date: "Applied on Apr 15, 2023",
                  progress: 75,
                },
                {
                  college: "National Institute of Technology, Trichy",
                  course: "B.Tech Electronics",
                  status: "accepted",
                  date: "Applied on Apr 10, 2023",
                  progress: 100,
                },
                {
                  college: "Birla Institute of Technology and Science, Pilani",
                  course: "B.Tech Computer Science",
                  status: "pending",
                  date: "Applied on Apr 5, 2023",
                  progress: 25,
                },
                {
                  college: "Delhi Technological University",
                  course: "B.Tech Information Technology",
                  status: "rejected",
                  date: "Applied on Mar 28, 2023",
                  progress: 100,
                },
              ].map((application, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{application.college}</h3>
                      <p className="text-xs text-muted-foreground">{application.course}</p>
                      <p className="text-xs text-muted-foreground mt-1">{application.date}</p>
                    </div>
                    <Badge
                      variant={
                        application.status === "accepted"
                          ? "default"
                          : application.status === "under-review"
                            ? "secondary"
                            : application.status === "rejected"
                              ? "destructive"
                              : "outline"
                      }
                      className="ml-2"
                    >
                      {application.status === "under-review"
                        ? "Under Review"
                        : application.status === "accepted"
                          ? "Accepted"
                          : application.status === "rejected"
                            ? "Rejected"
                            : "Pending"}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Application Progress</span>
                      <span>{application.progress}%</span>
                    </div>
                    <Progress value={application.progress} className="h-2" />
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    {application.status === "accepted" && <Button size="sm">Download Offer Letter</Button>}
                    {application.status === "pending" && (
                      <Button size="sm" variant="outline">
                        Complete Application
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>

          {/* Quick Actions & Notifications */}
          <div className="space-y-4">
            <DashboardCard title="Quick Actions">
              <div className="space-y-3">
                <Button className="w-full justify-start" asChild>
                  <Link href="/dashboard/student/documents">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Documents
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/dashboard/student/messages">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message Counselor
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/dashboard/student/payments">
                    <CreditCard className="mr-2 h-4 w-4" />
                    View Payments
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/colleges/compare">
                    <Building className="mr-2 h-4 w-4" />
                    Compare Colleges
                  </Link>
                </Button>
              </div>
            </DashboardCard>

            <DashboardCard title="Recent Notifications">
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start gap-3 p-3 border rounded-md">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        notification.type === "success"
                          ? "bg-green-100 text-green-600"
                          : notification.type === "warning"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {notification.type === "success" ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : notification.type === "warning" ? (
                        <AlertCircle className="h-4 w-4" />
                      ) : (
                        <Bell className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{notification.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCard>
          </div>
        </div>

        {/* Recommendations & Saved Colleges */}
        <div className="grid gap-3 md:gap-4 grid-cols-1 lg:grid-cols-2">
          <DashboardCard title="Recommended for You">
            <div className="space-y-4">
              {[
                {
                  name: "Vellore Institute of Technology",
                  course: "B.Tech Computer Science",
                  match: "95% Match",
                  fees: "₹1.98 Lakhs/year",
                  rating: 4.5,
                },
                {
                  name: "SRM Institute of Science and Technology",
                  course: "B.Tech Information Technology",
                  match: "92% Match",
                  fees: "₹2.5 Lakhs/year",
                  rating: 4.3,
                },
                {
                  name: "Manipal Institute of Technology",
                  course: "B.Tech Computer Science",
                  match: "88% Match",
                  fees: "₹3.36 Lakhs/year",
                  rating: 4.4,
                },
              ].map((college, index) => (
                <div key={index} className="border rounded-lg p-3 space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{college.name}</h3>
                      <p className="text-xs text-muted-foreground">{college.course}</p>
                    </div>
                    <Badge className="bg-green-500">{college.match}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{college.rating}</span>
                    </div>
                    <span className="text-xs font-medium">{college.fees}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      Apply Now
                    </Button>
                    <Button size="sm" variant="outline">
                      Save
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard title="Upcoming Events">
            <div className="space-y-4">
              {[
                {
                  title: "Counseling Session with Dr. Priya Mehta",
                  date: "Tomorrow, 2:00 PM",
                  type: "counseling",
                  status: "confirmed",
                },
                {
                  title: "JEE Advanced Result Declaration",
                  date: "June 18, 2023",
                  type: "exam",
                  status: "upcoming",
                },
                {
                  title: "IIT Delhi Virtual Open Day",
                  date: "June 25, 2023",
                  type: "event",
                  status: "registered",
                },
                {
                  title: "Application Deadline - NIT Trichy",
                  date: "June 30, 2023",
                  type: "deadline",
                  status: "pending",
                },
              ].map((event, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-md">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      event.type === "counseling"
                        ? "bg-blue-100 text-blue-600"
                        : event.type === "exam"
                          ? "bg-green-100 text-green-600"
                          : event.type === "event"
                            ? "bg-purple-100 text-purple-600"
                            : "bg-red-100 text-red-600"
                    }`}
                  >
                    {event.type === "counseling" ? (
                      <Users className="h-4 w-4" />
                    ) : event.type === "exam" ? (
                      <FileText className="h-4 w-4" />
                    ) : event.type === "event" ? (
                      <Calendar className="h-4 w-4" />
                    ) : (
                      <Clock className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {event.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

        {/* Academic Progress */}
        <DashboardCard title="Academic Progress & Profile Completion">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-medium">Profile Completion</h3>
              <div className="space-y-3">
                {[
                  { item: "Personal Information", completed: true, progress: 100 },
                  { item: "Academic Records", completed: true, progress: 100 },
                  { item: "Document Upload", completed: false, progress: 80 },
                  { item: "Preferences Setup", completed: false, progress: 60 },
                  { item: "Payment Information", completed: false, progress: 0 },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{item.item}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{item.progress}%</span>
                        {item.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
                      </div>
                    </div>
                    <Progress value={item.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Recent Academic Updates</h3>
              <div className="space-y-3">
                {[
                  { subject: "JEE Main 2023", score: "96.8 percentile", date: "May 15, 2023" },
                  { subject: "Class XII Board", score: "92.4%", date: "May 10, 2023" },
                  { subject: "JEE Advanced", score: "Rank 1205", date: "June 5, 2023" },
                ].map((update, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <p className="font-medium text-sm">{update.subject}</p>
                      <p className="text-xs text-muted-foreground">{update.date}</p>
                    </div>
                    <Badge variant="outline">{update.score}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    </DashboardLayout>
  )
}

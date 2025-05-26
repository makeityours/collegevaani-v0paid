"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DashboardCard } from "@/components/dashboard/dashboard-card"
import { StatsCard } from "@/components/dashboard/stats-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  MessageSquare,
  Calendar,
  FileText,
  TrendingUp,
  Phone,
  Mail,
  Clock,
  Star,
  Filter,
  Search,
  Plus,
} from "lucide-react"

const navItems = [
  { name: "Dashboard", href: "/dashboard/counselor", iconName: "home" },
  { name: "Leads", href: "/dashboard/counselor/leads", iconName: "users" },
  { name: "Students", href: "/dashboard/counselor/students", iconName: "user-plus" },
  { name: "Appointments", href: "/dashboard/counselor/appointments", iconName: "calendar" },
  { name: "Messages", href: "/dashboard/counselor/messages", iconName: "message-square" },
  { name: "Applications", href: "/dashboard/counselor/applications", iconName: "file-text" },
  { name: "Resources", href: "/dashboard/counselor/resources", iconName: "book-open" },
  { name: "Reports", href: "/dashboard/counselor/reports", iconName: "bar-chart" },
  { name: "Settings", href: "/dashboard/counselor/settings", iconName: "settings" },
]

export default function CounselorDashboard() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const leads = [
    {
      id: 1,
      name: "Aryan Kumar",
      email: "aryan.kumar@email.com",
      phone: "+91 9876543210",
      course: "B.Tech Computer Science",
      status: "hot",
      source: "Website",
      lastContact: "2 hours ago",
      score: 85,
      notes: "Very interested in IIT Delhi, has good JEE scores",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 9876543211",
      course: "MBBS",
      status: "warm",
      source: "Social Media",
      lastContact: "1 day ago",
      score: 72,
      notes: "Preparing for NEET, needs guidance on college selection",
    },
    {
      id: 3,
      name: "Rohit Patel",
      email: "rohit.patel@email.com",
      phone: "+91 9876543212",
      course: "MBA",
      status: "cold",
      source: "Referral",
      lastContact: "3 days ago",
      score: 45,
      notes: "Working professional, looking for weekend programs",
    },
  ]

  const appointments = [
    {
      id: 1,
      student: "Rahul Sharma",
      time: "2:00 PM - 2:45 PM",
      date: "Today",
      type: "Career Guidance",
      status: "confirmed",
      meetingLink: "https://meet.google.com/abc-def-ghi",
    },
    {
      id: 2,
      student: "Ananya Patel",
      time: "4:00 PM - 4:45 PM",
      date: "Today",
      type: "College Selection",
      status: "confirmed",
      meetingLink: "https://meet.google.com/def-ghi-jkl",
    },
    {
      id: 3,
      student: "Vikram Singh",
      time: "10:00 AM - 10:45 AM",
      date: "Tomorrow",
      type: "Application Review",
      status: "pending",
      meetingLink: "https://meet.google.com/ghi-jkl-mno",
    },
  ]

  return (
    <DashboardLayout navItems={navItems} userType="Counselor" userName="Dr. Priya Mehta" userInitials="PM">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome, Dr. Mehta!</h1>
            <p className="text-muted-foreground">Manage your leads and help students achieve their dreams.</p>
          </div>
          <div className="flex flex-col xs:flex-row gap-2">
            <Button asChild className="w-full xs:w-auto">
              <Link href="/dashboard/counselor/leads/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Lead
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full xs:w-auto">
              <Link href="/dashboard/counselor/appointments/schedule">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Meeting
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Leads"
            value="48"
            icon={<Users className="h-4 w-4" />}
            trend={{ value: 12, isPositive: true }}
            description="This month"
          />
          <StatsCard
            title="Conversions"
            value="23"
            icon={<TrendingUp className="h-4 w-4" />}
            trend={{ value: 8, isPositive: true }}
            description="48% conversion rate"
          />
          <StatsCard
            title="Today's Appointments"
            value="5"
            icon={<Calendar className="h-4 w-4" />}
            description="Next: 2:00 PM"
          />
          <StatsCard
            title="Pending Follow-ups"
            value="12"
            icon={<Clock className="h-4 w-4" />}
            description="4 high priority"
          />
        </div>

        {/* Main Content */}
        <div className="grid gap-3 md:gap-4 grid-cols-1 lg:grid-cols-3">
          {/* Leads Management */}
          <DashboardCard title="Lead Management" className="lg:col-span-2">
            <div className="space-y-4">
              {/* Filters and Search */}
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search leads..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Leads</SelectItem>
                    <SelectItem value="hot">Hot Leads</SelectItem>
                    <SelectItem value="warm">Warm Leads</SelectItem>
                    <SelectItem value="cold">Cold Leads</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Leads List */}
              <div className="space-y-3">
                {leads.map((lead) => (
                  <div key={lead.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {lead.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{lead.name}</h3>
                            <Badge
                              variant={
                                lead.status === "hot" ? "destructive" : lead.status === "warm" ? "default" : "secondary"
                              }
                              className="text-xs"
                            >
                              {lead.status.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{lead.course}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {lead.email}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {lead.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-medium">{lead.score}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{lead.lastContact}</p>
                      </div>
                    </div>

                    <div className="bg-muted/30 rounded p-2">
                      <p className="text-xs text-muted-foreground">
                        <strong>Notes:</strong> {lead.notes}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm">Contact</Button>
                      <Button size="sm" variant="outline">
                        Schedule Call
                      </Button>
                      <Button size="sm" variant="outline">
                        View Profile
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DashboardCard>

          {/* Today's Schedule */}
          <DashboardCard title="Today's Schedule">
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="border rounded-lg p-3 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-sm">{appointment.student}</h3>
                      <p className="text-xs text-muted-foreground">{appointment.type}</p>
                    </div>
                    <Badge variant={appointment.status === "confirmed" ? "default" : "outline"} className="text-xs">
                      {appointment.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <p>{appointment.date}</p>
                    <p>{appointment.time}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      Join Meeting
                    </Button>
                    <Button size="sm" variant="outline">
                      Reschedule
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

        {/* Performance Analytics */}
        <div className="grid gap-3 md:gap-4 grid-cols-1 lg:grid-cols-2">
          <DashboardCard title="Performance Metrics">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 border rounded-lg">
                  <p className="text-2xl font-bold text-green-600">92%</p>
                  <p className="text-xs text-muted-foreground">Success Rate</p>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">4.8</p>
                  <p className="text-xs text-muted-foreground">Avg Rating</p>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">156</p>
                  <p className="text-xs text-muted-foreground">Students Helped</p>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">₹2.4L</p>
                  <p className="text-xs text-muted-foreground">Revenue Generated</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-sm">Recent Achievements</h4>
                {[
                  { achievement: "Top Performer of the Month", date: "May 2023" },
                  { achievement: "100% Success Rate in NEET Counseling", date: "April 2023" },
                  { achievement: "Student Satisfaction Award", date: "March 2023" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.achievement}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DashboardCard>

          <DashboardCard title="Quick Actions & Tools">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Button className="h-16 flex-col gap-1" variant="outline">
                  <MessageSquare className="h-5 w-5" />
                  <span className="text-xs">Send SMS</span>
                </Button>
                <Button className="h-16 flex-col gap-1" variant="outline">
                  <Mail className="h-5 w-5" />
                  <span className="text-xs">Send Email</span>
                </Button>
                <Button className="h-16 flex-col gap-1" variant="outline">
                  <FileText className="h-5 w-5" />
                  <span className="text-xs">Generate Report</span>
                </Button>
                <Button className="h-16 flex-col gap-1" variant="outline">
                  <Calendar className="h-5 w-5" />
                  <span className="text-xs">Book Slot</span>
                </Button>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-sm">Recent Activities</h4>
                {[
                  { activity: "Called Aryan Kumar", time: "2 hours ago", type: "call" },
                  { activity: "Sent college brochure to Priya", time: "4 hours ago", type: "email" },
                  { activity: "Scheduled meeting with Rohit", time: "Yesterday", type: "meeting" },
                  { activity: "Updated lead status for Sneha", time: "2 days ago", type: "update" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 border rounded">
                    <div
                      className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${
                        item.type === "call"
                          ? "bg-green-100 text-green-600"
                          : item.type === "email"
                            ? "bg-blue-100 text-blue-600"
                            : item.type === "meeting"
                              ? "bg-purple-100 text-purple-600"
                              : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {item.type === "call" ? (
                        <Phone className="h-3 w-3" />
                      ) : item.type === "email" ? (
                        <Mail className="h-3 w-3" />
                      ) : item.type === "meeting" ? (
                        <Calendar className="h-3 w-3" />
                      ) : (
                        <FileText className="h-3 w-3" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{item.activity}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </DashboardLayout>
  )
}

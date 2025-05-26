"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  Building,
  BookOpen,
  FileText,
  Users,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Plus,
  Search,
  Download,
  Bell,
  Eye,
  Edit,
  CreditCard,
} from "lucide-react"

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")
  const [searchTerm, setSearchTerm] = useState("")

  const stats = [
    {
      title: "Total Users",
      value: "12,543",
      change: "+12%",
      isPositive: true,
      icon: Users,
      description: "Active users this month",
    },
    {
      title: "Total Leads",
      value: "3,247",
      change: "+18%",
      isPositive: true,
      icon: TrendingUp,
      description: "New leads generated",
    },
    {
      title: "Conversions",
      value: "1,456",
      change: "+8%",
      isPositive: true,
      icon: ArrowUpRight,
      description: "Lead to admission ratio: 45%",
    },
    {
      title: "Revenue",
      value: "₹24.5L",
      change: "-2%",
      isPositive: false,
      icon: CreditCard,
      description: "Total revenue this month",
    },
  ]

  const recentActivities = [
    { action: "New college added", user: "Admin", time: "2 minutes ago", type: "create" },
    { action: "Course updated", user: "Editor", time: "1 hour ago", type: "update" },
    { action: "Lead assigned to counselor", user: "System", time: "2 hours ago", type: "assign" },
    { action: "Payment received", user: "System", time: "3 hours ago", type: "payment" },
    { action: "User registered", user: "System", time: "4 hours ago", type: "register" },
    { action: "News article published", user: "Editor", time: "5 hours ago", type: "publish" },
  ]

  const topColleges = [
    { name: "IIT Delhi", applications: 1250, views: 15420, rating: 4.8 },
    { name: "IIT Bombay", applications: 1180, views: 14230, rating: 4.9 },
    { name: "AIIMS Delhi", applications: 980, views: 12340, rating: 4.7 },
    { name: "NIT Trichy", applications: 850, views: 10250, rating: 4.6 },
    { name: "BITS Pilani", applications: 720, views: 9180, rating: 4.5 },
  ]

  const leadSources = [
    { source: "Organic Search", leads: 1250, percentage: 38.5 },
    { source: "Social Media", leads: 890, percentage: 27.4 },
    { source: "Direct Traffic", leads: 560, percentage: 17.2 },
    { source: "Referrals", leads: 320, percentage: 9.9 },
    { source: "Paid Ads", leads: 227, percentage: 7.0 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive overview of your education portal</p>
        </div>
        <div className="flex flex-col xs:flex-row gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-full xs:w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button asChild className="w-full xs:w-auto">
            <Link href="/admin/reports/generate">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                {stat.isPositive ? (
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                )}
                <span className={stat.isPositive ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                <span className="ml-1">{stat.description}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
            {/* Recent Activities */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest actions across the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          activity.type === "create"
                            ? "bg-green-100 text-green-600"
                            : activity.type === "update"
                              ? "bg-blue-100 text-blue-600"
                              : activity.type === "assign"
                                ? "bg-purple-100 text-purple-600"
                                : activity.type === "payment"
                                  ? "bg-yellow-100 text-yellow-600"
                                  : activity.type === "register"
                                    ? "bg-indigo-100 text-indigo-600"
                                    : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {activity.type === "create" ? (
                          <Plus className="h-4 w-4" />
                        ) : activity.type === "update" ? (
                          <Edit className="h-4 w-4" />
                        ) : activity.type === "assign" ? (
                          <Users className="h-4 w-4" />
                        ) : activity.type === "payment" ? (
                          <CreditCard className="h-4 w-4" />
                        ) : activity.type === "register" ? (
                          <Users className="h-4 w-4" />
                        ) : (
                          <FileText className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">
                          By {activity.user} • {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" asChild>
                  <Link href="/admin/colleges/new">
                    <Building className="mr-2 h-4 w-4" />
                    Add New College
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/admin/courses/new">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Add New Course
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/admin/exams/new">
                    <FileText className="mr-2 h-4 w-4" />
                    Add New Exam
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/admin/users/manage">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Users
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/admin/leads/assign">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Assign Leads
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/admin/notifications/send">
                    <Bell className="mr-2 h-4 w-4" />
                    Send Notification
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Top Performing Colleges */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Colleges</CardTitle>
              <CardDescription>Colleges with highest applications and views</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topColleges.map((college, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Building className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{college.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {college.applications} applications • {college.views} views
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{college.rating} ⭐</Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage students, counselors, and administrators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Rahul Sharma",
                    email: "rahul@example.com",
                    role: "Student",
                    status: "Active",
                    lastLogin: "2 hours ago",
                  },
                  {
                    name: "Dr. Priya Mehta",
                    email: "priya@example.com",
                    role: "Counselor",
                    status: "Active",
                    lastLogin: "1 hour ago",
                  },
                  {
                    name: "Admin User",
                    email: "admin@example.com",
                    role: "Admin",
                    status: "Active",
                    lastLogin: "30 minutes ago",
                  },
                  {
                    name: "Ananya Patel",
                    email: "ananya@example.com",
                    role: "Student",
                    status: "Inactive",
                    lastLogin: "2 days ago",
                  },
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={user.role === "Admin" ? "default" : "outline"}>{user.role}</Badge>
                      <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Colleges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,248</div>
                <p className="text-xs text-muted-foreground">+12 this week</p>
                <Button size="sm" className="w-full mt-2" asChild>
                  <Link href="/admin/colleges">Manage</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,567</div>
                <p className="text-xs text-muted-foreground">+28 this week</p>
                <Button size="sm" className="w-full mt-2" asChild>
                  <Link href="/admin/courses">Manage</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Exams</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">245</div>
                <p className="text-xs text-muted-foreground">+5 this week</p>
                <Button size="sm" className="w-full mt-2" asChild>
                  <Link href="/admin/exams">Manage</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">892</div>
                <p className="text-xs text-muted-foreground">+15 this week</p>
                <Button size="sm" className="w-full mt-2" asChild>
                  <Link href="/admin/news">Manage</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lead Sources</CardTitle>
              <CardDescription>Where your leads are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leadSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{source.source}</p>
                        <p className="text-sm text-muted-foreground">{source.leads} leads</p>
                      </div>
                    </div>
                    <Badge variant="outline">{source.percentage}%</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Analytics</CardTitle>
                <CardDescription>Website traffic and user engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-md">
                  <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Chart visualization</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
                <CardDescription>Lead to admission conversion rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-md">
                  <TrendingUp className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Funnel visualization</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

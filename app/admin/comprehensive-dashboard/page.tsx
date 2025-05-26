"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"
import {
  Users,
  TrendingUp,
  DollarSign,
  Target,
  Settings,
  BarChart3,
  Shield,
  Database,
  Zap,
  Globe,
  Mail,
  Phone,
  Calendar,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  Plus,
} from "lucide-react"

interface DashboardStats {
  totalUsers: number
  totalLeads: number
  conversionRate: number
  revenue: number
  activeUsers: number
  pageViews: number
}

interface SystemSettings {
  leadGeneration: boolean
  notifications: boolean
  analytics: boolean
  maintenance: boolean
  registration: boolean
  payments: boolean
}

export default function ComprehensiveAdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 12450,
    totalLeads: 3280,
    conversionRate: 24.5,
    revenue: 1250000,
    activeUsers: 890,
    pageViews: 45600,
  })
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    leadGeneration: true,
    notifications: true,
    analytics: true,
    maintenance: false,
    registration: true,
    payments: true,
  })

  const handleSettingChange = (setting: keyof SystemSettings, value: boolean) => {
    setSystemSettings((prev) => ({
      ...prev,
      [setting]: value,
    }))
    toast({
      title: "Setting Updated",
      description: `${setting} has been ${value ? "enabled" : "disabled"}`,
    })
  }

  const exportData = (type: string) => {
    toast({
      title: "Export Started",
      description: `${type} data export has been initiated. You'll receive an email when ready.`,
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">Comprehensive control panel for CollegeVaani</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Settings className="h-4 w-4 mr-2" />
            System Settings
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold">{stats.totalLeads.toLocaleString()}</p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold">{stats.conversionRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-2xl font-bold">₹{(stats.revenue / 100000).toFixed(1)}L</p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold">{stats.activeUsers}</p>
              </div>
              <Zap className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Page Views</p>
                <p className="text-2xl font-bold">{stats.pageViews.toLocaleString()}</p>
              </div>
              <Eye className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="leads">Lead Management</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="content">Content Management</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="monetization">Monetization</TabsTrigger>
          <TabsTrigger value="system">System Settings</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "New user registration", user: "Rahul Kumar", time: "2 minutes ago" },
                    { action: "Lead form submission", user: "Priya Sharma", time: "5 minutes ago" },
                    { action: "Quiz completed", user: "Amit Singh", time: "8 minutes ago" },
                    { action: "Forum post created", user: "Neha Gupta", time: "12 minutes ago" },
                    { action: "Payment received", user: "Vikash Yadav", time: "15 minutes ago" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{activity.action}</div>
                        <div className="text-sm text-gray-600">by {activity.user}</div>
                      </div>
                      <div className="text-sm text-gray-500">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Server Performance</span>
                      <span className="text-green-600">98%</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Database Health</span>
                      <span className="text-green-600">95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>API Response Time</span>
                      <span className="text-yellow-600">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Storage Usage</span>
                      <span className="text-blue-600">72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="h-20 flex flex-col gap-2">
                  <Plus className="h-6 w-6" />
                  Add College
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Mail className="h-6 w-6" />
                  Send Newsletter
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Upload className="h-6 w-6" />
                  Import Data
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <BarChart3 className="h-6 w-6" />
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lead Management Tab */}
        <TabsContent value="leads" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Lead Management</h2>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => exportData("leads")}>
                <Download className="h-4 w-4 mr-2" />
                Export Leads
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Lead
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">1,245</div>
                <div className="text-sm text-gray-600">New Leads</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">856</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">432</div>
                <div className="text-sm text-gray-600">Qualified</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">298</div>
                <div className="text-sm text-gray-600">Converted</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Rahul Kumar", email: "rahul@email.com", course: "Engineering", score: 85, status: "new" },
                  { name: "Priya Sharma", email: "priya@email.com", course: "Medical", score: 92, status: "qualified" },
                  { name: "Amit Singh", email: "amit@email.com", course: "Management", score: 78, status: "contacted" },
                  { name: "Neha Gupta", email: "neha@email.com", course: "Law", score: 88, status: "new" },
                  {
                    name: "Vikash Yadav",
                    email: "vikash@email.com",
                    course: "Engineering",
                    score: 95,
                    status: "converted",
                  },
                ].map((lead, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="font-medium">{lead.name}</div>
                        <div className="text-sm text-gray-600">{lead.email}</div>
                      </div>
                      <Badge variant="outline">{lead.course}</Badge>
                      <Badge variant={lead.status === "converted" ? "default" : "secondary"}>Score: {lead.score}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          lead.status === "new"
                            ? "secondary"
                            : lead.status === "qualified"
                              ? "default"
                              : lead.status === "converted"
                                ? "default"
                                : "outline"
                        }
                      >
                        {lead.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="h-4 w-4" />
                      </Button>
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

        {/* User Management Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">User Management</h2>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => exportData("users")}>
                <Download className="h-4 w-4 mr-2" />
                Export Users
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">8,456</div>
                <div className="text-sm text-gray-600">Students</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">1,234</div>
                <div className="text-sm text-gray-600">Parents</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">156</div>
                <div className="text-sm text-gray-600">Counselors</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">89</div>
                <div className="text-sm text-gray-600">College Reps</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">12</div>
                <div className="text-sm text-gray-600">Admins</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Rahul Kumar", role: "Student", lastActive: "2 minutes ago", status: "online" },
                  { name: "Dr. Priya Sharma", role: "Counselor", lastActive: "5 minutes ago", status: "online" },
                  { name: "Amit Singh", role: "Parent", lastActive: "1 hour ago", status: "offline" },
                  { name: "IIT Delhi Rep", role: "College Rep", lastActive: "2 hours ago", status: "offline" },
                  { name: "Admin User", role: "Admin", lastActive: "30 minutes ago", status: "online" },
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-3 h-3 rounded-full ${user.status === "online" ? "bg-green-500" : "bg-gray-400"}`}
                      />
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-600">{user.role}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-gray-500">{user.lastActive}</div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Management Tab */}
        <TabsContent value="content" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Content Management</h2>
            <div className="flex gap-2">
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Bulk Upload
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Content
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">2,456</div>
                <div className="text-sm text-gray-600">Colleges</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">1,234</div>
                <div className="text-sm text-gray-600">Courses</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">567</div>
                <div className="text-sm text-gray-600">Exams</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">890</div>
                <div className="text-sm text-gray-600">Articles</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Content Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="colleges" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="colleges">Colleges</TabsTrigger>
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                  <TabsTrigger value="exams">Exams</TabsTrigger>
                  <TabsTrigger value="articles">Articles</TabsTrigger>
                </TabsList>

                <TabsContent value="colleges" className="space-y-4">
                  <div className="space-y-2">
                    {[
                      { name: "IIT Delhi", type: "Engineering", status: "published", views: 15420 },
                      { name: "AIIMS Delhi", type: "Medical", status: "published", views: 12350 },
                      { name: "IIM Ahmedabad", type: "Management", status: "draft", views: 0 },
                      { name: "NLU Delhi", type: "Law", status: "published", views: 8760 },
                      { name: "DU", type: "Arts", status: "published", views: 9840 },
                    ].map((college, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div>
                            <div className="font-medium">{college.name}</div>
                            <div className="text-sm text-gray-600">{college.type}</div>
                          </div>
                          <Badge variant={college.status === "published" ? "default" : "secondary"}>
                            {college.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-gray-500">{college.views} views</div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="courses" className="space-y-4">
                  <div className="space-y-2">
                    {[
                      { name: "B.Tech Computer Science", category: "Engineering", colleges: 245, status: "published" },
                      { name: "MBBS", category: "Medical", colleges: 156, status: "published" },
                      { name: "MBA", category: "Management", colleges: 189, status: "published" },
                      { name: "LLB", category: "Law", colleges: 78, status: "draft" },
                      { name: "B.A. English", category: "Arts", colleges: 234, status: "published" },
                    ].map((course, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div>
                            <div className="font-medium">{course.name}</div>
                            <div className="text-sm text-gray-600">{course.category}</div>
                          </div>
                          <Badge variant={course.status === "published" ? "default" : "secondary"}>
                            {course.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-gray-500">{course.colleges} colleges</div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="exams" className="space-y-4">
                  <div className="space-y-2">
                    {[
                      { name: "JEE Main", type: "Engineering", date: "2024-04-15", registrations: 12450 },
                      { name: "NEET", type: "Medical", date: "2024-05-05", registrations: 18760 },
                      { name: "CAT", type: "Management", date: "2024-11-26", registrations: 8940 },
                      { name: "CLAT", type: "Law", date: "2024-12-01", registrations: 5670 },
                      { name: "CUET", type: "General", date: "2024-05-15", registrations: 15230 },
                    ].map((exam, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div>
                            <div className="font-medium">{exam.name}</div>
                            <div className="text-sm text-gray-600">
                              {exam.type} • {exam.date}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-gray-500">{exam.registrations} registered</div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="articles" className="space-y-4">
                  <div className="space-y-2">
                    {[
                      {
                        title: "How to Choose the Right Engineering College",
                        author: "Admin",
                        views: 5420,
                        status: "published",
                      },
                      {
                        title: "NEET Preparation Strategy 2024",
                        author: "Dr. Sharma",
                        views: 8760,
                        status: "published",
                      },
                      { title: "Top MBA Colleges in India", author: "Career Expert", views: 3240, status: "draft" },
                      { title: "Law Career Opportunities", author: "Legal Expert", views: 2180, status: "published" },
                      { title: "Study Abroad Guide", author: "International Expert", views: 6540, status: "published" },
                    ].map((article, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div>
                            <div className="font-medium">{article.title}</div>
                            <div className="text-sm text-gray-600">by {article.author}</div>
                          </div>
                          <Badge variant={article.status === "published" ? "default" : "secondary"}>
                            {article.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-gray-500">{article.views} views</div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
            <div className="flex gap-2">
              <Select defaultValue="7days">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="1year">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => exportData("analytics")}>
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Page Views</p>
                    <p className="text-2xl font-bold">45,678</p>
                    <p className="text-sm text-green-600">+12.5% from last week</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Unique Visitors</p>
                    <p className="text-2xl font-bold">12,456</p>
                    <p className="text-sm text-green-600">+8.3% from last week</p>
                  </div>
                  <Users className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Bounce Rate</p>
                    <p className="text-2xl font-bold">32.4%</p>
                    <p className="text-sm text-red-600">+2.1% from last week</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg. Session</p>
                    <p className="text-2xl font-bold">4m 32s</p>
                    <p className="text-sm text-green-600">+15.2% from last week</p>
                  </div>
                  <Globe className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { page: "/colleges", views: 15420, percentage: 34 },
                    { page: "/courses", views: 12350, percentage: 27 },
                    { page: "/exams", views: 8760, percentage: 19 },
                    { page: "/online-degrees", views: 5430, percentage: 12 },
                    { page: "/resources", views: 3640, percentage: 8 },
                  ].map((page, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{page.page}</span>
                        <span className="text-sm text-gray-600">{page.views} views</span>
                      </div>
                      <Progress value={page.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { source: "Organic Search", visitors: 8420, percentage: 45 },
                    { source: "Direct", visitors: 5630, percentage: 30 },
                    { source: "Social Media", visitors: 2840, percentage: 15 },
                    { source: "Referrals", visitors: 1260, percentage: 7 },
                    { source: "Email", visitors: 560, percentage: 3 },
                  ].map((source, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{source.source}</span>
                        <span className="text-sm text-gray-600">{source.visitors} visitors</span>
                      </div>
                      <Progress value={source.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Monetization Tab */}
        <TabsContent value="monetization" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Monetization Dashboard</h2>
            <div className="flex gap-2">
              <Button variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Revenue Report
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">₹12.5L</div>
                <div className="text-sm text-gray-600">Total Revenue</div>
                <div className="text-xs text-green-600">+18.5% this month</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">₹4.2L</div>
                <div className="text-sm text-gray-600">Lead Sales</div>
                <div className="text-xs text-blue-600">+22.3% this month</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">₹3.8L</div>
                <div className="text-sm text-gray-600">Premium Plans</div>
                <div className="text-xs text-purple-600">+15.7% this month</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">₹4.5L</div>
                <div className="text-sm text-gray-600">Partnerships</div>
                <div className="text-xs text-orange-600">+12.1% this month</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Streams</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { stream: "Lead Generation", amount: 420000, percentage: 34 },
                    { stream: "Premium Subscriptions", amount: 380000, percentage: 30 },
                    { stream: "College Partnerships", amount: 450000, percentage: 36 },
                  ].map((stream, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{stream.stream}</span>
                        <span className="text-sm text-gray-600">₹{(stream.amount / 100000).toFixed(1)}L</span>
                      </div>
                      <Progress value={stream.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Engineering College Leads", budget: 50000, spent: 32000, leads: 245 },
                    { name: "Medical College Premium", budget: 30000, spent: 28000, leads: 156 },
                    { name: "MBA Partnership Drive", budget: 40000, spent: 15000, leads: 89 },
                  ].map((campaign, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium">{campaign.name}</div>
                        <Badge variant="outline">{campaign.leads} leads</Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        ₹{campaign.spent.toLocaleString()} / ₹{campaign.budget.toLocaleString()}
                      </div>
                      <Progress value={(campaign.spent / campaign.budget) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* System Settings Tab */}
        <TabsContent value="system" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">System Settings</h2>
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              Advanced Settings
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Feature Controls</CardTitle>
                <CardDescription>Enable or disable platform features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="lead-generation">Lead Generation System</Label>
                    <p className="text-sm text-gray-600">Enable lead capture forms and tracking</p>
                  </div>
                  <Switch
                    id="lead-generation"
                    checked={systemSettings.leadGeneration}
                    onCheckedChange={(checked) => handleSettingChange("leadGeneration", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notifications">Push Notifications</Label>
                    <p className="text-sm text-gray-600">Send notifications to users</p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={systemSettings.notifications}
                    onCheckedChange={(checked) => handleSettingChange("notifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="analytics">Analytics Tracking</Label>
                    <p className="text-sm text-gray-600">Track user behavior and site performance</p>
                  </div>
                  <Switch
                    id="analytics"
                    checked={systemSettings.analytics}
                    onCheckedChange={(checked) => handleSettingChange("analytics", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenance">Maintenance Mode</Label>
                    <p className="text-sm text-gray-600">Put site in maintenance mode</p>
                  </div>
                  <Switch
                    id="maintenance"
                    checked={systemSettings.maintenance}
                    onCheckedChange={(checked) => handleSettingChange("maintenance", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="registration">User Registration</Label>
                    <p className="text-sm text-gray-600">Allow new user registrations</p>
                  </div>
                  <Switch
                    id="registration"
                    checked={systemSettings.registration}
                    onCheckedChange={(checked) => handleSettingChange("registration", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="payments">Payment Processing</Label>
                    <p className="text-sm text-gray-600">Enable payment gateway</p>
                  </div>
                  <Switch
                    id="payments"
                    checked={systemSettings.payments}
                    onCheckedChange={(checked) => handleSettingChange("payments", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Integration Settings</CardTitle>
                <CardDescription>Configure third-party integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="hubspot-key">HubSpot API Key</Label>
                  <Input
                    id="hubspot-key"
                    type="password"
                    placeholder="Enter HubSpot API key"
                    defaultValue="••••••••••••••••"
                  />
                </div>

                <div>
                  <Label htmlFor="ga-id">Google Analytics ID</Label>
                  <Input id="ga-id" placeholder="GA-XXXXXXXXX-X" defaultValue={process.env.GA_MEASUREMENT_ID || ""} />
                </div>

                <div>
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@collegevaani.com"
                    defaultValue={process.env.ADMIN_EMAIL || ""}
                  />
                </div>

                <div>
                  <Label htmlFor="smtp-settings">SMTP Configuration</Label>
                  <Textarea id="smtp-settings" placeholder="SMTP server configuration..." rows={3} />
                </div>

                <Button className="w-full">Save Integration Settings</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Security & Backup</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <div className="font-medium">SSL Certificate</div>
                  <div className="text-sm text-green-600">Valid until Dec 2024</div>
                </div>

                <div className="text-center p-4 border rounded-lg">
                  <Database className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <div className="font-medium">Last Backup</div>
                  <div className="text-sm text-gray-600">2 hours ago</div>
                </div>

                <div className="text-center p-4 border rounded-lg">
                  <Globe className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <div className="font-medium">CDN Status</div>
                  <div className="text-sm text-green-600">Active</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Reports & Exports</h2>
            <Button>
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Report
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "User Activity Report",
                description: "Detailed user engagement metrics",
                format: "PDF",
                size: "2.5 MB",
              },
              {
                title: "Lead Generation Report",
                description: "Lead sources and conversion data",
                format: "Excel",
                size: "1.8 MB",
              },
              {
                title: "Revenue Analytics",
                description: "Financial performance overview",
                format: "PDF",
                size: "3.2 MB",
              },
              {
                title: "Content Performance",
                description: "Page views and engagement stats",
                format: "CSV",
                size: "890 KB",
              },
              {
                title: "System Health Report",
                description: "Server and database performance",
                format: "PDF",
                size: "1.5 MB",
              },
              {
                title: "SEO Analysis Report",
                description: "Search engine optimization metrics",
                format: "PDF",
                size: "2.1 MB",
              },
            ].map((report, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{report.title}</CardTitle>
                  <CardDescription>{report.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline">{report.format}</Badge>
                    <span className="text-sm text-gray-600">{report.size}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Weekly User Report", frequency: "Every Monday", nextRun: "Jan 22, 2024", recipients: 3 },
                  {
                    name: "Monthly Revenue Report",
                    frequency: "First of month",
                    nextRun: "Feb 1, 2024",
                    recipients: 5,
                  },
                  { name: "Daily Lead Summary", frequency: "Daily at 9 AM", nextRun: "Tomorrow", recipients: 2 },
                ].map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{schedule.name}</div>
                      <div className="text-sm text-gray-600">
                        {schedule.frequency} • {schedule.recipients} recipients
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-gray-500">Next: {schedule.nextRun}</div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

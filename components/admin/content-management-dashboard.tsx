"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, TrendingUp, Edit, Trash, Plus, Eye, Search, Filter, Upload } from "lucide-react"

export default function ContentManagementDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Content Management Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import Content
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Content
          </Button>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Course Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6.3%</div>
            <p className="text-xs text-muted-foreground">+0.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Content</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">+23 new this month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="exams">Exams</TabsTrigger>
          <TabsTrigger value="online-degrees">Online Degrees</TabsTrigger>
          <TabsTrigger value="leads">Lead Management</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Content Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "B.Tech Computer Science", type: "Course", status: "Updated", time: "2 hours ago" },
                    { title: "JEE Main 2024", type: "Exam", status: "Published", time: "4 hours ago" },
                    { title: "MBA Online Program", type: "Online Degree", status: "Draft", time: "6 hours ago" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.type} • {item.time}
                        </p>
                      </div>
                      <Badge
                        variant={
                          item.status === "Published" ? "default" : item.status === "Updated" ? "secondary" : "outline"
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Bachelor of Technology (B.Tech)", views: "12,456", leads: "234" },
                    { title: "JEE Main Preparation", views: "8,923", leads: "189" },
                    { title: "MBA Online Programs", views: "7,654", leads: "156" },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <p className="font-medium">{item.title}</p>
                        <div className="text-sm text-muted-foreground">
                          {item.views} views • {item.leads} leads
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(Number.parseInt(item.leads) / 250) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Course Management</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Course
            </Button>
          </div>

          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search courses..." className="pl-9" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left p-4">Course</th>
                      <th className="text-left p-4">Level</th>
                      <th className="text-left p-4">Views</th>
                      <th className="text-left p-4">Leads</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        course: "Bachelor of Technology (B.Tech)",
                        level: "Undergraduate",
                        views: "12,456",
                        leads: "234",
                        status: "Published",
                      },
                      {
                        course: "Master of Business Administration (MBA)",
                        level: "Postgraduate",
                        views: "8,923",
                        leads: "189",
                        status: "Published",
                      },
                      {
                        course: "Bachelor of Computer Applications (BCA)",
                        level: "Undergraduate",
                        views: "6,234",
                        leads: "145",
                        status: "Draft",
                      },
                    ].map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-4 font-medium">{item.course}</td>
                        <td className="p-4">{item.level}</td>
                        <td className="p-4">{item.views}</td>
                        <td className="p-4">{item.leads}</td>
                        <td className="p-4">
                          <Badge variant={item.status === "Published" ? "default" : "outline"}>{item.status}</Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Lead Management</h2>
            <Button variant="outline">Export Leads</Button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Lead Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { source: "Organic Search", count: "1,245", percentage: "45%" },
                    { source: "Course Pages", count: "892", percentage: "32%" },
                    { source: "Online Degrees", count: "456", percentage: "16%" },
                    { source: "Exam Pages", count: "254", percentage: "7%" },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{item.source}</span>
                      <div className="text-right">
                        <span className="font-medium">{item.count}</span>
                        <span className="text-sm text-muted-foreground ml-2">{item.percentage}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lead Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { quality: "Hot Leads", count: "234", color: "text-red-600" },
                    { quality: "Warm Leads", count: "567", color: "text-orange-600" },
                    { quality: "Cold Leads", count: "891", color: "text-blue-600" },
                    { quality: "Qualified", count: "156", color: "text-green-600" },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{item.quality}</span>
                      <span className={`font-medium ${item.color}`}>{item.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { stage: "Page Views", count: "45,231", width: "100%" },
                    { stage: "Form Views", count: "12,456", width: "75%" },
                    { stage: "Form Starts", count: "8,234", width: "50%" },
                    { stage: "Form Submits", count: "2,847", width: "25%" },
                  ].map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.stage}</span>
                        <span className="font-medium">{item.count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: item.width }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

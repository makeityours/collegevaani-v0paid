"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Search,
  Filter,
  Plus,
  Download,
  Upload,
  Users,
  TrendingUp,
  Phone,
  Mail,
  Star,
  Eye,
  Edit,
  UserPlus,
  MessageSquare,
  BarChart3,
} from "lucide-react"

export default function AdminLeadsPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCounselor, setSelectedCounselor] = useState("all")

  const leads = [
    {
      id: 1,
      name: "Aryan Kumar",
      email: "aryan.kumar@email.com",
      phone: "+91 9876543210",
      course: "B.Tech Computer Science",
      status: "hot",
      source: "Website",
      assignedTo: "Dr. Priya Mehta",
      lastContact: "2 hours ago",
      score: 85,
      createdAt: "2023-06-15",
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
      assignedTo: "Dr. Rajesh Kumar",
      lastContact: "1 day ago",
      score: 72,
      createdAt: "2023-06-14",
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
      assignedTo: "Unassigned",
      lastContact: "3 days ago",
      score: 45,
      createdAt: "2023-06-12",
      notes: "Working professional, looking for weekend programs",
    },
    {
      id: 4,
      name: "Sneha Gupta",
      email: "sneha.gupta@email.com",
      phone: "+91 9876543213",
      course: "B.Tech Electronics",
      status: "converted",
      source: "Website",
      assignedTo: "Dr. Priya Mehta",
      lastContact: "1 week ago",
      score: 95,
      createdAt: "2023-06-08",
      notes: "Successfully enrolled in NIT Trichy",
    },
  ]

  const counselors = [
    { id: 1, name: "Dr. Priya Mehta", leads: 15, conversions: 8 },
    { id: 2, name: "Dr. Rajesh Kumar", leads: 12, conversions: 6 },
    { id: 3, name: "Prof. Anita Singh", leads: 18, conversions: 10 },
    { id: 4, name: "Dr. Vikram Sharma", leads: 9, conversions: 4 },
  ]

  const leadStats = [
    { title: "Total Leads", value: "3,247", change: "+18%", isPositive: true },
    { title: "Hot Leads", value: "456", change: "+12%", isPositive: true },
    { title: "Conversions", value: "1,456", change: "+8%", isPositive: true },
    { title: "Conversion Rate", value: "44.8%", change: "+2.3%", isPositive: true },
  ]

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.course.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === "all" || lead.status === selectedFilter
    const matchesCounselor = selectedCounselor === "all" || lead.assignedTo === selectedCounselor

    return matchesSearch && matchesFilter && matchesCounselor
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Lead Management</h1>
          <p className="text-muted-foreground">Manage and track all leads across the platform</p>
        </div>
        <div className="flex flex-col xs:flex-row gap-2">
          <Button variant="outline" className="w-full xs:w-auto">
            <Upload className="mr-2 h-4 w-4" />
            Import Leads
          </Button>
          <Button variant="outline" className="w-full xs:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Export Leads
          </Button>
          <Button className="w-full xs:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {leadStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                <span className="text-green-500">{stat.change}</span>
                <span className="ml-1">from last month</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="leads" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="leads">All Leads</TabsTrigger>
          <TabsTrigger value="assignment">Lead Assignment</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>

        <TabsContent value="leads" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
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
                  <SelectTrigger className="w-full md:w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="hot">Hot Leads</SelectItem>
                    <SelectItem value="warm">Warm Leads</SelectItem>
                    <SelectItem value="cold">Cold Leads</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedCounselor} onValueChange={setSelectedCounselor}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <Users className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by counselor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Counselors</SelectItem>
                    {counselors.map((counselor) => (
                      <SelectItem key={counselor.id} value={counselor.name}>
                        {counselor.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="Unassigned">Unassigned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Leads List */}
          <Card>
            <CardHeader>
              <CardTitle>Leads ({filteredLeads.length})</CardTitle>
              <CardDescription>Manage and track all leads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredLeads.map((lead) => (
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
                                lead.status === "hot"
                                  ? "destructive"
                                  : lead.status === "warm"
                                    ? "default"
                                    : lead.status === "converted"
                                      ? "default"
                                      : "secondary"
                              }
                              className="text-xs"
                            >
                              {lead.status.toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {lead.source}
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

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Assigned to:</span>
                        <Badge variant={lead.assignedTo === "Unassigned" ? "outline" : "secondary"}>
                          {lead.assignedTo}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <UserPlus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-muted/30 rounded p-2">
                      <p className="text-xs text-muted-foreground">
                        <strong>Notes:</strong> {lead.notes}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignment" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Counselor Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Counselor Performance</CardTitle>
                <CardDescription>Track counselor lead management and conversions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {counselors.map((counselor) => (
                    <div key={counselor.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {counselor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{counselor.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {counselor.leads} leads • {counselor.conversions} conversions
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">
                          {Math.round((counselor.conversions / counselor.leads) * 100)}% rate
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Auto-Assignment Rules */}
            <Card>
              <CardHeader>
                <CardTitle>Auto-Assignment Rules</CardTitle>
                <CardDescription>Configure automatic lead assignment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm">Engineering Courses</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Auto-assign to Dr. Priya Mehta and Prof. Anita Singh
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        Disable
                      </Button>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm">Medical Courses</h4>
                    <p className="text-xs text-muted-foreground mt-1">Auto-assign to Dr. Rajesh Kumar</p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        Disable
                      </Button>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Rule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Lead Sources</CardTitle>
                <CardDescription>Track where your leads are coming from</CardDescription>
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

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lead Automation</CardTitle>
              <CardDescription>Set up automated workflows for lead management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Welcome Email Sequence</h4>
                  <p className="text-sm text-muted-foreground mt-1">Automatically send welcome emails to new leads</p>
                  <div className="flex items-center justify-between mt-3">
                    <Badge variant="default">Active</Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        Pause
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Follow-up Reminders</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Send reminders to counselors for pending follow-ups
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <Badge variant="default">Active</Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        Pause
                      </Button>
                    </div>
                  </div>
                </div>
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Automation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

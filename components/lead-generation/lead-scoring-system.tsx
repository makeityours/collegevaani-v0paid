"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, Mail, Phone, Eye, Download, MessageSquare, Calendar, Target, BarChart3 } from "lucide-react"

interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  course: string
  source: string
  score: number
  status: "hot" | "warm" | "cold" | "converted"
  lastActivity: Date
  activities: Activity[]
  demographics: Demographics
  engagement: EngagementMetrics
}

interface Activity {
  type: "page_view" | "form_submit" | "email_open" | "email_click" | "download" | "call" | "meeting"
  timestamp: Date
  details: string
  score: number
}

interface Demographics {
  age?: number
  location?: string
  education?: string
  income?: string
}

interface EngagementMetrics {
  pageViews: number
  timeOnSite: number
  emailOpens: number
  emailClicks: number
  downloads: number
}

const scoringRules = {
  demographics: {
    age: { "18-22": 20, "23-25": 15, "26-30": 10, "30+": 5 },
    location: { tier1: 15, tier2: 10, tier3: 5 },
    education: { "12th": 20, graduate: 15, postgraduate: 10 },
  },
  engagement: {
    pageViews: { "1-3": 5, "4-10": 10, "11-20": 15, "20+": 20 },
    timeOnSite: { "0-2min": 2, "2-5min": 5, "5-10min": 10, "10min+": 15 },
    emailOpens: { "1-2": 5, "3-5": 10, "6-10": 15, "10+": 20 },
  },
  activities: {
    page_view: 2,
    form_submit: 15,
    email_open: 3,
    email_click: 8,
    download: 12,
    call: 25,
    meeting: 30,
  },
  source: {
    organic: 15,
    paid: 10,
    social: 8,
    referral: 20,
    direct: 12,
  },
}

export function LeadScoringSystem() {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "1",
      name: "Aryan Kumar",
      email: "aryan@example.com",
      phone: "+91 9876543210",
      course: "B.Tech Computer Science",
      source: "organic",
      score: 85,
      status: "hot",
      lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
      activities: [
        { type: "form_submit", timestamp: new Date(), details: "Downloaded college guide", score: 15 },
        { type: "page_view", timestamp: new Date(), details: "Viewed IIT Delhi page", score: 2 },
        { type: "email_open", timestamp: new Date(), details: "Opened welcome email", score: 3 },
      ],
      demographics: { age: 18, location: "tier1", education: "12th" },
      engagement: { pageViews: 15, timeOnSite: 450, emailOpens: 3, emailClicks: 2, downloads: 2 },
    },
    {
      id: "2",
      name: "Priya Sharma",
      email: "priya@example.com",
      course: "MBBS",
      source: "social",
      score: 72,
      status: "warm",
      lastActivity: new Date(Date.now() - 24 * 60 * 60 * 1000),
      activities: [
        { type: "page_view", timestamp: new Date(), details: "Viewed AIIMS page", score: 2 },
        { type: "download", timestamp: new Date(), details: "Downloaded NEET guide", score: 12 },
      ],
      demographics: { age: 19, location: "tier2", education: "12th" },
      engagement: { pageViews: 8, timeOnSite: 320, emailOpens: 2, emailClicks: 1, downloads: 1 },
    },
  ])

  const calculateLeadScore = (lead: Lead): number => {
    let score = 0

    // Demographics scoring
    if (lead.demographics.age) {
      const ageRange =
        lead.demographics.age <= 22
          ? "18-22"
          : lead.demographics.age <= 25
            ? "23-25"
            : lead.demographics.age <= 30
              ? "26-30"
              : "30+"
      score += scoringRules.demographics.age[ageRange] || 0
    }

    // Engagement scoring
    const pageViewScore =
      lead.engagement.pageViews >= 20
        ? 20
        : lead.engagement.pageViews >= 11
          ? 15
          : lead.engagement.pageViews >= 4
            ? 10
            : 5
    score += pageViewScore

    // Activity scoring
    lead.activities.forEach((activity) => {
      score += scoringRules.activities[activity.type] || 0
    })

    // Source scoring
    score += scoringRules.source[lead.source] || 0

    return Math.min(score, 100)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-red-600"
    if (score >= 60) return "text-orange-600"
    if (score >= 40) return "text-yellow-600"
    return "text-gray-600"
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      hot: "destructive",
      warm: "default",
      cold: "secondary",
      converted: "default",
    }
    return variants[status] || "secondary"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Lead Scoring Dashboard</h2>
          <p className="text-muted-foreground">AI-powered lead prioritization and scoring</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Leads
        </Button>
      </div>

      <Tabs defaultValue="leads" className="space-y-4">
        <TabsList>
          <TabsTrigger value="leads">Lead Scores</TabsTrigger>
          <TabsTrigger value="rules">Scoring Rules</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="leads" className="space-y-4">
          <div className="grid gap-4">
            {leads.map((lead) => (
              <Card key={lead.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {lead.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{lead.name}</h3>
                        <p className="text-sm text-muted-foreground">{lead.course}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getScoreColor(lead.score)}`}>{lead.score}</div>
                        <p className="text-xs text-muted-foreground">Lead Score</p>
                      </div>
                      <Badge variant={getStatusBadge(lead.status)}>{lead.status.toUpperCase()}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Score Breakdown */}
                    <div>
                      <h4 className="font-medium mb-2">Score Breakdown</h4>
                      <Progress value={lead.score} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Cold (0-40)</span>
                        <span>Warm (41-70)</span>
                        <span>Hot (71-100)</span>
                      </div>
                    </div>

                    {/* Engagement Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Eye className="h-4 w-4 text-blue-500" />
                        </div>
                        <div className="text-sm font-medium">{lead.engagement.pageViews}</div>
                        <div className="text-xs text-muted-foreground">Page Views</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Clock className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="text-sm font-medium">{Math.round(lead.engagement.timeOnSite / 60)}m</div>
                        <div className="text-xs text-muted-foreground">Time on Site</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Mail className="h-4 w-4 text-purple-500" />
                        </div>
                        <div className="text-sm font-medium">{lead.engagement.emailOpens}</div>
                        <div className="text-xs text-muted-foreground">Email Opens</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Download className="h-4 w-4 text-orange-500" />
                        </div>
                        <div className="text-sm font-medium">{lead.engagement.downloads}</div>
                        <div className="text-xs text-muted-foreground">Downloads</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Target className="h-4 w-4 text-red-500" />
                        </div>
                        <div className="text-sm font-medium">{lead.engagement.emailClicks}</div>
                        <div className="text-xs text-muted-foreground">Email Clicks</div>
                      </div>
                    </div>

                    {/* Recent Activities */}
                    <div>
                      <h4 className="font-medium mb-2">Recent Activities</h4>
                      <div className="space-y-2">
                        {lead.activities.slice(0, 3).map((activity, index) => (
                          <div key={index} className="flex items-center gap-3 text-sm">
                            <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                            <span className="flex-1">{activity.details}</span>
                            <span className="text-muted-foreground">+{activity.score} pts</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button size="sm">
                        <Phone className="mr-2 h-4 w-4" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="mr-2 h-4 w-4" />
                        Email
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scoring Rules Configuration</CardTitle>
              <CardDescription>Customize how leads are scored based on different criteria</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Activity Scoring</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(scoringRules.activities).map(([activity, score]) => (
                      <div key={activity} className="flex justify-between items-center p-2 border rounded">
                        <span className="capitalize">{activity.replace("_", " ")}</span>
                        <Badge variant="outline">+{score} pts</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Source Scoring</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(scoringRules.source).map(([source, score]) => (
                      <div key={source} className="flex justify-between items-center p-2 border rounded">
                        <span className="capitalize">{source}</span>
                        <Badge variant="outline">+{score} pts</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Score Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-muted/30 rounded-md">
                  <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Chart visualization</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conversion by Score Range</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Hot Leads (80-100)</span>
                    <div className="flex items-center gap-2">
                      <Progress value={85} className="w-20 h-2" />
                      <span className="text-sm">85%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Warm Leads (60-79)</span>
                    <div className="flex items-center gap-2">
                      <Progress value={45} className="w-20 h-2" />
                      <span className="text-sm">45%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Cold Leads (0-59)</span>
                    <div className="flex items-center gap-2">
                      <Progress value={12} className="w-20 h-2" />
                      <span className="text-sm">12%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, TrendingUp, Target, CheckCircle, AlertCircle, BarChart3 } from "lucide-react"

interface SEOMetrics {
  score: number
  title: string
  description: string
  keywords: string[]
  recommendations: string[]
}

export default function SEOOptimizationPanel() {
  const [seoData, setSeoData] = useState<SEOMetrics>({
    score: 75,
    title: "Best Engineering Colleges in India - B.Tech Admission 2024",
    description:
      "Find top engineering colleges in India. Compare fees, placement records, and admission process for B.Tech programs. Get expert guidance for admissions.",
    keywords: ["engineering colleges", "b.tech admission", "top colleges india", "engineering courses"],
    recommendations: [
      "Add more relevant keywords to meta description",
      "Optimize image alt tags",
      "Improve page loading speed",
      "Add structured data markup",
    ],
  })

  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SEO Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{seoData.score}/100</div>
            <Progress value={seoData.score} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organic Traffic</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Keywords Ranking</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-muted-foreground">in top 10 results</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Speed</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3s</div>
            <p className="text-xs text-muted-foreground">Average load time</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="meta-tags">Meta Tags</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>SEO Health Check</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { item: "Title Tag Optimization", status: "good", score: 85 },
                    { item: "Meta Description", status: "warning", score: 70 },
                    { item: "Header Tags (H1-H6)", status: "good", score: 90 },
                    { item: "Image Alt Tags", status: "error", score: 45 },
                    { item: "Internal Linking", status: "good", score: 80 },
                    { item: "Page Speed", status: "warning", score: 65 },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {item.status === "good" ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : item.status === "warning" ? (
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className="text-sm">{item.item}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={item.score} className="w-20 h-2" />
                        <span className="text-sm font-medium w-8">{item.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Pages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { page: "/courses/b-tech", traffic: "12,456", position: "3.2", ctr: "8.5%" },
                    { page: "/exams/jee-main", traffic: "8,923", position: "5.7", ctr: "6.2%" },
                    { page: "/colleges/iit-delhi", traffic: "7,654", position: "2.8", ctr: "12.1%" },
                  ].map((page, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium text-sm">{page.page}</span>
                        <Badge variant="outline">Pos: {page.position}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                        <span>Traffic: {page.traffic}</span>
                        <span>CTR: {page.ctr}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {seoData.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                    <span className="text-sm">{rec}</span>
                  </div>
                ))}
              </div>
              <Button className="mt-4">Generate SEO Report</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meta-tags" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Meta Tags Editor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Page Title</Label>
                <Input
                  id="meta-title"
                  value={seoData.title}
                  onChange={(e) => setSeoData({ ...seoData, title: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">{seoData.title.length}/60 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea
                  id="meta-description"
                  value={seoData.description}
                  onChange={(e) => setSeoData({ ...seoData, description: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">{seoData.description.length}/160 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-keywords">Focus Keywords</Label>
                <Input
                  id="meta-keywords"
                  value={seoData.keywords.join(", ")}
                  onChange={(e) => setSeoData({ ...seoData, keywords: e.target.value.split(", ") })}
                />
              </div>

              <Button>Save Meta Tags</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SERP Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="text-blue-600 text-lg font-medium cursor-pointer hover:underline">{seoData.title}</h3>
                <p className="text-green-600 text-sm">https://collegevaani.com/courses/b-tech</p>
                <p className="text-gray-600 text-sm">{seoData.description}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Keyword Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left p-2">Keyword</th>
                      <th className="text-left p-2">Position</th>
                      <th className="text-left p-2">Volume</th>
                      <th className="text-left p-2">Traffic</th>
                      <th className="text-left p-2">Difficulty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        keyword: "engineering colleges",
                        position: 3,
                        volume: "12,000",
                        traffic: "2,450",
                        difficulty: "High",
                      },
                      {
                        keyword: "b.tech admission",
                        position: 5,
                        volume: "8,500",
                        traffic: "1,200",
                        difficulty: "Medium",
                      },
                      {
                        keyword: "top colleges india",
                        position: 7,
                        volume: "15,000",
                        traffic: "1,800",
                        difficulty: "High",
                      },
                      {
                        keyword: "jee main preparation",
                        position: 2,
                        volume: "6,000",
                        traffic: "2,100",
                        difficulty: "Medium",
                      },
                    ].map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2 font-medium">{item.keyword}</td>
                        <td className="p-2">
                          <Badge
                            variant={item.position <= 3 ? "default" : item.position <= 10 ? "secondary" : "outline"}
                          >
                            #{item.position}
                          </Badge>
                        </td>
                        <td className="p-2">{item.volume}</td>
                        <td className="p-2">{item.traffic}</td>
                        <td className="p-2">
                          <Badge variant={item.difficulty === "High" ? "destructive" : "outline"}>
                            {item.difficulty}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Core Web Vitals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { metric: "Largest Contentful Paint", value: "2.1s", status: "good", target: "< 2.5s" },
                    { metric: "First Input Delay", value: "45ms", status: "good", target: "< 100ms" },
                    { metric: "Cumulative Layout Shift", value: "0.08", status: "warning", target: "< 0.1" },
                  ].map((metric, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{metric.metric}</p>
                        <p className="text-xs text-muted-foreground">Target: {metric.target}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{metric.value}</p>
                        <Badge variant={metric.status === "good" ? "default" : "secondary"}>{metric.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mobile Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { item: "Mobile-Friendly Test", status: "Passed", score: 100 },
                    { item: "Viewport Configuration", status: "Passed", score: 100 },
                    { item: "Touch Elements", status: "Warning", score: 85 },
                    { item: "Font Size", status: "Passed", score: 95 },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{item.item}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant={item.status === "Passed" ? "default" : "secondary"}>{item.status}</Badge>
                        <span className="text-sm font-medium">{item.score}%</span>
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

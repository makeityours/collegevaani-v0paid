"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { Search, TrendingUp, Globe, Zap, CheckCircle, AlertCircle, XCircle } from "lucide-react"

interface SEOMetrics {
  pageSpeed: number
  seoScore: number
  accessibility: number
  bestPractices: number
}

export default function SEOOptimization() {
  const [seoMetrics, setSeoMetrics] = useState<SEOMetrics>({
    pageSpeed: 85,
    seoScore: 92,
    accessibility: 88,
    bestPractices: 90,
  })

  const [metaData, setMetaData] = useState({
    title: "CollegeVaani - Find Your Perfect College",
    description:
      "Discover the best colleges and courses in India. Get personalized recommendations, compare colleges, and make informed decisions about your education.",
    keywords: "colleges, education, courses, admissions, India",
    canonicalUrl: "https://collegevaani.com",
  })

  const seoChecklist = [
    { item: "Meta titles optimized", status: "completed", score: 100 },
    { item: "Meta descriptions present", status: "completed", score: 100 },
    { item: "Header tags structured", status: "completed", score: 95 },
    { item: "Image alt texts", status: "warning", score: 80 },
    { item: "Internal linking", status: "completed", score: 90 },
    { item: "Mobile responsiveness", status: "completed", score: 100 },
    { item: "Page load speed", status: "warning", score: 85 },
    { item: "SSL certificate", status: "completed", score: 100 },
    { item: "XML sitemap", status: "completed", score: 100 },
    { item: "Robots.txt", status: "completed", score: 100 },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const updateMetaData = () => {
    toast({
      title: "SEO Settings Updated",
      description: "Meta data has been updated successfully.",
    })
  }

  const runSEOAudit = () => {
    toast({
      title: "SEO Audit Started",
      description: "Running comprehensive SEO audit. Results will be available in a few minutes.",
    })
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">SEO Optimization</h1>
          <p className="text-gray-600">Monitor and improve your search engine performance</p>
        </div>
        <Button onClick={runSEOAudit}>
          <Search className="h-4 w-4 mr-2" />
          Run SEO Audit
        </Button>
      </div>

      {/* SEO Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Page Speed</span>
              <Zap className="h-4 w-4 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold">{seoMetrics.pageSpeed}</div>
            <Progress value={seoMetrics.pageSpeed} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">SEO Score</span>
              <Search className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold">{seoMetrics.seoScore}</div>
            <Progress value={seoMetrics.seoScore} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Accessibility</span>
              <Globe className="h-4 w-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold">{seoMetrics.accessibility}</div>
            <Progress value={seoMetrics.accessibility} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Best Practices</span>
              <TrendingUp className="h-4 w-4 text-purple-500" />
            </div>
            <div className="text-2xl font-bold">{seoMetrics.bestPractices}</div>
            <Progress value={seoMetrics.bestPractices} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="checklist" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="checklist">SEO Checklist</TabsTrigger>
          <TabsTrigger value="metadata">Meta Data</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="checklist" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SEO Checklist</CardTitle>
              <CardDescription>Track your SEO optimization progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {seoChecklist.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(item.status)}
                      <span className="font-medium">{item.item}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={item.score >= 90 ? "default" : item.score >= 70 ? "secondary" : "destructive"}>
                        {item.score}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metadata" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Meta Data Management</CardTitle>
              <CardDescription>Update your page meta information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input
                  id="meta-title"
                  value={metaData.title}
                  onChange={(e) => setMetaData({ ...metaData, title: e.target.value })}
                  maxLength={60}
                />
                <div className="text-sm text-gray-500 mt-1">{metaData.title.length}/60 characters</div>
              </div>

              <div>
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea
                  id="meta-description"
                  value={metaData.description}
                  onChange={(e) => setMetaData({ ...metaData, description: e.target.value })}
                  maxLength={160}
                  rows={3}
                />
                <div className="text-sm text-gray-500 mt-1">{metaData.description.length}/160 characters</div>
              </div>

              <div>
                <Label htmlFor="meta-keywords">Keywords</Label>
                <Input
                  id="meta-keywords"
                  value={metaData.keywords}
                  onChange={(e) => setMetaData({ ...metaData, keywords: e.target.value })}
                  placeholder="Separate keywords with commas"
                />
              </div>

              <div>
                <Label htmlFor="canonical-url">Canonical URL</Label>
                <Input
                  id="canonical-url"
                  value={metaData.canonicalUrl}
                  onChange={(e) => setMetaData({ ...metaData, canonicalUrl: e.target.value })}
                />
              </div>

              <Button onClick={updateMetaData} className="w-full">
                Update Meta Data
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Keyword Analysis</CardTitle>
              <CardDescription>Monitor your keyword rankings and opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { keyword: "engineering colleges", position: 3, volume: 12000, difficulty: "Medium" },
                  { keyword: "medical colleges India", position: 7, volume: 8500, difficulty: "High" },
                  { keyword: "MBA colleges", position: 5, volume: 15000, difficulty: "High" },
                  { keyword: "college admission", position: 12, volume: 20000, difficulty: "High" },
                  { keyword: "best colleges India", position: 8, volume: 18000, difficulty: "Very High" },
                ].map((keyword, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{keyword.keyword}</div>
                      <div className="text-sm text-gray-600">
                        Volume: {keyword.volume.toLocaleString()} • Difficulty: {keyword.difficulty}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge
                        variant={
                          keyword.position <= 3 ? "default" : keyword.position <= 10 ? "secondary" : "destructive"
                        }
                      >
                        Position {keyword.position}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Core Web Vitals and performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">1.2s</div>
                  <div className="text-sm text-gray-600">Largest Contentful Paint</div>
                  <Badge variant="default" className="mt-2">
                    Good
                  </Badge>
                </div>

                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">85ms</div>
                  <div className="text-sm text-gray-600">First Input Delay</div>
                  <Badge variant="secondary" className="mt-2">
                    Needs Improvement
                  </Badge>
                </div>

                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">0.05</div>
                  <div className="text-sm text-gray-600">Cumulative Layout Shift</div>
                  <Badge variant="default" className="mt-2">
                    Good
                  </Badge>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h4 className="font-medium">Performance Recommendations</h4>
                <div className="space-y-2">
                  {[
                    "Optimize images for better loading speed",
                    "Minimize JavaScript bundle size",
                    "Enable browser caching",
                    "Use CDN for static assets",
                    "Implement lazy loading for images",
                  ].map((recommendation, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                      <TrendingUp className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{recommendation}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

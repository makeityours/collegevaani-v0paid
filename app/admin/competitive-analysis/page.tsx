"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, AlertTriangle, TrendingUp, DollarSign, Star, Target, BarChart3, Zap } from "lucide-react"

export default function CompetitiveAnalysisPage() {
  const [selectedCompetitor, setSelectedCompetitor] = useState("collegedunia")

  const competitorData = {
    collegedunia: {
      name: "CollegeDunia",
      url: "collegedunia.com",
      monthlyVisitors: "2.5M",
      marketShare: "35%",
      strengths: [
        "Strong SEO presence",
        "Comprehensive college database",
        "Active community forums",
        "Mobile app with good ratings",
        "Established brand recognition",
      ],
      weaknesses: [
        "Outdated UI/UX design",
        "Limited personalization",
        "Slow page load times",
        "Basic comparison tools",
        "Limited premium features",
      ],
      features: {
        freemiumPlans: true,
        premiumCourses: true,
        universityPartnership: true,
        affiliateProgram: true,
        adsManagement: true,
        leadSelling: true,
        marketplace: false,
        subscriptions: true,
      },
    },
    collegedekho: {
      name: "CollegeDekho",
      url: "collegedekho.com",
      monthlyVisitors: "1.8M",
      marketShare: "28%",
      strengths: [
        "Modern UI/UX design",
        "Strong mobile presence",
        "Good conversion rates",
        "Effective lead generation",
        "Regional language support",
      ],
      weaknesses: [
        "Limited course variety",
        "Weaker SEO performance",
        "Less comprehensive data",
        "Higher bounce rates",
        "Limited international content",
      ],
      features: {
        freemiumPlans: true,
        premiumCourses: true,
        universityPartnership: true,
        affiliateProgram: false,
        adsManagement: true,
        leadSelling: true,
        marketplace: true,
        subscriptions: true,
      },
    },
    shiksha: {
      name: "Shiksha",
      url: "shiksha.com",
      monthlyVisitors: "3.2M",
      marketShare: "42%",
      strengths: [
        "Largest market share",
        "Comprehensive content",
        "Strong brand trust",
        "Excellent SEO",
        "Wide course coverage",
      ],
      weaknesses: [
        "Complex navigation",
        "Overwhelming interface",
        "Slow innovation",
        "Limited personalization",
        "Outdated technology stack",
      ],
      features: {
        freemiumPlans: true,
        premiumCourses: true,
        universityPartnership: true,
        affiliateProgram: true,
        adsManagement: true,
        leadSelling: true,
        marketplace: true,
        subscriptions: true,
      },
    },
  }

  const collegeVaaniFeatures = {
    freemiumPlans: true,
    premiumCourses: true,
    universityPartnership: true,
    affiliateProgram: true,
    adsManagement: true,
    leadSelling: true,
    marketplace: true,
    subscriptions: true,
  }

  const uxImprovements = [
    {
      category: "Navigation & Search",
      priority: "High",
      improvements: [
        "Implement AI-powered search with natural language processing",
        "Add voice search functionality",
        "Create smart filters with predictive suggestions",
        "Implement breadcrumb navigation",
        "Add quick action buttons for common tasks",
      ],
    },
    {
      category: "Personalization",
      priority: "High",
      improvements: [
        "Develop AI-based recommendation engine",
        "Create personalized dashboards",
        "Implement learning path suggestions",
        "Add bookmark and favorites system",
        "Create custom notification preferences",
      ],
    },
    {
      category: "Mobile Experience",
      priority: "Medium",
      improvements: [
        "Optimize for mobile-first design",
        "Implement progressive web app (PWA)",
        "Add offline functionality",
        "Optimize touch interactions",
        "Implement swipe gestures",
      ],
    },
    {
      category: "Performance",
      priority: "High",
      improvements: [
        "Implement lazy loading for images",
        "Optimize bundle size and code splitting",
        "Add service worker for caching",
        "Implement CDN for static assets",
        "Optimize database queries",
      ],
    },
  ]

  const monetizationOpportunities = [
    {
      feature: "Premium Analytics Dashboard",
      revenue: "₹50L/year",
      implementation: "Medium",
      description: "Advanced analytics for colleges and counselors",
    },
    {
      feature: "White-label Solutions",
      revenue: "₹1Cr/year",
      implementation: "High",
      description: "Custom branded platforms for institutions",
    },
    {
      feature: "API Marketplace",
      revenue: "₹25L/year",
      implementation: "Medium",
      description: "Paid API access for third-party developers",
    },
    {
      feature: "Virtual Campus Tours",
      revenue: "₹75L/year",
      implementation: "High",
      description: "360° virtual reality campus experiences",
    },
  ]

  const currentCompetitor = competitorData[selectedCompetitor as keyof typeof competitorData]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Competitive Analysis Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive analysis of CollegeVaani vs major competitors</p>
        </div>
        <Button>
          <BarChart3 className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Market Position</p>
                <p className="text-2xl font-bold">#4</p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Feature Parity</p>
                <p className="text-2xl font-bold">95%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue Potential</p>
                <p className="text-2xl font-bold">₹5Cr</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Growth Rate</p>
                <p className="text-2xl font-bold">+45%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="features" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="features">Feature Comparison</TabsTrigger>
          <TabsTrigger value="competitors">Competitor Analysis</TabsTrigger>
          <TabsTrigger value="ux">UX Improvements</TabsTrigger>
          <TabsTrigger value="monetization">Monetization</TabsTrigger>
          <TabsTrigger value="roadmap">Strategic Roadmap</TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monetization Features Implementation Status</CardTitle>
              <CardDescription>Comparison of key revenue-generating features across platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Freemium User Plans", key: "freemiumPlans" },
                  { name: "Premium Courses & Workshops", key: "premiumCourses" },
                  { name: "University Partnership Portal", key: "universityPartnership" },
                  { name: "Affiliate Panel", key: "affiliateProgram" },
                  { name: "Ads Management Module", key: "adsManagement" },
                  { name: "Lead Selling to Colleges", key: "leadSelling" },
                  { name: "Educational Resources Marketplace", key: "marketplace" },
                  { name: "Subscription Module", key: "subscriptions" },
                ].map((feature) => (
                  <div key={feature.key} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">{feature.name}</h3>
                      <Badge variant="default" className="bg-green-500">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Implemented
                      </Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">CollegeVaani</p>
                        <div className="mt-1">
                          {collegeVaaniFeatures[feature.key as keyof typeof collegeVaaniFeatures] ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                          )}
                        </div>
                      </div>
                      {Object.entries(competitorData).map(([key, competitor]) => (
                        <div key={key} className="text-center">
                          <p className="text-sm text-muted-foreground">{competitor.name}</p>
                          <div className="mt-1">
                            {competitor.features[feature.key as keyof typeof competitor.features] ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Implementation Recommendations</CardTitle>
              <CardDescription>Priority actions to enhance competitive advantage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4 border-green-200 bg-green-50">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h3 className="font-medium text-green-800">Completed Features</h3>
                  </div>
                  <p className="text-sm text-green-700">
                    All 8 core monetization features have been successfully implemented with Razorpay integration,
                    comprehensive admin panels, and user-friendly interfaces.
                  </p>
                </div>

                <div className="border rounded-lg p-4 border-blue-200 bg-blue-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium text-blue-800">Competitive Advantages</h3>
                  </div>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Modern React/Next.js architecture vs competitors' legacy systems</li>
                    <li>• Integrated payment gateway with seamless UX</li>
                    <li>• Comprehensive affiliate tracking system</li>
                    <li>• Advanced analytics and reporting capabilities</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competitors" className="space-y-6">
          <div className="flex gap-2 mb-4">
            {Object.entries(competitorData).map(([key, competitor]) => (
              <Button
                key={key}
                variant={selectedCompetitor === key ? "default" : "outline"}
                onClick={() => setSelectedCompetitor(key)}
              >
                {competitor.name}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <img
                    src={`/placeholder-icon.png?height=24&width=24&text=${currentCompetitor.name[0]}`}
                    alt={currentCompetitor.name}
                    className="h-6 w-6 rounded"
                  />
                  {currentCompetitor.name}
                </CardTitle>
                <CardDescription>{currentCompetitor.url}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Visitors</p>
                      <p className="text-2xl font-bold">{currentCompetitor.monthlyVisitors}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Market Share</p>
                      <p className="text-2xl font-bold">{currentCompetitor.marketShare}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-green-600 mb-2">Strengths</h4>
                    <ul className="space-y-1">
                      {currentCompetitor.strengths.map((strength, index) => (
                        <li key={index} className="text-sm flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-red-600 mb-2">Weaknesses</h4>
                    <ul className="space-y-1">
                      {currentCompetitor.weaknesses.map((weakness, index) => (
                        <li key={index} className="text-sm flex items-center gap-2">
                          <XCircle className="h-3 w-3 text-red-500" />
                          {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Positioning Analysis</CardTitle>
                <CardDescription>How CollegeVaani compares in the market</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Feature Completeness</span>
                      <span className="text-sm font-medium">95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">User Experience</span>
                      <span className="text-sm font-medium">88%</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Technology Stack</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Monetization Features</span>
                      <span className="text-sm font-medium">100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>

                  <div className="border rounded-lg p-3 bg-green-50">
                    <h4 className="font-medium text-green-800 mb-1">Competitive Edge</h4>
                    <p className="text-sm text-green-700">
                      CollegeVaani now matches or exceeds competitor features with modern architecture and superior
                      monetization capabilities.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ux" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>UX Improvement Roadmap</CardTitle>
              <CardDescription>
                Strategic improvements to enhance user experience and competitive positioning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {uxImprovements.map((category, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">{category.category}</h3>
                      <Badge
                        variant={
                          category.priority === "High"
                            ? "destructive"
                            : category.priority === "Medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {category.priority} Priority
                      </Badge>
                    </div>
                    <ul className="space-y-2">
                      {category.improvements.map((improvement, improvementIndex) => (
                        <li key={improvementIndex} className="text-sm flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monetization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Additional Monetization Opportunities</CardTitle>
              <CardDescription>New revenue streams to explore beyond current implementations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monetizationOpportunities.map((opportunity, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{opportunity.feature}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{opportunity.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">{opportunity.revenue}</p>
                        <Badge
                          variant={
                            opportunity.implementation === "High"
                              ? "destructive"
                              : opportunity.implementation === "Medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {opportunity.implementation} Effort
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Projection</CardTitle>
              <CardDescription>Estimated revenue potential with full implementation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-2xl font-bold text-green-600">₹2.5Cr</p>
                  <p className="text-sm text-muted-foreground">Year 1 Target</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">₹5Cr</p>
                  <p className="text-sm text-muted-foreground">Year 2 Target</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">₹10Cr</p>
                  <p className="text-sm text-muted-foreground">Year 3 Target</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Strategic Implementation Roadmap</CardTitle>
              <CardDescription>Phased approach to market leadership</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg p-4 border-green-200 bg-green-50">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h3 className="font-medium text-green-800">Phase 1: Foundation (Completed)</h3>
                  </div>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>✅ Implement all 8 core monetization features</li>
                    <li>✅ Integrate Razorpay payment gateway</li>
                    <li>✅ Build comprehensive admin panels</li>
                    <li>✅ Create user-friendly interfaces</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4 border-blue-200 bg-blue-50">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium text-blue-800">Phase 2: Enhancement (Next 3 months)</h3>
                  </div>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>🔄 Implement AI-powered recommendations</li>
                    <li>🔄 Add advanced analytics dashboard</li>
                    <li>🔄 Optimize mobile experience</li>
                    <li>🔄 Launch marketing campaigns</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4 border-purple-200 bg-purple-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-purple-600" />
                    <h3 className="font-medium text-purple-800">Phase 3: Market Leadership (6-12 months)</h3>
                  </div>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>🎯 Launch white-label solutions</li>
                    <li>🎯 Implement virtual campus tours</li>
                    <li>🎯 Expand to international markets</li>
                    <li>🎯 Build API marketplace</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

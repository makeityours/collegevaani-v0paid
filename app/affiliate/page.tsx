"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Copy, Share2, TrendingUp, Users, DollarSign, Gift, BarChart3, Download, Eye } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function AffiliatePage() {
  const [referralCode, setReferralCode] = useState("COLLEGE2024")
  const [affiliateStats, setAffiliateStats] = useState({
    totalReferrals: 45,
    successfulConversions: 28,
    totalEarnings: 14500,
    pendingPayouts: 3200,
    thisMonthEarnings: 4800,
    conversionRate: 62.2,
  })

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode)
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    })
  }

  const copyReferralLink = () => {
    const link = `https://collegevaani.com?ref=${referralCode}`
    navigator.clipboard.writeText(link)
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    })
  }

  const commissionTiers = [
    { tier: "Bronze", referrals: "0-10", commission: "10%", color: "bg-orange-100 text-orange-700" },
    { tier: "Silver", referrals: "11-25", commission: "15%", color: "bg-gray-100 text-gray-700" },
    { tier: "Gold", referrals: "26-50", commission: "20%", color: "bg-yellow-100 text-yellow-700" },
    { tier: "Platinum", referrals: "51+", commission: "25%", color: "bg-purple-100 text-purple-700" },
  ]

  const recentReferrals = [
    { name: "Rahul Kumar", plan: "Premium", status: "Converted", earnings: "₹500", date: "2024-01-15" },
    { name: "Priya Sharma", plan: "Pro", status: "Pending", earnings: "₹750", date: "2024-01-14" },
    { name: "Amit Singh", plan: "Premium", status: "Converted", earnings: "₹500", date: "2024-01-13" },
    { name: "Neha Gupta", plan: "Enterprise", status: "Converted", earnings: "₹1250", date: "2024-01-12" },
  ]

  const marketingMaterials = [
    { type: "Banner", size: "728x90", format: "PNG", downloads: 245 },
    { type: "Square Banner", size: "300x300", format: "PNG", downloads: 189 },
    { type: "Social Media Kit", size: "Various", format: "ZIP", downloads: 156 },
    { type: "Email Template", size: "HTML", format: "HTML", downloads: 98 },
  ]

  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Affiliate Dashboard</h1>
        <p className="text-xl text-muted-foreground">
          Earn money by referring students to CollegeVaani and help them find their dream colleges
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Referrals</p>
                <p className="text-2xl font-bold">{affiliateStats.totalReferrals}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversions</p>
                <p className="text-2xl font-bold">{affiliateStats.successfulConversions}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-2xl font-bold">₹{affiliateStats.totalEarnings.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold">{affiliateStats.conversionRate}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Referral Code Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Your Referral Code
                </CardTitle>
                <CardDescription>Share this code with friends and earn commissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Input value={referralCode} readOnly className="font-mono text-lg" />
                  <Button onClick={copyReferralCode} variant="outline" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Referral Link:</p>
                  <div className="flex items-center gap-2">
                    <Input value={`https://collegevaani.com?ref=${referralCode}`} readOnly className="text-sm" />
                    <Button onClick={copyReferralLink} variant="outline" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share on Social
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Get QR Code
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Commission Tiers */}
            <Card>
              <CardHeader>
                <CardTitle>Commission Tiers</CardTitle>
                <CardDescription>Higher referrals = Higher commission rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {commissionTiers.map((tier, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Badge className={tier.color}>{tier.tier}</Badge>
                        <div>
                          <p className="font-medium">{tier.referrals} referrals</p>
                          <p className="text-sm text-muted-foreground">{tier.commission} commission</p>
                        </div>
                      </div>
                      {affiliateStats.totalReferrals >= Number.parseInt(tier.referrals.split("-")[0]) && (
                        <Badge variant="default">Current</Badge>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress to Gold Tier</span>
                    <span>{affiliateStats.totalReferrals}/26</span>
                  </div>
                  <Progress value={(affiliateStats.totalReferrals / 26) * 100} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Referrals</CardTitle>
              <CardDescription>Your latest referral activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReferrals.map((referral, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{referral.name}</p>
                        <p className="text-sm text-muted-foreground">{referral.plan} Plan</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{referral.earnings}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant={referral.status === "Converted" ? "default" : "secondary"} className="text-xs">
                          {referral.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{referral.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referrals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Referral Analytics</CardTitle>
              <CardDescription>Track your referral performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-md">
                <BarChart3 className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Referral analytics chart</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>All Referrals</CardTitle>
              <CardDescription>Complete list of your referrals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentReferrals
                  .concat([
                    {
                      name: "Vikash Yadav",
                      plan: "Premium",
                      status: "Converted",
                      earnings: "₹500",
                      date: "2024-01-11",
                    },
                    { name: "Ananya Patel", plan: "Pro", status: "Pending", earnings: "₹750", date: "2024-01-10" },
                  ])
                  .map((referral, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{referral.name}</p>
                          <p className="text-xs text-muted-foreground">{referral.plan} Plan</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">{referral.earnings}</p>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={referral.status === "Converted" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {referral.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{referral.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="earnings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600">₹{affiliateStats.thisMonthEarnings}</div>
                <div className="text-sm text-muted-foreground">This Month</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-blue-600">₹{affiliateStats.pendingPayouts}</div>
                <div className="text-sm text-muted-foreground">Pending Payout</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-purple-600">₹{affiliateStats.totalEarnings}</div>
                <div className="text-sm text-muted-foreground">Total Earned</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Payout History</CardTitle>
              <CardDescription>Your commission payment history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { amount: "₹2,500", date: "2024-01-01", status: "Paid", method: "Bank Transfer" },
                  { amount: "₹1,800", date: "2023-12-01", status: "Paid", method: "UPI" },
                  { amount: "₹3,200", date: "2023-11-01", status: "Paid", method: "Bank Transfer" },
                ].map((payout, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{payout.amount}</p>
                      <p className="text-sm text-muted-foreground">{payout.date}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="default">{payout.status}</Badge>
                      <p className="text-sm text-muted-foreground mt-1">{payout.method}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Marketing Materials</CardTitle>
              <CardDescription>Download banners, images, and templates to promote CollegeVaani</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {marketingMaterials.map((material, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{material.type}</h3>
                      <p className="text-sm text-muted-foreground">
                        {material.size} • {material.format}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Download className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{material.downloads} downloads</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Promotional Content</CardTitle>
              <CardDescription>Ready-to-use content for your marketing campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Social Media Post</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    "🎓 Looking for the perfect college? CollegeVaani helps you find and compare top colleges across
                    India! Get personalized recommendations, expert guidance, and much more. Use my referral code:{" "}
                    {referralCode}
                    and get started today! #CollegeSearch #Education #India"
                  </p>
                  <Button size="sm" onClick={() => navigator.clipboard.writeText("Social media content")}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Text
                  </Button>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Email Template</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    "Hi [Name], I wanted to share an amazing platform that helped me with my college search -
                    CollegeVaani! They have comprehensive information about colleges, courses, and even provide expert
                    counseling. You can use my referral code {referralCode} to get started. Check it out!"
                  </p>
                  <Button size="sm" onClick={() => navigator.clipboard.writeText("Email template content")}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payout Settings</CardTitle>
              <CardDescription>Configure how you want to receive your commissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Minimum Payout Amount</label>
                <Input value="₹1,000" readOnly className="mt-1" />
                <p className="text-xs text-muted-foreground mt-1">Minimum amount required before payout is processed</p>
              </div>

              <div>
                <label className="text-sm font-medium">Payout Method</label>
                <select className="w-full mt-1 p-2 border rounded-md">
                  <option>Bank Transfer</option>
                  <option>UPI</option>
                  <option>PayPal</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Bank Account Details</label>
                <div className="space-y-2 mt-1">
                  <Input placeholder="Account Number" />
                  <Input placeholder="IFSC Code" />
                  <Input placeholder="Account Holder Name" />
                </div>
              </div>

              <Button>Update Payout Settings</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified about your referrals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Get notified when someone uses your referral code</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive SMS for successful conversions</p>
                </div>
                <input type="checkbox" className="rounded" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Weekly Reports</p>
                  <p className="text-sm text-muted-foreground">Get weekly summary of your affiliate performance</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>

              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

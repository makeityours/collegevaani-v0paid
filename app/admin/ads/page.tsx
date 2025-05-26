"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { Plus, Edit, Trash2, Eye, BarChart3, Target, DollarSign, MousePointer, Building } from "lucide-react"

export default function AdsManagementPage() {
  const [activeTab, setActiveTab] = useState("campaigns")

  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: "Engineering Colleges Promotion",
      type: "Banner",
      status: "Active",
      budget: 50000,
      spent: 32000,
      impressions: 125000,
      clicks: 2500,
      conversions: 45,
      startDate: "2024-01-01",
      endDate: "2024-02-01",
      targetAudience: "Engineering Students",
    },
    {
      id: 2,
      name: "Medical College Awareness",
      type: "Native",
      status: "Paused",
      budget: 30000,
      spent: 18000,
      impressions: 89000,
      clicks: 1800,
      conversions: 28,
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      targetAudience: "Medical Students",
    },
  ])

  const adPlacements = [
    { id: 1, name: "Homepage Hero Banner", size: "1200x400", price: "₹500/day", status: "Available" },
    { id: 2, name: "College Listing Sidebar", size: "300x600", price: "₹300/day", status: "Occupied" },
    { id: 3, name: "Course Page Header", size: "728x90", price: "₹200/day", status: "Available" },
    { id: 4, name: "Search Results Top", size: "320x100", price: "₹150/day", status: "Available" },
    { id: 5, name: "Footer Banner", size: "970x250", price: "₹100/day", status: "Occupied" },
  ]

  const advertisers = [
    {
      id: 1,
      name: "IIT Delhi",
      email: "marketing@iitd.ac.in",
      totalSpent: 125000,
      activeCampaigns: 3,
      status: "Premium",
      joinDate: "2023-06-15",
    },
    {
      id: 2,
      name: "BITS Pilani",
      email: "admissions@bits-pilani.ac.in",
      totalSpent: 89000,
      activeCampaigns: 2,
      status: "Standard",
      joinDate: "2023-08-20",
    },
  ]

  const handleCreateCampaign = () => {
    toast({
      title: "Campaign Created",
      description: "New advertising campaign has been created successfully.",
    })
  }

  const handlePauseCampaign = (id: number) => {
    setCampaigns(
      campaigns.map((campaign) =>
        campaign.id === id ? { ...campaign, status: campaign.status === "Active" ? "Paused" : "Active" } : campaign,
      ),
    )
    toast({
      title: "Campaign Updated",
      description: "Campaign status has been updated.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Ads Management</h1>
          <p className="text-muted-foreground">Manage advertising campaigns and revenue</p>
        </div>
        <Button onClick={handleCreateCampaign}>
          <Plus className="h-4 w-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">₹2.4L</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Campaigns</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Impressions</p>
                <p className="text-2xl font-bold">1.2M</p>
              </div>
              <Eye className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Click Rate</p>
                <p className="text-2xl font-bold">2.8%</p>
              </div>
              <MousePointer className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="placements">Ad Placements</TabsTrigger>
          <TabsTrigger value="advertisers">Advertisers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Campaigns</CardTitle>
              <CardDescription>Manage all advertising campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{campaign.name}</h3>
                        <p className="text-sm text-muted-foreground">{campaign.targetAudience}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={campaign.status === "Active" ? "default" : "secondary"}>
                          {campaign.status}
                        </Badge>
                        <Badge variant="outline">{campaign.type}</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Budget</p>
                        <p className="font-medium">₹{campaign.budget.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Spent</p>
                        <p className="font-medium">₹{campaign.spent.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Impressions</p>
                        <p className="font-medium">{campaign.impressions.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Clicks</p>
                        <p className="font-medium">{campaign.clicks.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Conversions</p>
                        <p className="font-medium">{campaign.conversions}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {campaign.startDate} - {campaign.endDate}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handlePauseCampaign(campaign.id)}>
                          {campaign.status === "Active" ? "Pause" : "Resume"}
                        </Button>
                        <Button variant="outline" size="sm">
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

        <TabsContent value="placements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ad Placement Inventory</CardTitle>
              <CardDescription>Manage available advertising spaces on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {adPlacements.map((placement) => (
                  <Card key={placement.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-medium">{placement.name}</h3>
                        <Badge variant={placement.status === "Available" ? "default" : "secondary"}>
                          {placement.status}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Size:</span>
                          <span>{placement.size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Price:</span>
                          <span className="font-medium">{placement.price}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" className="flex-1">
                          {placement.status === "Available" ? "Book Now" : "View Details"}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Create New Placement</CardTitle>
              <CardDescription>Add a new advertising space</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="placement-name">Placement Name</Label>
                  <Input id="placement-name" placeholder="e.g., Homepage Banner" />
                </div>
                <div>
                  <Label htmlFor="placement-size">Size</Label>
                  <Input id="placement-size" placeholder="e.g., 1200x400" />
                </div>
                <div>
                  <Label htmlFor="placement-price">Price per Day</Label>
                  <Input id="placement-price" placeholder="e.g., ₹500" />
                </div>
                <div>
                  <Label htmlFor="placement-location">Page Location</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select page" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="homepage">Homepage</SelectItem>
                      <SelectItem value="colleges">College Listing</SelectItem>
                      <SelectItem value="courses">Course Pages</SelectItem>
                      <SelectItem value="search">Search Results</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="placement-description">Description</Label>
                <Textarea id="placement-description" placeholder="Describe the placement location and visibility" />
              </div>
              <Button className="mt-4">Create Placement</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advertisers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advertiser Accounts</CardTitle>
              <CardDescription>Manage advertiser relationships and accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {advertisers.map((advertiser) => (
                  <div key={advertiser.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Building className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{advertiser.name}</h3>
                        <p className="text-sm text-muted-foreground">{advertiser.email}</p>
                        <p className="text-xs text-muted-foreground">
                          Member since {new Date(advertiser.joinDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="text-center">
                          <p className="text-sm font-medium">₹{advertiser.totalSpent.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Total Spent</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">{advertiser.activeCampaigns}</p>
                          <p className="text-xs text-muted-foreground">Active Campaigns</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={advertiser.status === "Premium" ? "default" : "secondary"}>
                          {advertiser.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>Monthly advertising revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-md">
                  <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Revenue chart</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Campaign performance overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Average CTR</span>
                    <span className="font-medium">2.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Conversion Rate</span>
                    <span className="font-medium">1.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average CPC</span>
                    <span className="font-medium">₹12.50</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Revenue per Click</span>
                    <span className="font-medium">₹22.30</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Placements</CardTitle>
              <CardDescription>Best performing ad placements by revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Homepage Hero Banner", revenue: "₹45,000", ctr: "3.2%" },
                  { name: "College Listing Sidebar", revenue: "₹32,000", ctr: "2.8%" },
                  { name: "Course Page Header", revenue: "₹28,000", ctr: "2.5%" },
                  { name: "Search Results Top", revenue: "₹18,000", ctr: "2.1%" },
                ].map((placement, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{placement.name}</p>
                      <p className="text-sm text-muted-foreground">CTR: {placement.ctr}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{placement.revenue}</p>
                      <p className="text-sm text-muted-foreground">This month</p>
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

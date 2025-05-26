"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { Plus, Edit, Trash2, Eye, EyeOff, BarChart3, Settings, Target, TrendingUp, DollarSign } from "lucide-react"

interface AdCampaign {
  id: string
  title: string
  description: string
  type: "banner" | "sidebar" | "inline" | "popup"
  placement: string
  ctaText: string
  ctaLink: string
  imageUrl?: string
  isActive: boolean
  impressions: number
  clicks: number
  revenue: number
  startDate: string
  endDate: string
}

export default function AdsManagement() {
  const [campaigns, setCampaigns] = useState<AdCampaign[]>([
    {
      id: "1",
      title: "Premium College Guide",
      description: "Get exclusive insights into top colleges",
      type: "sidebar",
      placement: "homepage-sidebar",
      ctaText: "Download Free",
      ctaLink: "/marketplace",
      imageUrl: "/placeholder.svg?height=200&width=300&text=College+Guide",
      isActive: true,
      impressions: 15420,
      clicks: 892,
      revenue: 2340,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
    },
    {
      id: "2",
      title: "Boost Your Applications",
      description: "Expert guidance from certified counselors",
      type: "banner",
      placement: "homepage-top",
      ctaText: "Book Session",
      ctaLink: "/lead-generation",
      isActive: true,
      impressions: 28750,
      clicks: 1456,
      revenue: 4580,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
    },
  ])

  const [adSettings, setAdSettings] = useState({
    bannerAds: { enabled: true, frequency: 3 },
    sidebarAds: { enabled: true, frequency: 1 },
    inlineAds: { enabled: true, frequency: 5 },
    popupAds: { enabled: false, frequency: 1 },
  })

  const [newCampaign, setNewCampaign] = useState({
    title: "",
    description: "",
    type: "banner" as const,
    placement: "",
    ctaText: "",
    ctaLink: "",
    imageUrl: "",
    startDate: "",
    endDate: "",
  })

  const handleCreateCampaign = async () => {
    try {
      const response = await fetch("/api/admin/ads/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCampaign),
      })

      if (response.ok) {
        const campaign = await response.json()
        setCampaigns([
          ...campaigns,
          { ...campaign, id: Date.now().toString(), isActive: true, impressions: 0, clicks: 0, revenue: 0 },
        ])
        setNewCampaign({
          title: "",
          description: "",
          type: "banner",
          placement: "",
          ctaText: "",
          ctaLink: "",
          imageUrl: "",
          startDate: "",
          endDate: "",
        })
        toast({
          title: "Campaign Created",
          description: "New ad campaign has been created successfully.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create campaign.",
        variant: "destructive",
      })
    }
  }

  const toggleCampaign = async (id: string) => {
    setCampaigns(
      campaigns.map((campaign) => (campaign.id === id ? { ...campaign, isActive: !campaign.isActive } : campaign)),
    )
  }

  const deleteCampaign = async (id: string) => {
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id))
    toast({
      title: "Campaign Deleted",
      description: "Ad campaign has been removed.",
    })
  }

  const updateAdSettings = async () => {
    try {
      const response = await fetch("/api/admin/ads/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adSettings),
      })

      if (response.ok) {
        toast({
          title: "Settings Updated",
          description: "Ad settings have been saved successfully.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings.",
        variant: "destructive",
      })
    }
  }

  const totalImpressions = campaigns.reduce((sum, campaign) => sum + campaign.impressions, 0)
  const totalClicks = campaigns.reduce((sum, campaign) => sum + campaign.clicks, 0)
  const totalRevenue = campaigns.reduce((sum, campaign) => sum + campaign.revenue, 0)
  const averageCTR = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : "0.00"

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Ads Management
          </h1>
          <p className="text-gray-600">Manage advertising campaigns and placements</p>
        </div>
        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-indigo-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Total Impressions</span>
              <Eye className="h-4 w-4 text-indigo-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{totalImpressions.toLocaleString()}</div>
            <div className="text-xs text-green-600 mt-1">+12.5% from last month</div>
          </CardContent>
        </Card>

        <Card className="border-indigo-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Total Clicks</span>
              <Target className="h-4 w-4 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{totalClicks.toLocaleString()}</div>
            <div className="text-xs text-green-600 mt-1">+8.3% from last month</div>
          </CardContent>
        </Card>

        <Card className="border-indigo-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Click-Through Rate</span>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{averageCTR}%</div>
            <div className="text-xs text-green-600 mt-1">+2.1% from last month</div>
          </CardContent>
        </Card>

        <Card className="border-indigo-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Revenue</span>
              <DollarSign className="h-4 w-4 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</div>
            <div className="text-xs text-green-600 mt-1">+15.7% from last month</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="create">Create Campaign</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-6">
          <Card className="border-indigo-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-indigo-600" />
                Active Campaigns
              </CardTitle>
              <CardDescription>Manage your advertising campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="border border-indigo-100 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{campaign.title}</h3>
                          <Badge
                            variant={campaign.isActive ? "default" : "secondary"}
                            className={campaign.isActive ? "bg-green-500" : ""}
                          >
                            {campaign.isActive ? "Active" : "Paused"}
                          </Badge>
                          <Badge variant="outline" className="border-indigo-200 text-indigo-700">
                            {campaign.type}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{campaign.description}</p>

                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Impressions:</span>
                            <div className="font-medium">{campaign.impressions.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Clicks:</span>
                            <div className="font-medium">{campaign.clicks.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">CTR:</span>
                            <div className="font-medium">
                              {campaign.impressions > 0
                                ? ((campaign.clicks / campaign.impressions) * 100).toFixed(2)
                                : "0.00"}
                              %
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500">Revenue:</span>
                            <div className="font-medium text-green-600">₹{campaign.revenue.toLocaleString()}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleCampaign(campaign.id)}
                          className="hover:bg-indigo-50"
                        >
                          {campaign.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-indigo-50">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteCampaign(campaign.id)}
                          className="hover:bg-red-50 text-red-600"
                        >
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

        <TabsContent value="create" className="space-y-6">
          <Card className="border-indigo-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-indigo-600" />
                Create New Campaign
              </CardTitle>
              <CardDescription>Set up a new advertising campaign</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Campaign Title</Label>
                  <Input
                    id="title"
                    value={newCampaign.title}
                    onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                    placeholder="Enter campaign title"
                    className="border-indigo-200 focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Ad Type</Label>
                  <Select
                    value={newCampaign.type}
                    onValueChange={(value: any) => setNewCampaign({ ...newCampaign, type: value })}
                  >
                    <SelectTrigger className="border-indigo-200 focus:border-indigo-500">
                      <SelectValue placeholder="Select ad type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="banner">Banner Ad</SelectItem>
                      <SelectItem value="sidebar">Sidebar Ad</SelectItem>
                      <SelectItem value="inline">Inline Ad</SelectItem>
                      <SelectItem value="popup">Popup Ad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newCampaign.description}
                  onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                  placeholder="Enter campaign description"
                  className="border-indigo-200 focus:border-indigo-500"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="ctaText">CTA Text</Label>
                  <Input
                    id="ctaText"
                    value={newCampaign.ctaText}
                    onChange={(e) => setNewCampaign({ ...newCampaign, ctaText: e.target.value })}
                    placeholder="e.g., Learn More"
                    className="border-indigo-200 focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ctaLink">CTA Link</Label>
                  <Input
                    id="ctaLink"
                    value={newCampaign.ctaLink}
                    onChange={(e) => setNewCampaign({ ...newCampaign, ctaLink: e.target.value })}
                    placeholder="/target-page"
                    className="border-indigo-200 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL (Optional)</Label>
                <Input
                  id="imageUrl"
                  value={newCampaign.imageUrl}
                  onChange={(e) => setNewCampaign({ ...newCampaign, imageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="border-indigo-200 focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newCampaign.startDate}
                    onChange={(e) => setNewCampaign({ ...newCampaign, startDate: e.target.value })}
                    className="border-indigo-200 focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newCampaign.endDate}
                    onChange={(e) => setNewCampaign({ ...newCampaign, endDate: e.target.value })}
                    className="border-indigo-200 focus:border-indigo-500"
                  />
                </div>
              </div>

              <Button
                onClick={handleCreateCampaign}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                Create Campaign
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="border-indigo-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-indigo-600" />
                Ad Settings
              </CardTitle>
              <CardDescription>Configure global advertising settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(adSettings).map(([key, setting]) => (
                <div key={key} className="flex items-center justify-between p-4 border border-indigo-100 rounded-lg">
                  <div>
                    <h3 className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</h3>
                    <p className="text-sm text-gray-600">
                      {setting.enabled ? "Enabled" : "Disabled"} • Frequency: Every {setting.frequency} pages
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`${key}-frequency`} className="text-sm">
                        Frequency:
                      </Label>
                      <Input
                        id={`${key}-frequency`}
                        type="number"
                        min="1"
                        max="10"
                        value={setting.frequency}
                        onChange={(e) =>
                          setAdSettings({
                            ...adSettings,
                            [key]: { ...setting, frequency: Number.parseInt(e.target.value) || 1 },
                          })
                        }
                        className="w-16 h-8 border-indigo-200"
                      />
                    </div>
                    <Switch
                      checked={setting.enabled}
                      onCheckedChange={(checked) =>
                        setAdSettings({
                          ...adSettings,
                          [key]: { ...setting, enabled: checked },
                        })
                      }
                    />
                  </div>
                </div>
              ))}

              <Button
                onClick={updateAdSettings}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

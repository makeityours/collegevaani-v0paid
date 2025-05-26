"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { Settings, DollarSign, Users, Target, CreditCard, Building, Gift, ShoppingCart } from "lucide-react"

export default function MonetizationToggles() {
  const [features, setFeatures] = useState({
    freemiumPlans: { enabled: true, revenue: 245000 },
    premiumCourses: { enabled: true, revenue: 189000 },
    universityPartnership: { enabled: true, revenue: 567000 },
    affiliateProgram: { enabled: true, revenue: 89000 },
    adsManagement: { enabled: true, revenue: 234000 },
    leadSelling: { enabled: true, revenue: 345000 },
    marketplace: { enabled: true, revenue: 123000 },
    subscriptions: { enabled: true, revenue: 456000 },
  })

  const [settings, setSettings] = useState({
    commissionRate: 15,
    minimumPayout: 1000,
    partnershipFee: 25000,
    premiumDiscount: 20,
  })

  const featureConfig = [
    {
      key: "freemiumPlans",
      name: "Freemium Plans",
      description: "Tiered pricing with free and premium options",
      icon: CreditCard,
      color: "text-blue-500",
    },
    {
      key: "premiumCourses",
      name: "Premium Courses",
      description: "Paid educational content and workshops",
      icon: ShoppingCart,
      color: "text-green-500",
    },
    {
      key: "universityPartnership",
      name: "University Partnerships",
      description: "Paid partnership program for institutions",
      icon: Building,
      color: "text-purple-500",
    },
    {
      key: "affiliateProgram",
      name: "Affiliate Program",
      description: "Referral system with commission tracking",
      icon: Gift,
      color: "text-orange-500",
    },
    {
      key: "adsManagement",
      name: "Ads Management",
      description: "Advertising platform for colleges",
      icon: Target,
      color: "text-red-500",
    },
    {
      key: "leadSelling",
      name: "Lead Selling",
      description: "Qualified lead generation for institutions",
      icon: Users,
      color: "text-indigo-500",
    },
    {
      key: "marketplace",
      name: "Marketplace",
      description: "Digital resources and materials store",
      icon: ShoppingCart,
      color: "text-teal-500",
    },
    {
      key: "subscriptions",
      name: "Subscriptions",
      description: "Recurring billing and subscription management",
      icon: CreditCard,
      color: "text-pink-500",
    },
  ]

  const handleFeatureToggle = async (featureKey: string, enabled: boolean) => {
    try {
      const response = await fetch("/api/admin/monetization/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          feature: featureKey,
          enabled,
          settings,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setFeatures((prev) => ({
          ...prev,
          [featureKey]: { ...prev[featureKey as keyof typeof prev], enabled },
        }))

        toast({
          title: "Feature Updated",
          description: data.message,
        })
      }
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update feature setting",
        variant: "destructive",
      })
    }
  }

  const totalRevenue = Object.values(features).reduce((sum, feature) => sum + feature.revenue, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Monetization Controls</h2>
          <p className="text-muted-foreground">Manage revenue features and settings</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Total Monthly Revenue</p>
          <p className="text-2xl font-bold text-green-600">₹{(totalRevenue / 100000).toFixed(1)}L</p>
        </div>
      </div>

      {/* Feature Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {featureConfig.map((feature) => {
          const featureData = features[feature.key as keyof typeof features]
          return (
            <Card key={feature.key}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <feature.icon className={`h-5 w-5 ${feature.color}`} />
                    </div>
                    <div>
                      <h3 className="font-medium">{feature.name}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={featureData.enabled}
                    onCheckedChange={(enabled) => handleFeatureToggle(feature.key, enabled)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant={featureData.enabled ? "default" : "secondary"}>
                    {featureData.enabled ? "Active" : "Disabled"}
                  </Badge>
                  <span className="text-sm font-medium">₹{(featureData.revenue / 1000).toFixed(0)}K/month</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Global Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Global Monetization Settings
          </CardTitle>
          <CardDescription>Configure global parameters for revenue features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="commission-rate">Affiliate Commission Rate (%)</Label>
              <Input
                id="commission-rate"
                type="number"
                value={settings.commissionRate}
                onChange={(e) => setSettings((prev) => ({ ...prev, commissionRate: Number.parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <Label htmlFor="minimum-payout">Minimum Payout (₹)</Label>
              <Input
                id="minimum-payout"
                type="number"
                value={settings.minimumPayout}
                onChange={(e) => setSettings((prev) => ({ ...prev, minimumPayout: Number.parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <Label htmlFor="partnership-fee">Partnership Fee (₹)</Label>
              <Input
                id="partnership-fee"
                type="number"
                value={settings.partnershipFee}
                onChange={(e) => setSettings((prev) => ({ ...prev, partnershipFee: Number.parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <Label htmlFor="premium-discount">Premium Discount (%)</Label>
              <Input
                id="premium-discount"
                type="number"
                value={settings.premiumDiscount}
                onChange={(e) => setSettings((prev) => ({ ...prev, premiumDiscount: Number.parseInt(e.target.value) }))}
              />
            </div>
          </div>
          <Button className="mt-4">Save Settings</Button>
        </CardContent>
      </Card>

      {/* Revenue Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Revenue Breakdown
          </CardTitle>
          <CardDescription>Monthly revenue by feature</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {featureConfig.map((feature) => {
              const featureData = features[feature.key as keyof typeof features]
              const percentage = (featureData.revenue / totalRevenue) * 100
              return (
                <div key={feature.key} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <feature.icon className={`h-4 w-4 ${feature.color}`} />
                    <span className="text-sm font-medium">{feature.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${percentage}%` }} />
                    </div>
                    <span className="text-sm font-medium w-16 text-right">
                      ₹{(featureData.revenue / 1000).toFixed(0)}K
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

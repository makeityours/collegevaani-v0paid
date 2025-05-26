"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"
import {
  Users,
  TrendingUp,
  DollarSign,
  Calendar,
  CreditCard,
  CheckCircle,
  XCircle,
  RefreshCw,
  Download,
  Eye,
  Edit,
} from "lucide-react"

export default function SubscriptionsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const subscriptionStats = {
    totalSubscribers: 2847,
    activeSubscriptions: 2456,
    monthlyRevenue: 1245000,
    churnRate: 3.2,
    averageLifetime: 8.5,
    conversionRate: 12.8,
  }

  const subscriptions = [
    {
      id: 1,
      user: "Rahul Kumar",
      email: "rahul@example.com",
      plan: "Premium",
      status: "Active",
      startDate: "2024-01-15",
      nextBilling: "2024-02-15",
      amount: 499,
      paymentMethod: "Credit Card",
    },
    {
      id: 2,
      user: "Priya Sharma",
      email: "priya@example.com",
      plan: "Pro",
      status: "Active",
      startDate: "2023-12-01",
      nextBilling: "2024-02-01",
      amount: 999,
      paymentMethod: "UPI",
    },
    {
      id: 3,
      user: "Amit Singh",
      email: "amit@example.com",
      plan: "Premium",
      status: "Cancelled",
      startDate: "2023-11-15",
      nextBilling: "2024-01-20",
      amount: 499,
      paymentMethod: "Net Banking",
    },
  ]

  const plans = [
    {
      id: 1,
      name: "Premium",
      price: 499,
      interval: "monthly",
      features: ["Unlimited comparisons", "Priority support", "Ad-free experience"],
      subscribers: 1245,
      revenue: 620055,
      active: true,
    },
    {
      id: 2,
      name: "Pro",
      price: 999,
      interval: "monthly",
      features: ["Everything in Premium", "1-on-1 counseling", "Application assistance"],
      subscribers: 567,
      revenue: 566433,
      active: true,
    },
    {
      id: 3,
      name: "Enterprise",
      price: 2499,
      interval: "monthly",
      features: ["Everything in Pro", "Bulk management", "Custom integrations"],
      subscribers: 89,
      revenue: 222411,
      active: true,
    },
  ]

  const handleCancelSubscription = (id: number) => {
    toast({
      title: "Subscription Cancelled",
      description: "The subscription has been cancelled successfully.",
    })
  }

  const handleRefundSubscription = (id: number) => {
    toast({
      title: "Refund Processed",
      description: "Refund has been initiated and will be processed within 5-7 business days.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-indigo-900">Subscription Management</h1>
          <p className="text-muted-foreground">Monitor and manage all user subscriptions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync Payments
          </Button>
        </div>
      </div>

      {/* Subscription Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="border-indigo-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Subscribers</p>
                <p className="text-2xl font-bold text-indigo-900">
                  {subscriptionStats.totalSubscribers.toLocaleString()}
                </p>
              </div>
              <Users className="h-8 w-8 text-indigo-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-indigo-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-indigo-900">
                  {subscriptionStats.activeSubscriptions.toLocaleString()}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-indigo-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold text-indigo-900">
                  ₹{(subscriptionStats.monthlyRevenue / 100000).toFixed(1)}L
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-indigo-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Churn Rate</p>
                <p className="text-2xl font-bold text-indigo-900">{subscriptionStats.churnRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-indigo-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Lifetime</p>
                <p className="text-2xl font-bold text-indigo-900">{subscriptionStats.averageLifetime}m</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-indigo-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversion</p>
                <p className="text-2xl font-bold text-indigo-900">{subscriptionStats.conversionRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-indigo-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-indigo-50">
          <TabsTrigger value="overview" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="subscriptions"
            className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
          >
            Subscriptions
          </TabsTrigger>
          <TabsTrigger value="plans" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            Plans
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-indigo-100">
              <CardHeader>
                <CardTitle className="text-indigo-900">Subscription Growth</CardTitle>
                <CardDescription>Monthly subscription growth trend</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 rounded-md">
                  <TrendingUp className="h-8 w-8 text-indigo-400" />
                  <span className="ml-2 text-indigo-600">Growth chart</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-indigo-100">
              <CardHeader>
                <CardTitle className="text-indigo-900">Revenue Breakdown</CardTitle>
                <CardDescription>Revenue by subscription plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {plans.map((plan) => (
                    <div key={plan.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-indigo-500"></div>
                        <span className="font-medium text-indigo-900">{plan.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-indigo-900">₹{(plan.revenue / 1000).toFixed(0)}K</p>
                        <p className="text-sm text-muted-foreground">{plan.subscribers} users</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-indigo-100">
            <CardHeader>
              <CardTitle className="text-indigo-900">Recent Subscription Activity</CardTitle>
              <CardDescription>Latest subscription changes and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "New subscription", user: "Rahul Kumar", plan: "Premium", time: "2 minutes ago" },
                  { action: "Plan upgraded", user: "Priya Sharma", plan: "Pro → Enterprise", time: "1 hour ago" },
                  { action: "Subscription cancelled", user: "Amit Singh", plan: "Premium", time: "3 hours ago" },
                  { action: "Payment failed", user: "Neha Gupta", plan: "Pro", time: "5 hours ago" },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border border-indigo-100 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <CreditCard className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-medium text-indigo-900">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.user} • {activity.plan}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscriptions" className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <Input
              placeholder="Search subscriptions..."
              className="max-w-sm border-indigo-200 focus:border-indigo-500"
            />
            <Select>
              <SelectTrigger className="w-[180px] border-indigo-200">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="trial">Trial</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px] border-indigo-200">
                <SelectValue placeholder="Filter by plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card className="border-indigo-100">
            <CardHeader>
              <CardTitle className="text-indigo-900">All Subscriptions</CardTitle>
              <CardDescription>Manage individual user subscriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subscriptions.map((subscription) => (
                  <div key={subscription.id} className="border border-indigo-100 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <Users className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-indigo-900">{subscription.user}</h3>
                          <p className="text-sm text-muted-foreground">{subscription.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={subscription.status === "Active" ? "default" : "secondary"}
                          className={subscription.status === "Active" ? "bg-indigo-600" : ""}
                        >
                          {subscription.status}
                        </Badge>
                        <Badge variant="outline" className="border-indigo-200 text-indigo-700">
                          {subscription.plan}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Start Date</p>
                        <p className="font-medium text-indigo-900">
                          {new Date(subscription.startDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Next Billing</p>
                        <p className="font-medium text-indigo-900">
                          {new Date(subscription.nextBilling).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Amount</p>
                        <p className="font-medium text-indigo-900">₹{subscription.amount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Payment Method</p>
                        <p className="font-medium text-indigo-900">{subscription.paymentMethod}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      {subscription.status === "Active" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-200 text-red-700 hover:bg-red-50"
                          onClick={() => handleCancelSubscription(subscription.id)}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-orange-200 text-orange-700 hover:bg-orange-50"
                        onClick={() => handleRefundSubscription(subscription.id)}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refund
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans" className="space-y-4">
          <Card className="border-indigo-100">
            <CardHeader>
              <CardTitle className="text-indigo-900">Subscription Plans</CardTitle>
              <CardDescription>Manage pricing plans and features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <Card key={plan.id} className="relative border-indigo-100">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-indigo-900">{plan.name}</CardTitle>
                        <Switch checked={plan.active} />
                      </div>
                      <div className="text-3xl font-bold text-indigo-900">₹{plan.price}</div>
                      <CardDescription>per {plan.interval}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Features:</p>
                          <ul className="text-sm space-y-1 mt-1">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Subscribers</p>
                            <p className="font-medium text-indigo-900">{plan.subscribers}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Revenue</p>
                            <p className="font-medium text-indigo-900">₹{(plan.revenue / 1000).toFixed(0)}K</p>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Plan
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-100">
            <CardHeader>
              <CardTitle className="text-indigo-900">Create New Plan</CardTitle>
              <CardDescription>Add a new subscription plan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="plan-name">Plan Name</Label>
                  <Input
                    id="plan-name"
                    placeholder="e.g., Premium Plus"
                    className="border-indigo-200 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <Label htmlFor="plan-price">Price</Label>
                  <Input
                    id="plan-price"
                    placeholder="e.g., 1499"
                    type="number"
                    className="border-indigo-200 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <Label htmlFor="plan-interval">Billing Interval</Label>
                  <Select>
                    <SelectTrigger className="border-indigo-200">
                      <SelectValue placeholder="Select interval" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="plan-trial">Trial Period (days)</Label>
                  <Input
                    id="plan-trial"
                    placeholder="e.g., 7"
                    type="number"
                    className="border-indigo-200 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="plan-features">Features (one per line)</Label>
                <textarea
                  id="plan-features"
                  className="w-full mt-1 p-2 border border-indigo-200 rounded-md focus:border-indigo-500"
                  rows={4}
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                />
              </div>
              <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700">Create Plan</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-indigo-100">
              <CardHeader>
                <CardTitle className="text-indigo-900">Subscription Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Monthly Recurring Revenue (MRR)</span>
                    <span className="font-medium text-indigo-900">₹12.45L</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Annual Recurring Revenue (ARR)</span>
                    <span className="font-medium text-indigo-900">₹1.49Cr</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Customer Lifetime Value (CLV)</span>
                    <span className="font-medium text-indigo-900">₹4,250</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average Revenue Per User (ARPU)</span>
                    <span className="font-medium text-indigo-900">₹437</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Churn Rate</span>
                    <span className="font-medium text-orange-600">3.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Net Revenue Retention</span>
                    <span className="font-medium text-green-600">108%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-indigo-100">
              <CardHeader>
                <CardTitle className="text-indigo-900">Cohort Analysis</CardTitle>
                <CardDescription>User retention by signup month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 rounded-md">
                  <TrendingUp className="h-8 w-8 text-indigo-400" />
                  <span className="ml-2 text-indigo-600">Cohort chart</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Bell, Calendar, Clock, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ExamAlert {
  id: string
  examName: string
  alertType: string
  date: string
  message: string
  isActive: boolean
}

export default function ExamAlertSystem() {
  const [alerts, setAlerts] = useState<ExamAlert[]>([
    {
      id: "1",
      examName: "JEE Main 2024",
      alertType: "Registration Reminder",
      date: "Nov 25, 2023",
      message: "Registration closes in 5 days",
      isActive: true,
    },
    {
      id: "2",
      examName: "NEET UG 2024",
      alertType: "Admit Card",
      date: "Dec 15, 2023",
      message: "Admit card will be released soon",
      isActive: true,
    },
  ])

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    examAlerts: {
      registration: true,
      admitCard: true,
      results: true,
      counseling: false,
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Alert preferences saved:", formData)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Exam Alert Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Alert Types</Label>
              {[
                {
                  key: "registration",
                  label: "Registration Deadlines",
                  desc: "Get notified about exam registration dates",
                },
                { key: "admitCard", label: "Admit Card Release", desc: "Be informed when admit cards are available" },
                { key: "results", label: "Result Announcements", desc: "Get instant notifications for results" },
                {
                  key: "counseling",
                  label: "Counseling Updates",
                  desc: "Updates about counseling and seat allocation",
                },
              ].map((alert) => (
                <div key={alert.key} className="flex items-start space-x-2">
                  <Checkbox
                    id={alert.key}
                    checked={formData.examAlerts[alert.key as keyof typeof formData.examAlerts]}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        examAlerts: { ...formData.examAlerts, [alert.key]: checked },
                      })
                    }
                  />
                  <div className="space-y-1">
                    <Label htmlFor={alert.key} className="font-medium">
                      {alert.label}
                    </Label>
                    <p className="text-sm text-muted-foreground">{alert.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button type="submit" className="w-full">
              Save Alert Preferences
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    {alert.alertType.includes("Registration") ? (
                      <Calendar className="h-4 w-4 text-primary" />
                    ) : (
                      <Clock className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">{alert.examName}</h4>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{alert.alertType}</Badge>
                      <span className="text-xs text-muted-foreground">{alert.date}</span>
                    </div>
                  </div>
                </div>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

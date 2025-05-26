"use client"

import type React from "react"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface ExamAlertDialogProps {
  examName: string
  examDate: string
}

export default function ExamAlertDialog({ examName, examDate }: ExamAlertDialogProps) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [alertTypes, setAlertTypes] = useState({
    registration: true,
    admitCard: true,
    result: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the alert preferences to the server
    console.log("Alert preferences saved:", { email, phone, alertTypes })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Bell className="mr-2 h-4 w-4" />
          Set Alert
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Exam Alerts</DialogTitle>
          <DialogDescription>
            Get timely notifications about {examName} scheduled on {examDate}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input
                id="phone"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Alert Types</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="registration"
                    checked={alertTypes.registration}
                    onCheckedChange={(checked) => setAlertTypes({ ...alertTypes, registration: checked as boolean })}
                  />
                  <label
                    htmlFor="registration"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Registration Deadline
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="admitCard"
                    checked={alertTypes.admitCard}
                    onCheckedChange={(checked) => setAlertTypes({ ...alertTypes, admitCard: checked as boolean })}
                  />
                  <label
                    htmlFor="admitCard"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Admit Card Release
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="result"
                    checked={alertTypes.result}
                    onCheckedChange={(checked) => setAlertTypes({ ...alertTypes, result: checked as boolean })}
                  />
                  <label
                    htmlFor="result"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Result Declaration
                  </label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Preferences</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Search, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

export default function AdminHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex flex-1 items-center justify-between">
        <div
          className={`${isSearchOpen ? "absolute inset-x-0 top-0 p-4 bg-background border-b z-50 md:static md:p-0 md:border-0" : "hidden md:flex"} items-center gap-2`}
        >
          <form className="relative w-full md:w-auto flex items-center">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full md:w-[200px] pl-8 rounded-full bg-muted/50 focus-visible:bg-background"
            />
            {isSearchOpen && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 md:hidden"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close search</span>
              </Button>
            )}
          </form>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <Search className="h-5 w-5" />
            <span className="sr-only">Toggle search</span>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center">3</Badge>
                <span className="sr-only">Notifications</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Notifications</SheetTitle>
                <SheetDescription>View your recent notifications</SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                <div className="border-l-4 border-primary pl-4 py-2">
                  <p className="font-medium">New college added</p>
                  <p className="text-sm text-muted-foreground">VIT Vellore has been added to the database</p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
                <div className="border-l-4 border-primary pl-4 py-2">
                  <p className="font-medium">Course updated</p>
                  <p className="text-sm text-muted-foreground">B.Tech Computer Science details updated</p>
                  <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                </div>
                <div className="border-l-4 border-primary pl-4 py-2">
                  <p className="font-medium">New user registered</p>
                  <p className="text-sm text-muted-foreground">10 new users registered today</p>
                  <p className="text-xs text-muted-foreground mt-1">Today</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/auth/login">Log out</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

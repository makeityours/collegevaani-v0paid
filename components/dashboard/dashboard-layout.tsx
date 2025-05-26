"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  GraduationCap,
  LogOut,
  Home,
  Building,
  FileText,
  BookOpen,
  Calendar,
  BarChart,
  MessageSquare,
  Settings,
  Users,
  Bell,
  CreditCard,
  Wallet,
  Star,
  Bookmark,
  Eye,
  UserPlus,
  type LucideIcon,
} from "lucide-react"

// Map of icon names to their components
const iconMap: Record<string, LucideIcon> = {
  home: Home,
  building: Building,
  "file-text": FileText,
  "book-open": BookOpen,
  calendar: Calendar,
  "bar-chart": BarChart,
  "message-square": MessageSquare,
  settings: Settings,
  users: Users,
  bell: Bell,
  "credit-card": CreditCard,
  wallet: Wallet,
  star: Star,
  bookmark: Bookmark,
  eye: Eye,
  "user-plus": UserPlus,
}

interface NavItem {
  name: string
  href: string
  iconName: string
}

interface DashboardLayoutProps {
  children: ReactNode
  navItems: NavItem[]
  userType: string
  userName: string
  userAvatar?: string
  userInitials: string
}

export function DashboardLayout({
  children,
  navItems,
  userType,
  userName,
  userAvatar,
  userInitials,
}: DashboardLayoutProps) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar variant="inset" className="border-r">
          <SidebarHeader className="border-b px-4 py-3 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              <span className="font-bold text-lg md:text-xl">CollegeVaani</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <div className="px-4 py-6">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-10 w-10">
                  {userAvatar && <AvatarImage src={userAvatar} alt={userName} />}
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{userName}</p>
                  <p className="text-xs text-muted-foreground">{userType}</p>
                </div>
              </div>
              <SidebarMenu>
                {navItems.map((item) => {
                  const IconComponent = iconMap[item.iconName] || FileText
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.name}>
                        <Link href={item.href} className="flex items-center gap-3">
                          <IconComponent className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </div>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <Button variant="outline" className="w-full justify-start" size="sm" asChild>
              <Link href="/auth/login">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Link>
            </Button>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="sticky top-0 z-30 flex h-14 md:h-16 items-center gap-2 md:gap-4 border-b bg-background px-3 md:px-6">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-base md:text-lg font-semibold">{userType} Dashboard</h1>
            </div>
          </header>
          <main className="flex-1 p-3 md:p-6 bg-muted/20">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

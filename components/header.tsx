"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  Search,
  Menu,
  ChevronDown,
  BookOpen,
  GraduationCap,
  Home,
  Sun,
  Moon,
  School,
  BookOpenCheck,
  X,
  Bell,
  BarChart3,
  Sparkles,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<"student" | "admin" | "counselor" | "parent">("student")
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("auth_token")
      setIsLoggedIn(!!token)
      const role = localStorage.getItem("user_role") as typeof userRole
      if (role) setUserRole(role)
    }
    checkAuth()
  }, [])

  const getDashboardLink = () => {
    switch (userRole) {
      case "admin":
        return "/admin"
      case "counselor":
        return "/dashboard/counselor"
      case "parent":
        return "/dashboard/parent"
      case "student":
      default:
        return "/dashboard/student"
    }
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 bg-white/95 backdrop-blur-md dark:bg-gray-950/95",
        isScrolled ? "shadow-lg border-b border-indigo-100 dark:border-indigo-800" : "",
      )}
    >
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="hidden text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent md:inline-block">
              CollegeVaani
            </span>
          </Link>

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), "hover:bg-indigo-50 hover:text-indigo-700")}
                  >
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:bg-indigo-50 hover:text-indigo-700">
                  Colleges
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex flex-col justify-end w-full h-full p-6 no-underline rounded-xl outline-none select-none bg-gradient-to-br from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 focus:shadow-md transition-all duration-300"
                          href="/colleges"
                        >
                          <GraduationCap className="w-6 h-6 mb-2 text-indigo-600" />
                          <div className="mt-4 mb-2 text-lg font-medium text-indigo-700">Explore All Colleges</div>
                          <p className="text-sm leading-tight text-indigo-600/80">
                            Discover top colleges and universities across India
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block p-3 space-y-1 no-underline transition-colors rounded-lg outline-none select-none hover:bg-indigo-50 focus:bg-indigo-50"
                          href="/colleges/engineering"
                        >
                          <div className="text-sm font-medium leading-none">Engineering Colleges</div>
                          <p className="text-sm leading-snug text-gray-500 line-clamp-2">
                            Top IITs, NITs and private engineering institutions
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block p-3 space-y-1 no-underline transition-colors rounded-lg outline-none select-none hover:bg-indigo-50 focus:bg-indigo-50"
                          href="/colleges/medical"
                        >
                          <div className="text-sm font-medium leading-none">Medical Colleges</div>
                          <p className="text-sm leading-snug text-gray-500 line-clamp-2">
                            AIIMS, top government and private medical colleges
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block p-3 space-y-1 no-underline transition-colors rounded-lg outline-none select-none hover:bg-indigo-50 focus:bg-indigo-50"
                          href="/colleges/compare"
                        >
                          <div className="text-sm font-medium leading-none">Compare Colleges</div>
                          <p className="text-sm leading-snug text-gray-500 line-clamp-2">
                            Side-by-side comparison of your shortlisted colleges
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:bg-indigo-50 hover:text-indigo-700">
                  Courses
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex flex-col justify-end w-full h-full p-6 no-underline rounded-xl outline-none select-none bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 focus:shadow-md transition-all duration-300"
                          href="/courses"
                        >
                          <BookOpenCheck className="w-6 h-6 mb-2 text-purple-600" />
                          <div className="mt-4 mb-2 text-lg font-medium text-purple-700">Explore All Courses</div>
                          <p className="text-sm leading-tight text-purple-600/80">
                            Find the perfect course for your career goals
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block p-3 space-y-1 no-underline transition-colors rounded-lg outline-none select-none hover:bg-purple-50 focus:bg-purple-50"
                          href="/courses/engineering"
                        >
                          <div className="text-sm font-medium leading-none">Engineering</div>
                          <p className="text-sm leading-snug text-gray-500 line-clamp-2">
                            B.Tech, M.Tech and specialized engineering programs
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block p-3 space-y-1 no-underline transition-colors rounded-lg outline-none select-none hover:bg-purple-50 focus:bg-purple-50"
                          href="/marketplace"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium leading-none">Premium Courses</span>
                            <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                              <Sparkles className="w-3 h-3 mr-1" />
                              New
                            </Badge>
                          </div>
                          <p className="text-sm leading-snug text-gray-500 line-clamp-2">
                            Expert-led courses and workshops
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/pricing" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300",
                    )}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Premium
                    <Badge className="ml-2 bg-white/20 text-white border-white/30">Pro</Badge>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          {/* Enhanced Search */}
          <div className={cn("relative transition-all duration-300 lg:w-auto", isSearchOpen ? "w-full" : "w-10")}>
            <div
              className={cn(
                "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none transition-opacity",
                isSearchOpen ? "opacity-100" : "opacity-0",
              )}
            >
              <Search className="w-4 h-4 text-indigo-500" />
            </div>
            <Input
              type="search"
              placeholder="Search colleges, courses, exams..."
              className={cn(
                "pl-10 transition-all duration-300 border-indigo-200 focus-visible:ring-indigo-500 focus-visible:border-indigo-500",
                isSearchOpen ? "w-full opacity-100" : "w-0 opacity-0 pointer-events-none",
              )}
            />
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute right-0 top-0 hover:bg-indigo-50",
                isSearchOpen ? "text-indigo-500" : "text-indigo-600",
              )}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              <span className="sr-only">Toggle search</span>
            </Button>
          </div>

          <Button variant="ghost" size="icon" onClick={toggleTheme} className="hidden lg:flex hover:bg-indigo-50">
            {theme === "light" ? (
              <Moon className="w-5 h-5 text-indigo-600" />
            ) : (
              <Sun className="w-5 h-5 text-indigo-600" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {isLoggedIn ? (
            <div className="hidden lg:flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative hover:bg-indigo-50">
                <Bell className="w-5 h-5 text-indigo-600" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs bg-gradient-to-r from-indigo-600 to-purple-600">
                  3
                </Badge>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative flex items-center gap-2 hover:bg-indigo-50">
                    <Avatar className="w-8 h-8 ring-2 ring-indigo-200">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
                        U
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline text-indigo-700">Account</span>
                    <ChevronDown className="w-4 h-4 text-indigo-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 border-indigo-100">
                  <DropdownMenuItem asChild>
                    <Link href={getDashboardLink()} className="flex items-center">
                      <BarChart3 className="w-4 h-4 mr-2 text-indigo-600" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/pricing" className="flex items-center">
                      <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
                      <span>Upgrade to Pro</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden lg:flex gap-2">
              <Button variant="outline" asChild className="border-indigo-200 text-indigo-600 hover:bg-indigo-50">
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/auth/register">Get Started</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden hover:bg-indigo-50">
                <Menu className="w-5 h-5 text-indigo-600" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] border-indigo-100">
              <SheetHeader className="mb-4">
                <SheetTitle className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    CollegeVaani
                  </span>
                </SheetTitle>
              </SheetHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Link
                    href="/"
                    className="flex items-center gap-2 p-3 transition-colors rounded-lg hover:bg-indigo-50"
                  >
                    <Home className="w-5 h-5 text-indigo-600" />
                    <span>Home</span>
                  </Link>
                  <Link
                    href="/colleges"
                    className="flex items-center gap-2 p-3 transition-colors rounded-lg hover:bg-indigo-50"
                  >
                    <School className="w-5 h-5 text-indigo-600" />
                    <span>Colleges</span>
                  </Link>
                  <Link
                    href="/courses"
                    className="flex items-center gap-2 p-3 transition-colors rounded-lg hover:bg-indigo-50"
                  >
                    <BookOpenCheck className="w-5 h-5 text-indigo-600" />
                    <span>Courses</span>
                  </Link>
                  <Link
                    href="/pricing"
                    className="flex items-center gap-2 p-3 transition-colors rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700"
                  >
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                    <span>Premium</span>
                    <Badge className="ml-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white">Pro</Badge>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

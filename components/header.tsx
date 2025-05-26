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
  User,
  BookOpen,
  GraduationCap,
  FileText,
  Globe,
  Home,
  Sun,
  Moon,
  School,
  BookOpenCheck,
  Laptop,
  X,
  Bell,
  Settings,
  BarChart3,
  Users,
  Target,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

  // Check if user is logged in (this would come from your auth system)
  useEffect(() => {
    // Simulate checking auth status
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
        "sticky top-0 z-50 w-full transition-all duration-300 bg-white dark:bg-gray-950",
        isScrolled ? "shadow-md border-b border-gray-100 dark:border-gray-800" : "",
      )}
    >
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="hidden text-xl font-bold md:inline-block">CollegeVaani</span>
          </Link>

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Colleges</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex flex-col justify-end w-full h-full p-6 no-underline rounded-md outline-none select-none bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/60 focus:shadow-md"
                          href="/colleges"
                        >
                          <GraduationCap className="w-6 h-6 mb-2 text-blue-600" />
                          <div className="mt-4 mb-2 text-lg font-medium text-blue-600">Explore All Colleges</div>
                          <p className="text-sm leading-tight text-blue-600/80">
                            Discover top colleges and universities across India
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block p-3 space-y-1 no-underline transition-colors rounded-md outline-none select-none hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:bg-blue-50"
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
                          className="block p-3 space-y-1 no-underline transition-colors rounded-md outline-none select-none hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:bg-blue-50"
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
                          className="block p-3 space-y-1 no-underline transition-colors rounded-md outline-none select-none hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:bg-blue-50"
                          href="/colleges/compare"
                        >
                          <div className="text-sm font-medium leading-none">Compare Colleges</div>
                          <p className="text-sm leading-snug text-gray-500 line-clamp-2">
                            Side-by-side comparison of your shortlisted colleges
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block p-3 space-y-1 no-underline transition-colors rounded-md outline-none select-none hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:bg-blue-50"
                          href="/colleges/rankings"
                        >
                          <div className="text-sm font-medium leading-none">College Rankings</div>
                          <p className="text-sm leading-snug text-gray-500 line-clamp-2">
                            NIRF and other popular college rankings
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex flex-col justify-end w-full h-full p-6 no-underline rounded-md outline-none select-none bg-gradient-to-b from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-900/60 focus:shadow-md"
                          href="/courses"
                        >
                          <BookOpenCheck className="w-6 h-6 mb-2 text-indigo-600" />
                          <div className="mt-4 mb-2 text-lg font-medium text-indigo-600">Explore All Courses</div>
                          <p className="text-sm leading-tight text-indigo-600/80">
                            Find the perfect course for your career goals
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block p-3 space-y-1 no-underline transition-colors rounded-md outline-none select-none hover:bg-indigo-50 dark:hover:bg-indigo-900/20 focus:bg-indigo-50"
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
                          className="block p-3 space-y-1 no-underline transition-colors rounded-md outline-none select-none hover:bg-indigo-50 dark:hover:bg-indigo-900/20 focus:bg-indigo-50"
                          href="/courses/medical"
                        >
                          <div className="text-sm font-medium leading-none">Medical</div>
                          <p className="text-sm leading-snug text-gray-500 line-clamp-2">
                            MBBS, MD, BDS and other medical courses
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block p-3 space-y-1 no-underline transition-colors rounded-md outline-none select-none hover:bg-indigo-50 dark:hover:bg-indigo-900/20 focus:bg-indigo-50"
                          href="/courses/management"
                        >
                          <div className="text-sm font-medium leading-none">Management</div>
                          <p className="text-sm leading-snug text-gray-500 line-clamp-2">
                            MBA, BBA, and executive management programs
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block p-3 space-y-1 no-underline transition-colors rounded-md outline-none select-none hover:bg-indigo-50 dark:hover:bg-indigo-900/20 focus:bg-indigo-50"
                          href="/online-degrees"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium leading-none">Online Degree Courses</span>
                            <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600">New</Badge>
                          </div>
                          <p className="text-sm leading-snug text-gray-500 line-clamp-2">
                            Flexible online degree programs from top universities
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Exams</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex flex-col justify-end w-full h-full p-6 no-underline rounded-md outline-none select-none bg-gradient-to-b from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/60 focus:shadow-md"
                          href="/exams"
                        >
                          <FileText className="w-6 h-6 mb-2 text-purple-600" />
                          <div className="mt-4 mb-2 text-lg font-medium text-purple-600">Explore All Exams</div>
                          <p className="text-sm leading-tight text-purple-600/80">
                            Prepare for entrance exams with our resources
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block p-3 space-y-1 no-underline transition-colors rounded-md outline-none select-none hover:bg-purple-50 dark:hover:bg-purple-900/20 focus:bg-purple-50"
                          href="/exams/jee-main"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium leading-none">JEE Main</span>
                            <Badge className="bg-red-500">Live</Badge>
                          </div>
                          <p className="text-sm leading-snug text-gray-500 line-clamp-2">
                            Joint Entrance Examination for engineering admissions
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block p-3 space-y-1 no-underline transition-colors rounded-md outline-none select-none hover:bg-purple-50 dark:hover:bg-purple-900/20 focus:bg-purple-50"
                          href="/exams/neet"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium leading-none">NEET</span>
                            <Badge className="bg-red-500">Live</Badge>
                          </div>
                          <p className="text-sm leading-snug text-gray-500 line-clamp-2">
                            National Eligibility cum Entrance Test for medical
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block p-3 space-y-1 no-underline transition-colors rounded-md outline-none select-none hover:bg-purple-50 dark:hover:bg-purple-900/20 focus:bg-purple-50"
                          href="/exams/cat"
                        >
                          <div className="text-sm font-medium leading-none">CAT</div>
                          <p className="text-sm leading-snug text-gray-500 line-clamp-2">
                            Common Admission Test for MBA admissions
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block p-3 space-y-1 no-underline transition-colors rounded-md outline-none select-none hover:bg-purple-50 dark:hover:bg-purple-900/20 focus:bg-purple-50"
                          href="/resources/college-predictor"
                        >
                          <div className="text-sm font-medium leading-none">College Predictor</div>
                          <p className="text-sm leading-snug text-gray-500 line-clamp-2">
                            Predict colleges based on your exam scores
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/online-degrees" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:text-white hover:from-blue-700 hover:to-indigo-700",
                    )}
                  >
                    <Laptop className="w-4 h-4 mr-2" />
                    Online Degrees
                    <Badge className="ml-2 bg-white text-blue-600">New</Badge>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block p-3 space-y-1 no-underline transition-colors rounded-md outline-none select-none hover:bg-green-50 dark:hover:bg-green-900/20 focus:bg-green-50"
                          href="/resources/college-predictor"
                        >
                          <div className="text-sm font-medium leading-none">College Predictor</div>
                          <p className="text-sm leading-snug text-gray-500 line-clamp-2">
                            Predict colleges based on your exam scores
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block p-3 space-y-1 no-underline transition-colors rounded-md outline-none select-none hover:bg-green-50 dark:hover:bg-green-900/20 focus:bg-green-50"
                          href="/resources/study-material"
                        >
                          <div className="text-sm font-medium leading-none">Study Material</div>
                          <p className="text-sm leading-snug text-gray-500 line-clamp-2">
                            Free study resources for various exams
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block p-3 space-y-1 no-underline transition-colors rounded-md outline-none select-none hover:bg-green-50 dark:hover:bg-green-900/20 focus:bg-green-50"
                          href="/resources/scholarships"
                        >
                          <div className="text-sm font-medium leading-none">Scholarships</div>
                          <p className="text-sm leading-snug text-gray-500 line-clamp-2">
                            Find scholarships to fund your education
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block p-3 space-y-1 no-underline transition-colors rounded-md outline-none select-none hover:bg-green-50 dark:hover:bg-green-900/20 focus:bg-green-50"
                          href="/resources/career-guidance"
                        >
                          <div className="text-sm font-medium leading-none">Career Guidance</div>
                          <p className="text-sm leading-snug text-gray-500 line-clamp-2">
                            Expert advice on choosing the right career path
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block p-3 space-y-1 no-underline transition-colors rounded-md outline-none select-none hover:bg-green-50 dark:hover:bg-green-900/20 focus:bg-green-50"
                          href="/engagement"
                        >
                          <div className="text-sm font-medium leading-none">Student Community</div>
                          <p className="text-sm leading-snug text-gray-500 line-clamp-2">
                            Join quizzes, forums, and interactive sessions
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block p-3 space-y-1 no-underline transition-colors rounded-md outline-none select-none hover:bg-green-50 dark:hover:bg-green-900/20 focus:bg-green-50"
                          href="/lead-generation"
                        >
                          <div className="text-sm font-medium leading-none">Get Counseling</div>
                          <p className="text-sm leading-snug text-gray-500 line-clamp-2">
                            Free personalized education counseling
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <div className={cn("relative transition-all duration-300 lg:w-auto", isSearchOpen ? "w-full" : "w-10")}>
            <div
              className={cn(
                "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none transition-opacity",
                isSearchOpen ? "opacity-100" : "opacity-0",
              )}
            >
              <Search className="w-4 h-4 text-gray-500" />
            </div>
            <Input
              type="search"
              placeholder="Search colleges, courses, exams..."
              className={cn(
                "pl-10 transition-all duration-300 border-gray-200 focus-visible:ring-blue-500",
                isSearchOpen ? "w-full opacity-100" : "w-0 opacity-0 pointer-events-none",
              )}
            />
            <Button
              variant="ghost"
              size="icon"
              className={cn("absolute right-0 top-0", isSearchOpen ? "text-gray-500" : "text-gray-700")}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              <span className="sr-only">Toggle search</span>
            </Button>
          </div>

          <Button variant="ghost" size="icon" onClick={toggleTheme} className="hidden lg:flex">
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {isLoggedIn ? (
            <div className="hidden lg:flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs">
                  3
                </Badge>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline">Account</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href={getDashboardLink()}>
                      <BarChart3 className="w-4 h-4 mr-2" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/student/profile">
                      <User className="w-4 h-4 mr-2" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="w-4 h-4 mr-2" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  {userRole === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin/comprehensive-dashboard">
                        <Target className="w-4 h-4 mr-2" />
                        <span>Admin Panel</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden lg:flex">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <span>Account</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/auth/login">
                      <User className="w-4 h-4 mr-2" />
                      <span>Login</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/register">
                      <Users className="w-4 h-4 mr-2" />
                      <span>Register</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <SheetHeader className="mb-4">
                <SheetTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  CollegeVaani
                </SheetTitle>
              </SheetHeader>
              <Tabs defaultValue="menu" className="w-full">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="menu" className="flex-1">
                    Menu
                  </TabsTrigger>
                  <TabsTrigger value="account" className="flex-1">
                    Account
                  </TabsTrigger>
                </TabsList>
                <div className="space-y-4" data-value="menu">
                  <div className="space-y-1">
                    <Link
                      href="/"
                      className="flex items-center gap-2 p-2 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <Home className="w-5 h-5 text-gray-500" />
                      <span>Home</span>
                    </Link>
                    <Link
                      href="/online-degrees"
                      className="flex items-center gap-2 p-2 transition-colors rounded-md bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-600"
                    >
                      <Laptop className="w-5 h-5" />
                      <span>Online Degrees</span>
                      <Badge className="ml-auto bg-blue-600">New</Badge>
                    </Link>
                  </div>
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
                    <h3 className="mb-2 text-sm font-medium text-gray-500">Explore</h3>
                    <div className="space-y-1">
                      <Link
                        href="/colleges"
                        className="flex items-center gap-2 p-2 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <School className="w-5 h-5 text-gray-500" />
                        <span>Colleges</span>
                      </Link>
                      <Link
                        href="/courses"
                        className="flex items-center gap-2 p-2 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <BookOpenCheck className="w-5 h-5 text-gray-500" />
                        <span>Courses</span>
                      </Link>
                      <Link
                        href="/exams"
                        className="flex items-center gap-2 p-2 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <FileText className="w-5 h-5 text-gray-500" />
                        <span>Exams</span>
                      </Link>
                      <Link
                        href="/resources"
                        className="flex items-center gap-2 p-2 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <Globe className="w-5 h-5 text-gray-500" />
                        <span>Resources</span>
                      </Link>
                      <Link
                        href="/engagement"
                        className="flex items-center gap-2 p-2 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <Users className="w-5 h-5 text-gray-500" />
                        <span>Community</span>
                      </Link>
                      <Link
                        href="/lead-generation"
                        className="flex items-center gap-2 p-2 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <Target className="w-5 h-5 text-gray-500" />
                        <span>Get Counseling</span>
                      </Link>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
                    <h3 className="mb-2 text-sm font-medium text-gray-500">Settings</h3>
                    <div className="flex items-center justify-between p-2">
                      <div className="flex items-center gap-2">
                        {theme === "light" ? (
                          <Sun className="w-5 h-5 text-gray-500" />
                        ) : (
                          <Moon className="w-5 h-5 text-gray-500" />
                        )}
                        <span>Dark Mode</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={toggleTheme} className="ml-auto">
                        {theme === "light" ? "Off" : "On"}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-4" data-value="account">
                  {isLoggedIn ? (
                    <div className="space-y-1">
                      <Link
                        href={getDashboardLink()}
                        className="flex items-center w-full gap-2 p-2 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <BarChart3 className="w-5 h-5 text-gray-500" />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        href="/dashboard/student/profile"
                        className="flex items-center w-full gap-2 p-2 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <User className="w-5 h-5 text-gray-500" />
                        <span>Profile</span>
                      </Link>
                      <Button variant="ghost" className="w-full justify-start">
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Link
                        href="/auth/login"
                        className="flex items-center w-full gap-2 p-2 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <User className="w-5 h-5 text-gray-500" />
                        <span>Login</span>
                      </Link>
                      <Link href="/auth/register">
                        <Button className="w-full">Register</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </Tabs>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

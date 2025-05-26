/**
 * UI Component Library Documentation
 *
 * This file serves as a comprehensive documentation of all reusable UI components
 * in the CollegeVaani application. Each component is documented with its purpose,
 * usage examples, and dependencies.
 */

/**
 * Component: Button
 * Path: @/components/ui/button.tsx
 *
 * Description:
 * A versatile button component with multiple variants and sizes.
 *
 * Props:
 * - variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
 * - size: 'default' | 'sm' | 'lg' | 'icon'
 * - asChild: boolean - When true, the component will render its children directly
 *
 * Usage:
 * ```tsx
 * import { Button } from "@/components/ui/button"
 *
 * // Default button
 * <Button>Click me</Button>
 *
 * // Outline variant with small size
 * <Button variant="outline" size="sm">Small Button</Button>
 *
 * // As a link
 * <Button asChild>
 *   <Link href="/somewhere">Go somewhere</Link>
 * </Button>
 * ```
 *
 * Dependencies:
 * - class-variance-authority
 * - @radix-ui/react-slot
 * - @/lib/utils (for cn utility)
 */

/**
 * Component: Input
 * Path: @/components/ui/input.tsx
 *
 * Description:
 * A reusable input component for forms.
 *
 * Props:
 * - type: HTML input types
 * - className: Additional CSS classes
 * - All standard HTML input attributes
 *
 * Usage:
 * ```tsx
 * import { Input } from "@/components/ui/input"
 *
 * // Basic input
 * <Input type="text" placeholder="Enter your name" />
 *
 * // Search input
 * <div className="relative">
 *   <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
 *   <Input type="search" placeholder="Search..." className="pl-9" />
 * </div>
 * ```
 *
 * Dependencies:
 * - @/lib/utils (for cn utility)
 */

/**
 * Component: Sheet
 * Path: @/components/ui/sheet.tsx
 *
 * Description:
 * A slide-in panel component, typically used for mobile navigation or side panels.
 *
 * Props:
 * - side: 'top' | 'right' | 'bottom' | 'left'
 * - open: boolean - Controls the open state
 * - onOpenChange: (open: boolean) => void - Callback when open state changes
 *
 * Usage:
 * ```tsx
 * import {
 *   Sheet,
 *   SheetContent,
 *   SheetTrigger,
 *   SheetClose
 * } from "@/components/ui/sheet"
 *
 * <Sheet>
 *   <SheetTrigger asChild>
 *     <Button variant="outline">Open Sheet</Button>
 *   </SheetTrigger>
 *   <SheetContent side="right">
 *     <h2>Sheet Content</h2>
 *     <p>This is the content of the sheet.</p>
 *     <SheetClose asChild>
 *       <Button>Close</Button>
 *     </SheetClose>
 *   </SheetContent>
 * </Sheet>
 * ```
 *
 * Dependencies:
 * - @radix-ui/react-dialog
 * - class-variance-authority
 * - @/lib/utils (for cn utility)
 */

/**
 * Component: DropdownMenu
 * Path: @/components/ui/dropdown-menu.tsx
 *
 * Description:
 * A dropdown menu component for displaying a list of actions or options.
 *
 * Usage:
 * ```tsx
 * import {
 *   DropdownMenu,
 *   DropdownMenuContent,
 *   DropdownMenuItem,
 *   DropdownMenuTrigger
 * } from "@/components/ui/dropdown-menu"
 *
 * <DropdownMenu>
 *   <DropdownMenuTrigger asChild>
 *     <Button variant="outline">Open Menu</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem>Profile</DropdownMenuItem>
 *     <DropdownMenuItem>Settings</DropdownMenuItem>
 *     <DropdownMenuItem>Logout</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 *
 * Dependencies:
 * - @radix-ui/react-dropdown-menu
 * - @/lib/utils (for cn utility)
 */

/**
 * Component: Avatar
 * Path: @/components/ui/avatar.tsx
 *
 * Description:
 * An avatar component for user profile pictures with fallback support.
 *
 * Usage:
 * ```tsx
 * import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
 *
 * <Avatar>
 *   <AvatarImage src="https://example.com/avatar.jpg" alt="User" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * ```
 *
 * Dependencies:
 * - @radix-ui/react-avatar
 * - @/lib/utils (for cn utility)
 */

/**
 * Component: Badge
 * Path: @/components/ui/badge.tsx
 *
 * Description:
 * A badge component for displaying status or counts.
 *
 * Props:
 * - variant: 'default' | 'secondary' | 'destructive' | 'outline'
 *
 * Usage:
 * ```tsx
 * import { Badge } from "@/components/ui/badge"
 *
 * <Badge>New</Badge>
 * <Badge variant="secondary">Featured</Badge>
 * <Badge variant="destructive">Sold Out</Badge>
 * ```
 *
 * Dependencies:
 * - class-variance-authority
 * - @/lib/utils (for cn utility)
 */

/**
 * Component: Card
 * Path: @/components/ui/card.tsx
 *
 * Description:
 * A card component for displaying content in a contained box.
 *
 * Usage:
 * ```tsx
 * import {
 *   Card,
 *   CardContent,
 *   CardDescription,
 *   CardFooter,
 *   CardHeader,
 *   CardTitle
 * } from "@/components/ui/card"
 *
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card Description</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Card Content</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 * ```
 *
 * Dependencies:
 * - @/lib/utils (for cn utility)
 */

/**
 * Component: ThemeProvider
 * Path: @/components/theme-provider.tsx
 *
 * Description:
 * A provider component that manages the theme state (light/dark mode).
 *
 * Props:
 * - defaultTheme: 'light' | 'dark' | 'system'
 * - enableSystem: boolean - Whether to use system preferences
 * - children: React.ReactNode
 *
 * Usage:
 * ```tsx
 * import { ThemeProvider } from "@/components/theme-provider"
 *
 * <ThemeProvider defaultTheme="system" enableSystem>
 *   <App />
 * </ThemeProvider>
 * ```
 *
 * Dependencies:
 * - next-themes
 */

/**
 * Component: HeroSearch
 * Path: @/components/hero-search.tsx
 *
 * Description:
 * A hero section with a prominent search bar for the homepage.
 *
 * Usage:
 * ```tsx
 * import { HeroSearch } from "@/components/hero-search"
 *
 * <HeroSearch />
 * ```
 *
 * Dependencies:
 * - @/components/ui/input
 * - @/components/ui/button
 * - lucide-react
 */

/**
 * Component: Footer
 * Path: @/components/footer.tsx
 *
 * Description:
 * The site footer component with links and information.
 *
 * Usage:
 * ```tsx
 * import { Footer } from "@/components/footer"
 *
 * <Footer />
 * ```
 */

/**
 * Component: ExamCalendar
 * Path: @/components/exam-calendar.tsx
 *
 * Description:
 * A calendar component displaying upcoming exams.
 *
 * Usage:
 * ```tsx
 * import { ExamCalendar } from "@/components/exam-calendar"
 *
 * <ExamCalendar />
 * ```
 *
 * Dependencies:
 * - @/components/ui/card
 * - @/components/ui/badge
 * - lucide-react
 */

/**
 * Component: ExamAlertDialog
 * Path: @/components/exam-alert-dialog.tsx
 *
 * Description:
 * A dialog component for displaying important exam alerts.
 *
 * Usage:
 * ```tsx
 * import { ExamAlertDialog } from "@/components/exam-alert-dialog"
 *
 * <ExamAlertDialog
 *   examName="JEE Main 2024"
 *   date="January 24-31, 2024"
 *   registrationEndDate="November 30, 2023"
 * />
 * ```
 *
 * Dependencies:
 * - @/components/ui/dialog
 * - @/components/ui/button
 * - lucide-react
 */

/**
 * Component: DashboardCard
 * Path: @/components/dashboard/dashboard-card.tsx
 *
 * Description:
 * A card component specifically designed for dashboard items.
 *
 * Props:
 * - title: string
 * - value: string | number
 * - icon: React.ReactNode
 * - description?: string
 * - trend?: 'up' | 'down' | 'neutral'
 * - trendValue?: string | number
 *
 * Usage:
 * ```tsx
 * import { DashboardCard } from "@/components/dashboard/dashboard-card"
 * import { Users } from 'lucide-react'
 *
 * <DashboardCard
 *   title="Total Students"
 *   value={1234}
 *   icon={<Users className="h-5 w-5" />}
 *   description="Active students"
 *   trend="up"
 *   trendValue="12%"
 * />
 * ```
 *
 * Dependencies:
 * - @/components/ui/card
 * - lucide-react
 */

/**
 * Component: ProgressCard
 * Path: @/components/dashboard/progress-card.tsx
 *
 * Description:
 * A card component for displaying progress information.
 *
 * Props:
 * - title: string
 * - value: number
 * - max: number
 * - description?: string
 *
 * Usage:
 * ```tsx
 * import { ProgressCard } from "@/components/dashboard/progress-card"
 *
 * <ProgressCard
 *   title="Application Progress"
 *   value={75}
 *   max={100}
 *   description="75% complete"
 * />
 * ```
 *
 * Dependencies:
 * - @/components/ui/card
 * - @/components/ui/progress
 */

/**
 * Component: NotificationItem
 * Path: @/components/dashboard/notification-item.tsx
 *
 * Description:
 * A component for displaying individual notification items.
 *
 * Props:
 * - title: string
 * - description: string
 * - time: string
 * - type?: 'info' | 'warning' | 'success' | 'error'
 * - read?: boolean
 *
 * Usage:
 * ```tsx
 * import { NotificationItem } from "@/components/dashboard/notification-item"
 *
 * <NotificationItem
 *   title="Application Update"
 *   description="Your application status has been updated"
 *   time="2 hours ago"
 *   type="info"
 *   read={false}
 * />
 * ```
 *
 * Dependencies:
 * - lucide-react
 * - @/lib/utils (for cn utility)
 */

/**
 * Component: AdminSidebar
 * Path: @/components/admin/admin-sidebar.tsx
 *
 * Description:
 * A sidebar navigation component for the admin dashboard.
 *
 * Usage:
 * ```tsx
 * import { AdminSidebar } from "@/components/admin/admin-sidebar"
 *
 * <AdminSidebar />
 * ```
 *
 * Dependencies:
 * - next/link
 * - next/navigation
 * - lucide-react
 * - @/lib/utils (for cn utility)
 */

/**
 * Component: AdminHeader
 * Path: @/components/admin/admin-header.tsx
 *
 * Description:
 * A header component for the admin dashboard.
 *
 * Props:
 * - title: string
 *
 * Usage:
 * ```tsx
 * import { AdminHeader } from "@/components/admin/admin-header"
 *
 * <AdminHeader title="Dashboard" />
 * ```
 *
 * Dependencies:
 * - lucide-react
 * - @/components/ui/button
 * - @/components/ui/dropdown-menu
 * - @/components/ui/avatar
 */

/**
 * Utility: cn
 * Path: @/lib/utils.ts
 *
 * Description:
 * A utility function for conditionally joining class names.
 *
 * Usage:
 * ```tsx
 * import { cn } from "@/lib/utils"
 *
 * <div className={cn(
 *   "base-class",
 *   condition && "conditional-class",
 *   anotherCondition ? "true-class" : "false-class"
 * )}>
 *   Content
 * </div>
 * ```
 *
 * Dependencies:
 * - clsx
 * - tailwind-merge
 */

export {}

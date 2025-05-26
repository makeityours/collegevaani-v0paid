import { BarChart3, CreditCard, Target, Building, Users } from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: any // You might want to be more specific with the icon type
}

const adminSidebarItems: NavItem[] = [
  {
    title: "Competitive Analysis",
    href: "/admin/competitive-analysis",
    icon: BarChart3,
  },
  {
    title: "Pricing & Plans",
    href: "/admin/subscriptions",
    icon: CreditCard,
  },
  {
    title: "Ads Management",
    href: "/admin/ads",
    icon: Target,
  },
  {
    title: "University Partners",
    href: "/admin/partners",
    icon: Building,
  },
  {
    title: "Affiliate Program",
    href: "/admin/affiliates",
    icon: Users,
  },
]

export default adminSidebarItems

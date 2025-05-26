import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DashboardCard } from "@/components/dashboard/dashboard-card"
import { StatsCard } from "@/components/dashboard/stats-card"
import { NotificationItem } from "@/components/dashboard/notification-item"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell } from "lucide-react"

const navItems = [
  { name: "Dashboard", href: "/dashboard/parent", iconName: "home" },
  { name: "Student Profile", href: "/dashboard/parent/student", iconName: "users" },
  { name: "Applications", href: "/dashboard/parent/applications", iconName: "file-text" },
  { name: "Payments", href: "/dashboard/parent/payments", iconName: "credit-card" },
  { name: "College Predictor", href: "/resources/college-predictor", iconName: "bar-chart" },
  { name: "Compare Colleges", href: "/colleges/compare", iconName: "building" },
  { name: "Counseling", href: "/dashboard/parent/counseling", iconName: "message-square" },
  { name: "Settings", href: "/dashboard/parent/settings", iconName: "settings" },
]

export default function ParentDashboard() {
  return (
    <DashboardLayout navItems={navItems} userType="Parent" userName="Suresh Sharma" userInitials="SS">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome, Mr. Sharma!</h1>
            <p className="text-muted-foreground">Monitor your child's college application journey.</p>
          </div>
          <Button asChild>
            <Link href="/dashboard/parent/student">
              <span className="mr-2">👁️</span>
              View Student Profile
            </Link>
          </Button>
        </div>

        <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard title="Applications" value="5" icon={<span>📝</span>} description="2 pending, 3 submitted" />
          <StatsCard
            title="Upcoming Payments"
            value="₹45,000"
            icon={<span>💰</span>}
            description="Due in next 30 days"
          />
          <StatsCard title="Upcoming Exams" value="3" icon={<span>📅</span>} description="Next: JEE Main in 15 days" />
          <StatsCard
            title="Counseling Sessions"
            value="2"
            icon={<span>👥</span>}
            description="Next session on May 10, 2023"
          />
        </div>

        <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-3">
          <DashboardCard title="Student Overview" className="md:col-span-2">
            <div className="flex flex-col gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl md:text-2xl">🎓</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Rahul Sharma</h3>
                    <p className="text-sm text-muted-foreground">Class XII, Science Stream</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 md:gap-4 mt-4">
                  <div className="border rounded-md p-3">
                    <p className="text-sm text-muted-foreground">JEE Main Score</p>
                    <p className="text-lg font-bold">96.8 percentile</p>
                  </div>
                  <div className="border rounded-md p-3">
                    <p className="text-sm text-muted-foreground">Class XII Score</p>
                    <p className="text-lg font-bold">92.4%</p>
                  </div>
                  <div className="border rounded-md p-3">
                    <p className="text-sm text-muted-foreground">Target Course</p>
                    <p className="text-lg font-bold">B.Tech</p>
                  </div>
                  <div className="border rounded-md p-3">
                    <p className="text-sm text-muted-foreground">Target Colleges</p>
                    <p className="text-lg font-bold">5</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6">
                <h3 className="font-medium mb-4">Application Status</h3>
                <div className="space-y-4">
                  {[
                    { college: "IIT Delhi", status: "In Progress", date: "Applied on Apr 15, 2023" },
                    { college: "NIT Trichy", status: "Submitted", date: "Applied on Apr 10, 2023" },
                    { college: "BITS Pilani", status: "Payment Pending", date: "Applied on Apr 5, 2023" },
                  ].map((app, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <span>🏛️</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{app.college}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={app.status === "Submitted" ? "default" : "outline"}>{app.status}</Badge>
                          <p className="text-xs text-muted-foreground">{app.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard title="Upcoming Payments">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                  <span>💳</span>
                </div>
                <div>
                  <p className="font-medium text-sm">BITS Pilani Application Fee</p>
                  <p className="text-xs text-muted-foreground">₹3,500</p>
                  <Badge variant="outline" className="mt-1 text-xs text-red-500">
                    Due in 3 days
                  </Badge>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                  <span>💳</span>
                </div>
                <div>
                  <p className="font-medium text-sm">NIT Counseling Fee</p>
                  <p className="text-xs text-muted-foreground">₹35,000</p>
                  <Badge variant="outline" className="mt-1 text-xs">
                    Due in 15 days
                  </Badge>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <span>💳</span>
                </div>
                <div>
                  <p className="font-medium text-sm">JEE Advanced Registration</p>
                  <p className="text-xs text-muted-foreground">₹2,800</p>
                  <Badge variant="outline" className="mt-1 text-xs">
                    Due in 7 days
                  </Badge>
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <DashboardCard title="College Recommendations" className="md:col-span-2">
            <div className="space-y-4">
              {[
                {
                  name: "Indian Institute of Technology, Delhi",
                  match: 92,
                  fees: "₹2.2 Lakhs per year",
                  placement: "Average CTC: 25 LPA",
                },
                {
                  name: "National Institute of Technology, Trichy",
                  match: 88,
                  fees: "₹1.8 Lakhs per year",
                  placement: "Average CTC: 18 LPA",
                },
                {
                  name: "Birla Institute of Technology and Science, Pilani",
                  match: 85,
                  fees: "₹2.5 Lakhs per year",
                  placement: "Average CTC: 22 LPA",
                },
              ].map((college, index) => (
                <div key={index} className="flex items-start gap-4 p-3 border rounded-md">
                  <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                    <span className="text-lg">🏛️</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm truncate">{college.name}</p>
                      <Badge className="ml-2 bg-green-500">{college.match}% Match</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">Fees:</span> {college.fees}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">Placement:</span> {college.placement}
                      </p>
                    </div>
                    <div className="flex justify-end mt-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard title="Notifications">
            <div className="space-y-3">
              <NotificationItem
                title="Payment Reminder"
                description="BITS Pilani application fee payment is due in 3 days."
                time="2 hours ago"
                icon={<Bell className="h-4 w-4 text-primary" />}
                priority="high"
              />
              <NotificationItem
                title="Counseling Session Scheduled"
                description="Career guidance session with Dr. Mehta on May 10, 2023."
                time="Yesterday"
                icon={<Bell className="h-4 w-4 text-primary" />}
                isRead={true}
                priority="medium"
              />
              <NotificationItem
                title="JEE Main Results"
                description="Rahul scored 96.8 percentile in JEE Main 2023."
                time="3 days ago"
                icon={<Bell className="h-4 w-4 text-primary" />}
                isRead={true}
                priority="low"
              />
            </div>
          </DashboardCard>
        </div>

        <DashboardCard title="Financial Overview">
          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
            <div>
              <h3 className="font-medium mb-4">Estimated Education Budget</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm">Tuition Fees (4 years)</p>
                  <p className="font-medium">₹8,00,000</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm">Hostel & Mess (4 years)</p>
                  <p className="font-medium">₹4,00,000</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm">Books & Supplies</p>
                  <p className="font-medium">₹1,00,000</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm">Miscellaneous</p>
                  <p className="font-medium">₹2,00,000</p>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <p className="font-medium">Total Estimated Cost</p>
                  <p className="font-bold">₹15,00,000</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-4">Scholarship & Loan Options</h3>
              <div className="space-y-4">
                <div className="border rounded-md p-3">
                  <p className="font-medium text-sm">Merit Scholarship</p>
                  <p className="text-xs text-muted-foreground mt-1">Up to 50% tuition waiver based on JEE rank</p>
                  <Button size="sm" variant="outline" className="mt-2">
                    Check Eligibility
                  </Button>
                </div>
                <div className="border rounded-md p-3">
                  <p className="font-medium text-sm">Education Loan</p>
                  <p className="text-xs text-muted-foreground mt-1">8.5% interest rate with 10-year repayment</p>
                  <Button size="sm" variant="outline" className="mt-2">
                    Explore Options
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    </DashboardLayout>
  )
}

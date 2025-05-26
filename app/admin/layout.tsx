import type { ReactNode } from "react"
import { redirect } from "next/navigation"
import AdminSidebar from "@/components/admin/admin-sidebar"
import AdminHeader from "@/components/admin/admin-header"

// This is a simple auth check - in a real app, you would use a proper auth solution
const isAuthenticated = () => {
  // Replace with actual auth logic
  return true
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  // Check if user is authenticated
  if (!isAuthenticated()) {
    redirect("/auth/login")
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <AdminSidebar />
      <div className="flex flex-col flex-1 w-full">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto bg-muted/30 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

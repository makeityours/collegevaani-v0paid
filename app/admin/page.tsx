import MonetizationToggles from "@/components/admin/monetization-toggles"

export default function AdminPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* Existing dashboard content (example) */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Dashboard Overview</h2>
        <p>Welcome to the admin dashboard. Here you can manage various aspects of the application.</p>
      </div>

      <div className="mt-8">
        <MonetizationToggles />
      </div>
    </div>
  )
}

import SEOOptimizationPanel from "@/components/seo-optimization-panel"

export default function SEOManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">SEO Management</h1>
          <p className="text-muted-foreground">Optimize your content for better search engine rankings</p>
        </div>
      </div>
      <SEOOptimizationPanel />
    </div>
  )
}

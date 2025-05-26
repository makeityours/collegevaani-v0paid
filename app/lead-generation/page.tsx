import ComprehensiveLeadSystem from "@/components/lead-generation/comprehensive-lead-system"

export default function LeadGenerationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Get Expert Education Counseling</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Connect with our expert counselors to get personalized guidance for your education journey. Fill out our forms
          to receive tailored recommendations and support.
        </p>
      </div>
      <ComprehensiveLeadSystem />
    </div>
  )
}

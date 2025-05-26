import ComprehensiveEngagementSystem from "@/components/engagement/comprehensive-engagement-system"

export default function EngagementPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Student Community & Engagement</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Join our interactive community with quizzes, forums, live sessions, and resources to enhance your learning
          journey.
        </p>
      </div>
      <ComprehensiveEngagementSystem />
    </div>
  )
}

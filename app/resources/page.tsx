import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calculator, BookOpen, GraduationCap, Download, Users, Target, Award, FileText, Video } from "lucide-react"

export default function ResourcesPage() {
  const resources = [
    {
      title: "College Predictor",
      description: "Predict colleges based on your exam scores and preferences",
      icon: Calculator,
      href: "/resources/college-predictor",
      badge: "Popular",
      color: "bg-blue-500",
    },
    {
      title: "Study Materials",
      description: "Free study resources for various entrance exams",
      icon: BookOpen,
      href: "/resources/study-material",
      badge: "Free",
      color: "bg-green-500",
    },
    {
      title: "Scholarships",
      description: "Find scholarships to fund your education",
      icon: Award,
      href: "/resources/scholarships",
      badge: "Updated",
      color: "bg-yellow-500",
    },
    {
      title: "Career Guidance",
      description: "Expert advice on choosing the right career path",
      icon: Target,
      href: "/resources/career-guidance",
      badge: "Expert",
      color: "bg-purple-500",
    },
    {
      title: "Student Community",
      description: "Join quizzes, forums, and interactive sessions",
      icon: Users,
      href: "/engagement",
      badge: "Interactive",
      color: "bg-indigo-500",
    },
    {
      title: "Get Counseling",
      description: "Free personalized education counseling",
      icon: GraduationCap,
      href: "/lead-generation",
      badge: "Free",
      color: "bg-orange-500",
    },
  ]

  const studyMaterials = [
    { title: "JEE Main Syllabus 2024", type: "PDF", downloads: "12.5K" },
    { title: "NEET Biology Notes", type: "PDF", downloads: "8.9K" },
    { title: "CAT Preparation Guide", type: "PDF", downloads: "6.7K" },
    { title: "Engineering College Rankings", type: "Excel", downloads: "15.2K" },
    { title: "Scholarship Application Forms", type: "ZIP", downloads: "4.3K" },
    { title: "Career Guidance Videos", type: "Video", downloads: "9.8K" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Educational Resources</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Access comprehensive resources to guide your educational journey. From college predictors to study materials,
          we have everything you need to make informed decisions.
        </p>
      </div>

      {/* Main Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {resources.map((resource, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-full ${resource.color} text-white`}>
                  <resource.icon className="h-6 w-6" />
                </div>
                <Badge variant="secondary">{resource.badge}</Badge>
              </div>
              <CardTitle className="text-xl">{resource.title}</CardTitle>
              <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href={resource.href}>Explore Resource</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Access Study Materials */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Popular Downloads
          </CardTitle>
          <CardDescription>Most downloaded study materials and resources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {studyMaterials.map((material, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-blue-100">
                    {material.type === "Video" ? (
                      <Video className="h-4 w-4 text-blue-600" />
                    ) : (
                      <FileText className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{material.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {material.type} • {material.downloads} downloads
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Personalized Guidance?</h2>
          <p className="mb-6 text-blue-100">
            Get expert counseling tailored to your specific needs and goals. Our education experts are here to help you
            succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg">
              <Link href="/lead-generation">Get Free Counseling</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-white border-white hover:bg-white hover:text-blue-600"
            >
              <Link href="/engagement">Join Community</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

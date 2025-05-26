"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Check, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

  const plans = [
    {
      name: "Free",
      description: "Perfect for exploring colleges",
      price: { monthly: 0, yearly: 0 },
      badge: null,
      features: [
        "Browse 1000+ colleges",
        "Basic college comparison",
        "Exam calendar access",
        "Community forum access",
        "Email support",
      ],
      limitations: ["Limited to 3 college comparisons", "Basic search filters", "Standard support"],
      cta: "Get Started",
      popular: false,
      gradient: "from-gray-500 to-gray-600",
    },
    {
      name: "Pro",
      description: "Best for serious college seekers",
      price: { monthly: 999, yearly: 7999 },
      badge: "Most Popular",
      features: [
        "Everything in Free",
        "Unlimited college comparisons",
        "Advanced search filters",
        "Personalized recommendations",
        "Expert counseling sessions (2/month)",
        "Premium study materials",
        "Priority support",
        "Application tracking",
        "Scholarship alerts",
      ],
      limitations: [],
      cta: "Start Pro Trial",
      popular: true,
      gradient: "from-indigo-600 to-purple-600",
    },
    {
      name: "Premium",
      description: "Complete college admission solution",
      price: { monthly: 1999, yearly: 15999 },
      badge: "Best Value",
      features: [
        "Everything in Pro",
        "Unlimited expert counseling",
        "1-on-1 admission guidance",
        "Essay review & editing",
        "Mock interviews",
        "Dedicated counselor",
        "Application assistance",
        "Scholarship application help",
        "Career guidance",
        "Alumni network access",
      ],
      limitations: [],
      cta: "Go Premium",
      popular: false,
      gradient: "from-purple-600 to-pink-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <Badge
              variant="outline"
              className="bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border-indigo-200"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Flexible Pricing Plans
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Perfect Plan
              </span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Get the right tools and support for your college admission journey. Start free and upgrade anytime.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className={`text-sm font-medium ${!isYearly ? "text-indigo-600" : "text-gray-500"}`}>Monthly</span>
              <Switch checked={isYearly} onCheckedChange={setIsYearly} className="data-[state=checked]:bg-indigo-600" />
              <span className={`text-sm font-medium ${isYearly ? "text-indigo-600" : "text-gray-500"}`}>Yearly</span>
              <Badge className="bg-green-500 text-white ml-2">Save 33%</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={plan.name}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                  plan.popular
                    ? "border-indigo-200 shadow-xl scale-105 md:scale-110"
                    : "border-gray-200 hover:border-indigo-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-purple-600" />
                )}

                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className={`bg-gradient-to-r ${plan.gradient} text-white px-4 py-1`}>{plan.badge}</Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600 mt-2">{plan.description}</CardDescription>

                  <div className="mt-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-gray-900">
                        ₹{isYearly ? plan.price.yearly : plan.price.monthly}
                      </span>
                      {plan.price.monthly > 0 && (
                        <span className="text-gray-500 ml-2">/{isYearly ? "year" : "month"}</span>
                      )}
                    </div>

                    {isYearly && plan.price.monthly > 0 && (
                      <div className="mt-2">
                        <span className="text-sm text-gray-500 line-through">₹{plan.price.monthly * 12}/year</span>
                        <span className="text-sm text-green-600 ml-2 font-medium">
                          Save ₹{plan.price.monthly * 12 - plan.price.yearly}
                        </span>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    asChild
                    className={`w-full ${
                      plan.popular
                        ? `bg-gradient-to-r ${plan.gradient} hover:opacity-90 shadow-lg hover:shadow-xl`
                        : "border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    <Link href={plan.price.monthly === 0 ? "/auth/register" : "/checkout"}>
                      {plan.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>

                  {plan.price.monthly > 0 && (
                    <p className="text-xs text-gray-500 text-center">7-day free trial • Cancel anytime</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Compare All Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See exactly what's included in each plan to make the best choice for your needs.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Features</th>
                  {plans.map((plan) => (
                    <th key={plan.name} className="text-center py-4 px-6">
                      <div className="font-medium text-gray-900">{plan.name}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        ₹{isYearly ? plan.price.yearly : plan.price.monthly}
                        {plan.price.monthly > 0 && `/${isYearly ? "year" : "month"}`}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "College Database Access", free: "1000+", pro: "1000+", premium: "1000+" },
                  { feature: "College Comparisons", free: "3", pro: "Unlimited", premium: "Unlimited" },
                  { feature: "Expert Counseling", free: "❌", pro: "2/month", premium: "Unlimited" },
                  { feature: "Application Tracking", free: "❌", pro: "✅", premium: "✅" },
                  { feature: "Scholarship Alerts", free: "❌", pro: "✅", premium: "✅" },
                  { feature: "1-on-1 Guidance", free: "❌", pro: "❌", premium: "✅" },
                  { feature: "Essay Review", free: "❌", pro: "❌", premium: "✅" },
                  { feature: "Mock Interviews", free: "❌", pro: "❌", premium: "✅" },
                  { feature: "Dedicated Counselor", free: "❌", pro: "❌", premium: "✅" },
                  { feature: "Alumni Network", free: "❌", pro: "❌", premium: "✅" },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium text-gray-900">{row.feature}</td>
                    <td className="py-4 px-6 text-center text-gray-700">{row.free}</td>
                    <td className="py-4 px-6 text-center text-gray-700">{row.pro}</td>
                    <td className="py-4 px-6 text-center text-gray-700">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions? We've got answers to help you choose the right plan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "Can I change my plan anytime?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
              },
              {
                question: "Is there a free trial?",
                answer: "Yes, all paid plans come with a 7-day free trial. No credit card required to start.",
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, debit cards, UPI, and net banking through Razorpay.",
              },
              {
                question: "Can I cancel my subscription?",
                answer:
                  "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
              },
            ].map((faq, index) => (
              <Card key={index} className="border-indigo-100">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your College Journey?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have found their perfect college with CollegeVaani.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
              <Link href="/auth/register">Start Free Trial</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              <Link href="/lead-generation">Talk to Expert</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

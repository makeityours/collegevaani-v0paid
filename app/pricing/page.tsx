"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Check, Star, Zap, Crown, Rocket } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

  const plans = [
    {
      name: "Free",
      description: "Perfect for exploring colleges",
      price: { monthly: 0, yearly: 0 },
      icon: Star,
      features: [
        "Browse 1000+ colleges",
        "Basic college comparison (up to 3)",
        "Access to exam dates",
        "Community forum access",
        "Basic career guidance articles",
        "Email support",
      ],
      limitations: ["Limited to 5 college applications per month", "Basic filters only", "No priority support"],
      cta: "Get Started Free",
      popular: false,
    },
    {
      name: "Premium",
      description: "For serious college seekers",
      price: { monthly: 499, yearly: 4990 },
      icon: Zap,
      features: [
        "Everything in Free",
        "Unlimited college comparisons",
        "Advanced filters & search",
        "Personalized college recommendations",
        "Priority counselor support",
        "Scholarship alerts",
        "Application deadline reminders",
        "Mock interview sessions (2/month)",
        "Premium study materials",
        "Ad-free experience",
      ],
      cta: "Start Premium Trial",
      popular: true,
    },
    {
      name: "Pro",
      description: "For comprehensive guidance",
      price: { monthly: 999, yearly: 9990 },
      icon: Crown,
      features: [
        "Everything in Premium",
        "1-on-1 counselor sessions (4/month)",
        "Application essay review",
        "Interview preparation",
        "Scholarship application assistance",
        "Direct college representative contact",
        "Priority application processing",
        "Custom college visit planning",
        "Career pathway analysis",
        "Alumni network access",
      ],
      cta: "Go Pro",
      popular: false,
    },
    {
      name: "Enterprise",
      description: "For schools & institutions",
      price: { monthly: 2499, yearly: 24990 },
      icon: Rocket,
      features: [
        "Everything in Pro",
        "Bulk student management",
        "Institution dashboard",
        "Custom branding",
        "API access",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced analytics",
        "White-label solutions",
        "24/7 priority support",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-xl text-muted-foreground mb-8">Find the perfect plan to accelerate your college journey</p>

        <div className="flex items-center justify-center gap-4 mb-8">
          <span className={!isYearly ? "font-medium" : "text-muted-foreground"}>Monthly</span>
          <Switch checked={isYearly} onCheckedChange={setIsYearly} />
          <span className={isYearly ? "font-medium" : "text-muted-foreground"}>
            Yearly
            <Badge className="ml-2 bg-green-100 text-green-700">Save 17%</Badge>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan, index) => (
          <Card key={index} className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}>
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">Most Popular</Badge>
            )}
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                <plan.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">₹{isYearly ? plan.price.yearly : plan.price.monthly}</span>
                {plan.price.monthly > 0 && (
                  <span className="text-muted-foreground">/{isYearly ? "year" : "month"}</span>
                )}
              </div>
              {isYearly && plan.price.monthly > 0 && (
                <p className="text-sm text-green-600">Save ₹{plan.price.monthly * 12 - plan.price.yearly} per year</p>
              )}
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full" variant={plan.popular ? "default" : "outline"} asChild>
                <Link href={plan.name === "Enterprise" ? "/contact" : `/checkout?plan=${plan.name.toLowerCase()}`}>
                  {plan.cta}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="text-left">
            <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
            </p>
          </div>
          <div className="text-left">
            <h3 className="font-semibold mb-2">Is there a free trial?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, Premium and Pro plans come with a 7-day free trial. No credit card required.
            </p>
          </div>
          <div className="text-left">
            <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
            <p className="text-sm text-muted-foreground">
              We accept all major credit cards, debit cards, UPI, and net banking through Razorpay.
            </p>
          </div>
          <div className="text-left">
            <h3 className="font-semibold mb-2">Can I get a refund?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, we offer a 30-day money-back guarantee for all paid plans.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

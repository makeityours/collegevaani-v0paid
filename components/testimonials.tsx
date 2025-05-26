"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    college: "IIT Delhi",
    course: "B.Tech Computer Science",
    image: "/placeholder.svg?height=80&width=80",
    quote:
      "CollegeVaani helped me find my dream college. The detailed information about IIT Delhi and the comparison tools made my decision easy. I'm now pursuing my B.Tech in Computer Science!",
  },
  {
    id: 2,
    name: "Rahul Verma",
    college: "AIIMS New Delhi",
    course: "MBBS",
    image: "/placeholder.svg?height=80&width=80",
    quote:
      "The exam preparation resources and college predictor on CollegeVaani were invaluable for my NEET preparation. I got into AIIMS, which was my top choice!",
  },
  {
    id: 3,
    name: "Ananya Patel",
    college: "IIM Ahmedabad",
    course: "MBA",
    image: "/placeholder.svg?height=80&width=80",
    quote:
      "The expert counseling and CAT preparation tips from CollegeVaani were game-changers. I secured admission to IIM Ahmedabad and couldn't be happier with my journey.",
  },
  {
    id: 4,
    name: "Vikram Singh",
    college: "NLSIU Bangalore",
    course: "LLB",
    image: "/placeholder.svg?height=80&width=80",
    quote:
      "Finding the right law school was challenging until I discovered CollegeVaani. Their comprehensive guides and alumni reviews helped me choose NLSIU Bangalore, which has been perfect for my career goals.",
  },
  {
    id: 5,
    name: "Meera Kapoor",
    college: "Delhi University",
    course: "B.A. Economics",
    image: "/placeholder.svg?height=80&width=80",
    quote:
      "The personalized college recommendations from CollegeVaani matched me perfectly with Delhi University's Economics program. The application guidance made the process stress-free!",
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  const handlePrev = () => {
    setAutoplay(false)
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setAutoplay(false)
    setActiveIndex((current) => (current + 1) % testimonials.length)
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-2 md:px-4">
              <Card className="border-none shadow-lg bg-primary/5 overflow-hidden">
                <CardHeader className="pb-2 relative">
                  <Quote className="absolute right-4 top-4 h-12 w-12 text-primary/10" />
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-lg italic text-muted-foreground">"{testimonial.quote}"</p>
                </CardContent>
                <CardFooter className="pt-4 border-t">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <CardDescription>
                        {testimonial.course}, {testimonial.college}
                      </CardDescription>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6 gap-1 md:gap-2">
        <Button variant="outline" size="icon" className="rounded-full" onClick={handlePrev}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous</span>
        </Button>

        {testimonials.map((_, index) => (
          <Button
            key={index}
            variant="outline"
            size="icon"
            className={`h-2 w-2 rounded-full p-0 ${index === activeIndex ? "bg-primary" : "bg-muted"}`}
            onClick={() => {
              setAutoplay(false)
              setActiveIndex(index)
            }}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </Button>
        ))}

        <Button variant="outline" size="icon" className="rounded-full" onClick={handleNext}>
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next</span>
        </Button>
      </div>
    </div>
  )
}

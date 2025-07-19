"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { FadeInSection } from "./fade-in-section"
import { TestimonialSkeleton } from "./skeleton-loader"

export function TestimonialsSection() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Patient",
      rating: 5,
      comment:
        "Excellent service and very accurate results. The staff is professional and the online booking system is so convenient. Highly recommended!",
      avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    },
    {
      name: "Michael Chen",
      role: "Business Executive",
      rating: 5,
      comment:
        "Fast turnaround time and detailed reports. The home collection service is a game-changer for busy professionals like me.",
      avatar: "/placeholder.svg?height=40&width=40&text=MC",
    },
    {
      name: "Emily Rodriguez",
      role: "Pet Owner",
      rating: 5,
      comment:
        "The veterinary testing for my dog was thorough and affordable. Great to see they care about our furry family members too!",
      avatar: "/placeholder.svg?height=40&width=40&text=ER",
    },
  ]

  if (isLoading) {
    return (
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Our Patients Say</h2>
            <p className="text-xl text-gray-600">
              Trusted by thousands of patients for accurate diagnostics and exceptional care.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <TestimonialSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Our Patients Say</h2>
            <p className="text-xl text-gray-600">
              Trusted by thousands of patients for accurate diagnostics and exceptional care.
            </p>
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <FadeInSection key={index} delay={index * 150}>
              <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700">{testimonial.comment}</p>
                  <div className="flex items-center gap-3">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}

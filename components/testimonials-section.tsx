"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect } from "react"
import { FadeInSection } from "./fade-in-section"
import { TestimonialSkeleton } from "./skeleton-loader"

export function TestimonialsSection() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Dog Owner",
      rating: 5,
      comment:
        "Excellent service and very accurate results. The staff is professional and the online booking system is so convenient. My Golden Retriever Max got his blood work done here and the results were detailed and easy to understand.",
      avatar: "/placeholder.svg?height=60&width=60&text=SJ",
      petName: "Max",
      petType: "Golden Retriever",
    },
    {
      name: "Michael Chen",
      role: "Dog Owner",
      rating: 5,
      comment:
        "Fast turnaround time and detailed reports. The home collection service is a game-changer for busy pet parents like me. Luna was comfortable during the sample collection process.",
      avatar: "/placeholder.svg?height=60&width=60&text=MC",
      petName: "Luna",
      petType: "Siberian Husky",
    },
    {
      name: "Emily Rodriguez",
      role: "Multi-Pet Owner",
      rating: 5,
      comment:
        "The veterinary testing for both my pets was thorough and affordable. Great to see they care about our furry family members with such dedication and expertise.",
      avatar: "/placeholder.svg?height=60&width=60&text=ER",
      petName: "Buddy",
      petType: "Labrador",
    },
    {
      name: "David Thompson",
      role: "Software Engineer",
      rating: 5,
      comment:
        "Specialized testing for my parrot was handled with great care. The staff understood the unique needs of avian patients and provided excellent service throughout.",
      avatar: "/placeholder.svg?height=60&width=60&text=DT",
      petName: "Charlie",
      petType: "Pug",
    },
    {
      name: "Lisa Park",
      role: "Designer",
      rating: 5,
      comment:
        "Home collection service was perfect for my anxious rabbit. The technician was gentle and experienced with small animals. Results came back quickly with clear explanations.",
      avatar: "/placeholder.svg?height=60&width=60&text=LP",
      petName: "Snowball",
      petType: "Spitz",
    },
    {
      name: "James Wilson",
      role: "Senior Pet Owner",
      rating: 5,
      comment:
        "Regular health monitoring for my 12-year-old dog has been made so easy with their comprehensive panels. The staff always explains everything clearly and with compassion.",
      avatar: "/placeholder.svg?height=60&width=60&text=JW",
      petName: "Rusty",
      petType: "Senior Beagle",
    },
  ]

  // Auto-advance testimonials
  useEffect(() => {
    if (!isLoading) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 5000) // Change every 5 seconds

      return () => clearInterval(interval)
    }
  }, [isLoading, testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
  }

  if (isLoading) {
    return (
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Pet Parents Say
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by hundreds of pet parents for accurate diagnostics and exceptional care.
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
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Pet Parents Say
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by hundreds of pet parents for accurate diagnostics and exceptional care.
            </p>
          </div>
        </FadeInSection>

        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial Display */}
          <div className="relative">
            <Card className="p-8 hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100">
              <CardContent className="space-y-6">
                {/* Rating Stars */}
                <div className="flex items-center justify-center gap-1">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-lg md:text-xl text-gray-700 text-center leading-relaxed italic">
                  "{testimonials[currentIndex].comment}"
                </blockquote>

                {/* Pet Info */}
                <div className="text-center">
                  <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                    Pet: {testimonials[currentIndex].petName} ({testimonials[currentIndex].petType})
                  </div>
                </div>

                {/* Author Info */}
                <div className="flex items-center justify-center gap-4">
                  <Image
                    src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    width={60}
                    height={60}
                    className="rounded-full border-4 border-blue-200"
                  />
                  <div className="text-center">
                    <div className="font-bold text-xl text-gray-900">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-blue-600 font-medium">
                      {testimonials[currentIndex].role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Arrows */}
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-blue-50 border-2 border-blue-200 shadow-lg"
            >
              <ChevronLeft className="h-5 w-5 text-blue-600" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-blue-50 border-2 border-blue-200 shadow-lg"
            >
              <ChevronRight className="h-5 w-5 text-blue-600" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-blue-600 scale-125"
                    : "bg-gray-300 hover:bg-blue-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="bg-gray-200 rounded-full h-1">
              <div
                className="bg-blue-600 h-1 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${((currentIndex + 1) / testimonials.length) * 100}%` }}
              />
            </div>
            <div className="text-center mt-2 text-sm text-gray-500">
              {currentIndex + 1} of {testimonials.length}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { AnimatedCounter } from "./animated-counter"
import { FadeInSection } from "./fade-in-section"
import { BookingModal } from "./booking-modal"

export function HeroSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  return (
    <section id="home" className="bg-gradient-to-br from-blue-50 to-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeInSection>
            <div className="space-y-6">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Trusted Healthcare Partner</Badge>

              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Precision in Every Test,
                <span className="text-blue-600"> Care in Every Result</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Advanced diagnostic solutions with state-of-the-art technology and expert pathologists. Your health is
                our priority, accuracy is our promise.
              </p>

              <div className="bg-orange-100 border-l-4 border-orange-500 p-4 rounded-r-lg">
                <div className="flex items-center">
                  <Award className="h-6 w-6 text-orange-500 mr-2" />
                  <span className="text-lg font-semibold text-orange-800">
                    Special Offer: 30% off on indie dogs testing packages!
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                onClick={() => setIsBookingModalOpen(true)} 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700">
                  Schedule Test Now
                </Button>
                {/* <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                >
                  View Test Packages
                </Button> */}
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <AnimatedCounter end={500} suffix="+" />
                  <div className="text-sm text-gray-600">Tests Completed</div>
                </div>
                <div className="text-center">
                  <AnimatedCounter end={100} suffix="%" />
                  <div className="text-sm text-gray-600">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <AnimatedCounter end={24} suffix="/7" />
                  <div className="text-sm text-gray-600">Support</div>
                </div>
              </div>
            </div>
          </FadeInSection>

          <div className="relative ml-12">
            <Image
              src="/hero.jpg"
              alt="Modern pathological laboratory"
              width={500}
              height={600}
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">ISO Certified</div>
                  <div className="text-sm text-gray-600">Quality Assured</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </section>
  )
}

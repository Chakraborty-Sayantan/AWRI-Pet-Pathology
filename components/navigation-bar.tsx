"use client"
import { Microscope } from "lucide-react"
import Link from "next/link"
import { MobileNavigation } from "./mobile-navigation"
import { DarkModeToggle } from "./dark-mode-toggle"
import { BookingModal } from "./booking-modal"
import { useState } from "react"

export function NavigationBar() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  return (
    <nav className="bg-white shadow-md border-b dark:bg-gray-900 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <img
              src="/logo.png"
              alt="AWRI Logo"
              className="h-12 w-20 object-contain"
            />
            <span className="text-xl font-bold text-gray-800 dark:text-gray-200">AWRI (Animal Wellness Research Institute)</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#home"
              className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400"
            >
              Home
            </Link>
            <Link
              href="#services"
              className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400"
            >
              Workflow
            </Link>
        {/*     <Link
              href="#about"
              className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400"
            >
              About
            </Link> */}
            <Link
              href="#testimonials"
              className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400"
            >
              Testimonials
            </Link>
            <Link
              href="#contact"
              className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400"
            >
              Contact
            </Link>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              Book Test
            </button>
            <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
          </div>

          <MobileNavigation />
        </div>
      </div>
    </nav>
  )
}

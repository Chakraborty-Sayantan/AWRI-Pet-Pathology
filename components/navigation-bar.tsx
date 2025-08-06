"use client"
import { Microscope } from "lucide-react"
import Link from "next/link"
import { MobileNavigation } from "./mobile-navigation"
import { DarkModeToggle } from "./dark-mode-toggle"
import { BookingModal } from "./booking-modal"
import { useState } from "react"

export function NavigationBar() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    
    // If on a different page, navigate to home first
    if (window.location.pathname !== '/') {
        window.location.href = `/${href}`;
        return;
    }

    const element = document.querySelector(href) as HTMLElement
    if (element) {
      const elementTop = element.offsetTop
      const isMobile = window.innerWidth < 768
      const offset = isMobile ? 140 : 120
      const targetPosition = elementTop - offset

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      })
    }
  }

  return (
    <nav className="bg-white shadow-md border-b dark:bg-gray-900 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="/logo.png"
              alt="AWRI Logo"
              className="h-12 w-20 object-contain transition-transform duration-300 hover:scale-110 hover:rotate-0"
            />
            <span className="text-xl font-bold text-gray-800 dark:text-gray-200">AWRI (Animal Wellness Research Institute)</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400"
            >
              Home
            </Link>
            <Link
              href="/track-booking"
              className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400"
            >
              Track Booking
            </Link>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, "#services")}
              className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400 cursor-pointer"
            >
              Workflow
            </a>
            <a
              href="#testimonials"
              onClick={(e) => handleNavClick(e, "#testimonials")}
              className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400 cursor-pointer"
            >
              Testimonials
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400 cursor-pointer"
            >
              Contact
            </a>
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

"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"
import { BookingModal } from "./booking-modal"

export function MobileNavigation() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Workflow", href: "#services" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsSheetOpen(false)
    
    // Use setTimeout to ensure the sheet closes before scrolling
    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        // Different offset for mobile vs desktop
        const isMobile = window.innerWidth < 768
        const headerOffset = isMobile ? 140 : 120 // Account for sticky header + navigation
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        })
      }
    }, 150)
  }

  return (
    <div className="md:hidden">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="p-2">
            <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b">
              <div className="flex items-center space-x-2">
                <img
                  src="/logo.png"
                  alt="AWRI Logo"
                  className="h-12 w-20 object-contain"
                />
                <span className="text-lg font-bold text-gray-800 dark:text-gray-200">AWRI</span>
              </div>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 py-6">
              <div className="space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="block py-3 px-4 text-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 cursor-pointer"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </nav>

            {/* CTA Button */}
            <div className="pt-6 border-t">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                onClick={() => {
                  setIsBookingModalOpen(true)
                  setIsSheetOpen(false)
                }}
              >
                Book Test Now
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </div>
  )
}

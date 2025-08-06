"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"
import { BookingModal } from "./booking-modal"

export function MobileNavigation() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "/", isExternal: false },
    { name: "Workflow", href: "#services", isExternal: false },
    { name: "Testimonials", href: "#testimonials", isExternal: false },
    { name: "Contact", href: "#contact", isExternal: false },
    { name: "Track Booking", href: "/track-booking", isExternal: true },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsSheetOpen(false)

    if (window.location.pathname !== '/') {
      window.location.href = `/${href}`;
      return;
  }
    
    setTimeout(() => {
      const element = document.querySelector(href) as HTMLElement
      if (element) {
        const elementTop = element.offsetTop
        const offset = 140
        const targetPosition = elementTop - offset

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        })
      }
    }, 300)
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
            <div className="flex items-center justify-between pb-6 border-b">
              <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2" onClick={() => setIsSheetOpen(false)}>
                <img
                  src="/logo.png"
                  alt="AWRI Logo"
                  className="h-12 w-20 object-contain"
                />
                <span className="text-lg font-bold text-gray-800 dark:text-gray-200">AWRI</span>
                </Link>
              </div>
            </div>

            <nav className="flex-1 py-6">
              <div className="space-y-4">
                {navItems.map((item) => (
                  item.isExternal ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsSheetOpen(false)}
                      className="block py-3 px-4 text-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 cursor-pointer"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="block py-3 px-4 text-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 cursor-pointer"
                    >
                      {item.name}
                    </a>
                  )
                ))}
              </div>
            </nav>

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

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </div>
  )
}

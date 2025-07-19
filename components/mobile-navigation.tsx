"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Microscope, Menu, X } from "lucide-react"
import Link from "next/link"

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ]

  const closeMenu = () => setIsOpen(false)

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="p-2">
            <Menu className="h-6 w-6 text-gray-700" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b">
              <div className="flex items-center space-x-2">
                <Microscope className="h-6 w-6 text-blue-600" />
                <span className="text-lg font-bold text-gray-800">Company Name</span>
              </div>
              <Button variant="ghost" size="icon" onClick={closeMenu}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 py-6">
              <div className="space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeMenu}
                    className="block py-3 px-4 text-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>

            {/* CTA Button */}
            <div className="pt-6 border-t">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3" onClick={closeMenu}>
                Book Test Now
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

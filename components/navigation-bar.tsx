import { Microscope } from "lucide-react"
import Link from "next/link"
import { MobileNavigation } from "./mobile-navigation"
import { DarkModeToggle } from "./dark-mode-toggle"
import { BookingModal } from "./booking-modal"

export function NavigationBar() {
  return (
    <nav className="bg-white shadow-md border-b dark:bg-gray-900 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Microscope className="h-8 w-8 text-blue-600 dark:text-blue-500" />
            <span className="text-xl font-bold text-gray-800 dark:text-gray-200">Company Name</span>
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
              Services
            </Link>
            <Link
              href="#about"
              className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400"
            >
              About
            </Link>
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
            <BookingModal />
          </div>

          <MobileNavigation />
        </div>
      </div>
    </nav>
  )
}

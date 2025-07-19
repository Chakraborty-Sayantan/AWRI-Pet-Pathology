"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <Button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-300 ease-in-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
      )}
      size="icon"
    >
      <ArrowUp className="h-5 w-5" />
      <span className="sr-only">Scroll to top</span>
    </Button>
  )
}

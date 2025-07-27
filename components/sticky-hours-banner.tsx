"use client"

import { Clock, Phone, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

export function StickyHoursBanner() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="sticky top-0 z-50 bg-blue-600 text-white">
      {/* Mobile View - Collapsible */}
      <div className="md:hidden">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              <span className="font-medium">Hours:</span>
              <span>7AM-8PM</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4" />
              <span>+91 9163522664</span>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-blue-700 rounded transition-colors"
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>
          
          {/* Expanded Mobile View */}
          {isExpanded && (
            <div className="mt-2 pt-2 border-t border-blue-500 text-xs space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">Full Hours:</span>
              </div>
              <div>Mon-Fri: 7:00 AM - 8:00 PM</div>
              <div>Sat: 8:00 AM - 6:00 PM</div>
              <div>Sun: 9:00 AM - 4:00 PM</div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop View - Full Information */}
      <div className="hidden md:block py-2 px-4">
        <div className="container mx-auto flex items-center justify-center gap-4 text-sm">
          <Clock className="h-4 w-4" />
          <span className="font-medium">Operating Hours:</span>
          <span>Mon-Fri: 7:00 AM - 8:00 PM | Sat: 8:00 AM - 6:00 PM | Sun: 9:00 AM - 4:00 PM</span>
          <Phone className="h-4 w-4"/>
          <span className="font-medium">Phone Number:</span>
          <span>+91 9163522664</span>
        </div>
      </div>
    </div>
  )
}

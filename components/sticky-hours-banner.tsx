import { Clock } from "lucide-react"

export function StickyHoursBanner() {
  return (
    <div className="sticky top-0 z-50 bg-blue-600 text-white py-2 px-4">
      <div className="container mx-auto flex items-center justify-center gap-4 text-sm">
        <Clock className="h-4 w-4" />
        <span className="font-medium">Operating Hours:</span>
        <span>Mon-Fri: 7:00 AM - 8:00 PM | Sat: 8:00 AM - 6:00 PM | Sun: 9:00 AM - 4:00 PM</span>
      </div>
    </div>
  )
}

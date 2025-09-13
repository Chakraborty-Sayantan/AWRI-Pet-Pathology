"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"
import { NavigationBar } from "@/components/navigation-bar"
import { FooterSection } from "@/components/footer-section"
import { BookingStatusCard } from "@/components/booking-status-card"
import { LoadingSpinner } from "@/components/loading-spinner"


interface Booking {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  appointment_date: string;
  time_slot: string;
  total_price: string;
  created_at: string;
  results_url: string | null;
  results_filename: string | null;
}

export default function TrackBookingPage() {
  const [phone, setPhone] = useState("")
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [searched, setSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setBookings([])
    setSearched(true)

    try {
      // Note: We need to include the +91 prefix for the search
      const searchPhone = "+91" + phone;
      const response = await fetch(`http://localhost:5000/api/bookings/search?phone=${encodeURIComponent(searchPhone)}`)

      if (response.status === 404) {
        setError("No bookings found for this phone number.")
      } else if (!response.ok) {
        throw new Error("Something went wrong. Please try again later.")
      } else {
        const data = await response.json()
        setBookings(data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavigationBar />
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Track Your Booking
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Enter the 10-digit phone number you used to book your appointment to see its status.
            </p>
          </div>

          <Card className="max-w-xl mx-auto bg-gray-50">
            <CardContent className="p-6">
              <form onSubmit={handleSearch} className="flex items-center gap-4">
                <div className="flex-1 relative bg-gray-50">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">+91</span>
                  <Input
                    type="tel"
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-12"
                    required
                  />
                </div>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <LoadingSpinner size="sm" /> : <Search className="h-4 w-4" />}
                  <span className="ml-2 hidden sm:inline">Search</span>
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-12 max-w-3xl mx-auto">
            {isLoading && (
              <div className="flex justify-center">
                <LoadingSpinner />
              </div>
            )}
            {error && <p className="text-center text-red-500">{error}</p>}
            {!isLoading && !error && searched && bookings.length === 0 && (
                 <p className="text-center text-gray-500">No bookings found.</p>
            )}
            <div className="space-y-6">
              {bookings.map((booking) => (
                <BookingStatusCard key={booking.id} booking={booking} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  )
}

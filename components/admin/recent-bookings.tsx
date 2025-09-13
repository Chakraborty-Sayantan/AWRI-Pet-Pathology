"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Booking {
  id: number;
  full_name: string;
  total_price: string;
  created_at: string;
}

export function RecentBookings({ bookings }: { bookings: Booking[] }) {
  return (
    <Card className="bg-gray-50 text-gray-800">
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-gray-800">
        {bookings.map((booking) => (
          <div key={booking.id} className="flex items-center">
            <Avatar className="h-9 w-9 text-gray-200">
              <AvatarFallback>
                {booking.full_name ? booking.full_name.charAt(0).toUpperCase() : 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1 text-gray-800">
              <p className="text-sm font-medium leading-none">{booking.full_name || "N/A"}</p>
              <p className="text-sm text-muted-background">{new Date(booking.created_at).toLocaleDateString()}</p>
            </div>
            <div className="ml-auto font-medium">
                <Badge variant="outline" className="text-gray-900">₹{parseFloat(booking.total_price).toFixed(2)}</Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

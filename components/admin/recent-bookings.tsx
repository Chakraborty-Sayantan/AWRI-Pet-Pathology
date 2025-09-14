"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Booking } from "./bookings-table";


export function RecentBookings({ bookings }: { bookings: Booking[] }) {
  return (
    <Card className="bg-white text-gray-800">
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
              <div className="flex items-center gap-2">
                 <span className={cn("h-2 w-2 rounded-full", booking.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500')} />
                 <p className="text-sm font-medium leading-none">{booking.full_name || "N/A"}</p>
              </div>
              <p className="text-sm text-muted-foreground">{new Date(booking.created_at).toLocaleDateString()}</p>
            </div>
            <div className="ml-auto text-right">
              <div className="font-medium">
                {isNaN(parseFloat(booking.total_price)) ? 'N/A' : `₹${parseFloat(booking.total_price).toFixed(2)}`}
              </div>
               <Badge variant="outline" className="mt-1">
                 {booking.tests.length} {booking.tests.length === 1 ? 'test' : 'tests'}
               </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
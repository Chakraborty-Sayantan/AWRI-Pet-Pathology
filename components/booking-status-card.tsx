import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Phone, IndianRupee } from "lucide-react"

interface Booking {
  id: number;
  full_name: string;
  phone: string;
  appointment_date: string;
  time_slot: string;
  total_price: string;
}

export function BookingStatusCard({ booking }: { booking: Booking }) {
  return (
    <Card className="w-full shadow-md hover:shadow-xl transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-t-lg p-4">
        <CardTitle className="text-lg">Booking ID: #{booking.id}</CardTitle>
        <Badge>Pending</Badge>
      </CardHeader>
      <CardContent className="p-6 grid gap-4 md:grid-cols-2">
        <div className="flex items-center gap-3">
          <User className="h-5 w-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{booking.full_name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="h-5 w-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{booking.phone}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Appointment Date</p>
            <p className="font-medium">{new Date(booking.appointment_date).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Time Slot</p>
            <p className="font-medium">{booking.time_slot}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 dark:bg-gray-800 rounded-b-lg p-4 flex justify-end items-center">
        <div className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-white">
            <IndianRupee className="h-5 w-5" />
            <span>{parseFloat(booking.total_price).toFixed(2)}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

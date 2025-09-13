"use client"

import useAuth from '@/components/hooks/useAuth';
import { BookingsTable } from "@/components/admin/bookings-table"
import { FadeInSection } from "@/components/fade-in-section"

export default function BookingsPage() { 
  useAuth();
  return (
    <div className="space-y-8">
      <FadeInSection>
        <h1 className="text-3xl font-bold text-gray-800">All Bookings</h1>
        <p className="text-gray-500">View and manage all test bookings.</p>
      </FadeInSection>
      <FadeInSection delay={100}>
        <BookingsTable />
      </FadeInSection>
    </div>
  )
  
}

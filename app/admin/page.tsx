"use client"

import { useEffect, useState } from "react"
import useAuth from '@/components/hooks/useAuth';
import { StatCard } from "@/components/admin/stat-card"
import { RecentBookings } from "@/components/admin/recent-bookings"
import { LocationStats } from "@/components/admin/location-stats"
import { PincodeStats } from "@/components/admin/pincode-stats"
import { MonthlyBookingsChart } from "@/components/admin/monthly-bookings-chart"
import { PopularTestsCard } from "@/components/admin/popular-tests-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ClipboardList, MessageSquare, IndianRupeeIcon, TestTube } from "lucide-react"
import { FadeInSection } from "@/components/fade-in-section"
import io from 'socket.io-client';


// Import the consolidated Booking type to resolve conflicts
import type { Booking } from "@/components/admin/bookings-table";

const socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000');

// Interface definitions for other data types
interface Contact {
  id: number;
}

interface LocationStat {
    locality: string;
    count: string;
}

interface PincodeStat {
    zip_code: string;
    count: string;
}

interface MonthlyStat {
    month: string;
    count: string;
}

interface PopularTest {
    test_name: string;
    count: string;
}

export default function AdminDashboard() {
  useAuth();
  const [bookings, setBookings] = useState<Booking[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [locationStats, setLocationStats] = useState<LocationStat[]>([])
  const [pincodeStats, setPincodeStats] = useState<PincodeStat[]>([])
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStat[]>([])
  const [popularTests, setPopularTests] = useState<PopularTest[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    const headers = { 'x-auth-token': token || '' };

    const fetchData = async () => {
      try {
        const [bookingsRes, contactsRes, locationStatsRes, pincodeStatsRes, monthlyStatsRes, popularTestsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/stats/by-locality`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/stats/by-zipcode`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/stats/by-month`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/stats/popular-tests`, { headers })
        ]);

        const bookingsData = await bookingsRes.json();
        const contactsData = await contactsRes.json();
        const locationStatsData = await locationStatsRes.json();
        const pincodeStatsData = await pincodeStatsRes.json();
        const monthlyStatsData = await monthlyStatsRes.json();
        const popularTestsData = await popularTestsRes.json();

        if (Array.isArray(bookingsData)) setBookings(bookingsData);
        if (Array.isArray(contactsData)) setContacts(contactsData);
        if (Array.isArray(locationStatsData)) setLocationStats(locationStatsData);
        if (Array.isArray(pincodeStatsData)) setPincodeStats(pincodeStatsData);
        if (Array.isArray(monthlyStatsData)) setMonthlyStats(monthlyStatsData);
        if (Array.isArray(popularTestsData)) setPopularTests(popularTestsData);

      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

    const handleNewBooking = (newBooking: Booking) => {
        setBookings(prevBookings => [newBooking, ...prevBookings]);
    };

    socket.on('new_booking', handleNewBooking);

    return () => {
        socket.off('new_booking', handleNewBooking);
    };
  }, []);

  const totalRevenue = Array.isArray(bookings) ? bookings.reduce((acc, booking) => acc + parseFloat(booking.total_price || '0'), 0) : 0;
  const totalBookings = Array.isArray(bookings) ? bookings.length : 0;
  const totalMessages = Array.isArray(contacts) ? contacts.length : 0;
  const totalTests = Array.isArray(bookings) ? bookings.reduce((acc, booking) => acc + (booking.tests?.length || 0), 0) : 0;

  if (isLoading) {
    return (
        <div className="space-y-8">
            <FadeInSection>
                <div className="h-8 w-1/4 bg-gray-200 rounded animate-pulse"></div>
            </FadeInSection>
            <FadeInSection delay={100}>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </FadeInSection>
            <div className="grid gap-8 lg:grid-cols-2">
                <FadeInSection delay={200}>
                    <div className="h-80 bg-gray-200 rounded animate-pulse"></div>
                </FadeInSection>
                <FadeInSection delay={300}>
                    <div className="h-80 bg-gray-200 rounded animate-pulse"></div>
                </FadeInSection>
            </div>
             <FadeInSection delay={400}>
                <div className="h-80 bg-gray-200 rounded animate-pulse"></div>
            </FadeInSection>
        </div>
    )
  }

  return (
    <div className="space-y-8">
      <FadeInSection>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back, Admin! Here's a snapshot of your operations.</p>
      </FadeInSection>

      <FadeInSection delay={100}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Revenue" value={`₹${totalRevenue.toFixed(2)}`} icon={IndianRupeeIcon} change="+2.5% this month" changeColor="text-green-500" />
          <StatCard title="Total Bookings" value={totalBookings.toString()} icon={ClipboardList} change="+10 bookings this week" changeColor="text-green-500"/>
          <StatCard title="Total Tests Booked" value={totalTests.toString()} icon={TestTube} />
          <StatCard title="New Messages" value={totalMessages.toString()} icon={MessageSquare} />
        </div>
      </FadeInSection>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <FadeInSection delay={200} className="lg:col-span-2">
              <MonthlyBookingsChart data={monthlyStats} />
          </FadeInSection>
          <FadeInSection delay={300}>
              <PopularTestsCard data={popularTests} />
          </FadeInSection>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <FadeInSection delay={400}>
          <LocationStats data={locationStats} />
        </FadeInSection>
        <FadeInSection delay={500}>
          <PincodeStats data={pincodeStats} />
        </FadeInSection>
      </div>
      
      <FadeInSection delay={600}>
        <RecentBookings bookings={bookings.slice(0, 5)} />
      </FadeInSection>
    </div>
  )
}
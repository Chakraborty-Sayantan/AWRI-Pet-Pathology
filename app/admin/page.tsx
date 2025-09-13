"use client"

import { useEffect, useState } from "react"
import useAuth from '@/components/hooks/useAuth';
import { StatCard } from "@/components/admin/stat-card"
import { RecentBookings } from "@/components/admin/recent-bookings"
import { LocationStats } from "@/components/admin/location-stats"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { DollarSign, ClipboardList, MessageSquare, IndianRupeeIcon } from "lucide-react"
import { FadeInSection } from "@/components/fade-in-section"
import io from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000');

interface Booking {
  id: number;
  full_name: string;
  total_price: string;
  created_at: string;
  tests: any[];
  city?: string;
  locality?: string;
}

interface Contact {
  id: number;
}

interface LocationStat {
    city: string;
    count: string;
}

export default function AdminDashboard() {
  useAuth();
  const [bookings, setBookings] = useState<Booking[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [locationStats, setLocationStats] = useState<LocationStat[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    const headers = { 'x-auth-token': token || '' };

    const fetchData = async () => {
      try {
        const [bookingsRes, contactsRes, locationStatsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/stats/by-city`, { headers })
        ]);
        
        const bookingsData = await bookingsRes.json();
        const contactsData = await contactsRes.json();
        const locationStatsData = await locationStatsRes.json();

        if (Array.isArray(bookingsData)) {
            setBookings(bookingsData);
        }
        if (Array.isArray(contactsData)) {
            setContacts(contactsData);
        }
        if (Array.isArray(locationStatsData)) {
            setLocationStats(locationStatsData);
        }

      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

    const handleNewBooking = (newBooking: Booking) => {
        setBookings(prevBookings => [newBooking, ...prevBookings]);
        if (newBooking.city) {
            setLocationStats(prevStats => {
                const cityIndex = prevStats.findIndex(stat => stat.city === newBooking.city);
                if (cityIndex > -1) {
                    const newStats = [...prevStats];
                    newStats[cityIndex].count = String(parseInt(newStats[cityIndex].count, 10) + 1);
                    return newStats;
                } else {
                    return [...prevStats, { city: String(newBooking.city), count: '1' }];
                }
            });
        }
    };

    socket.on('new_booking', handleNewBooking);

    return () => {
        socket.off('new_booking', handleNewBooking);
    };
  }, []);

  const totalRevenue = Array.isArray(bookings) ? bookings.reduce((acc, booking) => acc + parseFloat(booking.total_price || '0'), 0) : 0;
  const totalBookings = Array.isArray(bookings) ? bookings.length : 0;
  const totalMessages = Array.isArray(contacts) ? contacts.length : 0;

  const chartData = Array.isArray(bookings) ? bookings
    .filter(b => b && b.full_name)
    .slice(0, 10)
    .map(b => ({
      name: b.full_name.split(' ')[0],
      price: parseFloat(b.total_price)
  })).reverse() : [];


  if (isLoading) {
    return (
        <div className="space-y-8">
            <FadeInSection>
                <div className="h-8 w-1/4 bg-gray-200 rounded animate-pulse"></div>
            </FadeInSection>
            <FadeInSection delay={100}>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      </FadeInSection>

      <FadeInSection delay={100}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatCard title="Total Revenue" value={`₹${totalRevenue.toFixed(2)}`} icon={IndianRupeeIcon} />
          <StatCard title="Total Bookings" value={totalBookings.toString()} icon={ClipboardList} />
          <StatCard title="New Messages" value={totalMessages.toString()} icon={MessageSquare} />
        </div>
      </FadeInSection>

      <div className="grid gap-8 lg:grid-cols-2">
        <FadeInSection delay={200}>
            <LocationStats data={locationStats} />
        </FadeInSection>
        <FadeInSection delay={300}>
            <RecentBookings bookings={bookings.slice(0, 5)} />
        </FadeInSection>
      </div>

      <FadeInSection delay={400}>
        <Card className="bg-gray-50">
            <CardHeader>
                <CardTitle className="text-gray-800">Recent Bookings Revenue</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="price" fill="#3b82f6" name="Booking Price (₹)" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
      </FadeInSection>
    </div>
  )
}

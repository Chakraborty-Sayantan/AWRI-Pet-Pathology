"use client"

import { useEffect, useState, useMemo } from "react"
import {  Table,  TableBody,  TableCell,  TableHead,  TableHeader,  TableRow,} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Edit } from "lucide-react"
import { EditBookingModal } from "./edit-booking-modal"
import io from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000');

export interface Test {
    id: string;
    name: string;
    price: string;
    code: string;
}

export interface Booking {
    id: number;
    full_name: string;
    phone: string;
    appointment_date: string;
    time_slot: string;
    total_price: string;
    address: string | null;
    city: string | null;
    status: 'pending' | 'completed';
    results_url: string | null;
    results_filename: string | null;
    tests: Test[];
}

const ITEMS_PER_PAGE = 10;

export function BookingsTable() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
    const [uploadingBooking, setUploadingBooking] = useState<Booking | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    const fetchBookings = async () => {
        const token = localStorage.getItem('admin-token');
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`, {
                headers: { 'x-auth-token': token || '' }
            });
            const data = await response.json();
            if (Array.isArray(data)) {
                setBookings(data);
            } else {
                setBookings([]);
            }
        } catch (error) {
            console.error("Failed to fetch bookings:", error);
            setBookings([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();

        const handleNewBooking = (newBooking: Booking) => {
            setBookings(prevBookings => [newBooking, ...prevBookings]);
        };
        const handleBookingUpdated = (updatedBooking: Booking) => {
            setBookings(prev => prev.map(b => b.id === updatedBooking.id ? updatedBooking : b));
        };
        const handleBookingDeleted = (deletedBookingId: number) => {
            setBookings(prev => prev.filter(b => b.id !== deletedBookingId));
        };

        socket.on('new_booking', handleNewBooking);
        socket.on('booking_updated', handleBookingUpdated);
        socket.on('booking_deleted', handleBookingDeleted);

        return () => {
            socket.off('new_booking', handleNewBooking);
            socket.off('booking_updated', handleBookingUpdated);
            socket.off('booking_deleted', handleBookingDeleted);
        };
    }, []);

    const filteredBookings = useMemo(() => {
        if (!Array.isArray(bookings)) return [];
        return bookings
            .filter(b => statusFilter === 'all' || b.status === statusFilter)
            .filter(b => 
                (b.full_name && b.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (b.phone && b.phone.includes(searchTerm))
            );
    }, [bookings, statusFilter, searchTerm]);

    const paginatedBookings = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredBookings.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredBookings, currentPage]);

    const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);

    const handleStatusChange = async (bookingId: number, newStatus: boolean) => {
        const statusString = newStatus ? 'completed' : 'pending';
        const token = localStorage.getItem('admin-token');
        setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: statusString } : b));
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${bookingId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token || ''
                },
                body: JSON.stringify({ status: statusString })
            });
        } catch (error) {
            console.error("Failed to update status:", error);
            fetchBookings();
        }
    };

    const handleDelete = async (bookingId: number) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            const token = localStorage.getItem('admin-token');
            try {
                await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${bookingId}`, {
                    method: 'DELETE',
                    headers: { 'x-auth-token': token || '' }
                });
            } catch (error) {
                console.error("Failed to delete booking:", error);
            }
        }
    };

    if (isLoading) {
        return <div className="text-center p-10">Loading...</div>
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <CardTitle>Manage Bookings</CardTitle>
                        <div className="flex gap-2 w-full md:w-auto">
                            <Input 
                                placeholder="Search by name or phone..." 
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full md:w-64"
                            />
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full md:w-[180px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[10%] text-center border-r">Booking ID</TableHead>
                                <TableHead className="w-[20%] text-center border-r">Full Name</TableHead>
                                <TableHead className="w-[15%] text-center border-r">Phone Number</TableHead>
                                <TableHead className="w-[15%] text-center border-r">Booking Date</TableHead>
                                <TableHead className="w-[10%] text-center border-r">Time Slot</TableHead>
                                <TableHead className="w-[10%] text-center border-r">Status</TableHead>
                                <TableHead className="w-[10%] text-center border-r">Price</TableHead>
                                <TableHead className="w-[10%] text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                    </Table>
                     <Accordion type="single" collapsible className="w-full">
                        {paginatedBookings.map((booking) => (
                            <AccordionItem value={`item-${booking.id}`} key={booking.id} className="border-b last:border-b-0">
                                <div className="flex items-center hover:bg-muted/50 text-sm">
                                    <div className="w-[10%] text-center font-semibold border-r p-4">#{booking.id}</div>
                                    <div className="w-[20%] text-center font-medium border-r p-4">{booking.full_name}</div>
                                    <div className="w-[15%] text-center border-r p-4">{booking.phone}</div>
                                    <div className="w-[15%] text-center border-r p-4">{new Date(booking.appointment_date).toLocaleDateString()}</div>
                                    <div className="w-[10%] text-center border-r p-4">{booking.time_slot}</div>
                                    <div className="w-[10%] text-center border-r p-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <Switch checked={booking.status === 'completed'} onCheckedChange={(checked) => handleStatusChange(booking.id, checked)} />
                                        </div>
                                    </div>
                                    <div className="w-[10%] text-center border-r p-4">₹{parseFloat(booking.total_price).toFixed(2)}</div>
                                    <div className="w-[10%] text-center p-4 flex justify-center items-center">
                                        <Button variant="ghost" size="icon" onClick={() => setEditingBooking(booking)}><Edit className="h-4 w-4" /></Button>
                                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" onClick={() => handleDelete(booking.id)}><Trash2 className="h-4 w-4" /></Button>
                                        <AccordionTrigger className="p-2" />
                                    </div>
                                </div>
                                <AccordionContent>
                                    <div className="px-6 py-4">
                                        <h4 className="font-semibold mb-2">Booked Tests:</h4>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Test Code</TableHead>
                                                    <TableHead>Test Name</TableHead>
                                                    <TableHead className="text-right">Price</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {booking.tests && booking.tests.length > 0 ? booking.tests.map(test => (
                                                    <TableRow key={test.id}>
                                                        <TableCell>{test.code}</TableCell>
                                                        <TableCell>{test.name}</TableCell>
                                                        <TableCell className="text-right">₹{parseFloat(test.price).toFixed(2)}</TableCell>
                                                    </TableRow>
                                                )) : (
                                                    <TableRow>
                                                        <TableCell colSpan={3} className="text-center text-muted-foreground">
                                                            No tests found for this booking.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
                <div className="flex items-center justify-end space-x-2 p-4 border-t">
                    <span className="text-sm text-muted-foreground">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</Button>
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</Button>
                </div>
            </Card>
            {editingBooking && <EditBookingModal isOpen={!!editingBooking} onClose={() => setEditingBooking(null)} booking={editingBooking} onSave={fetchBookings} />}
            
        </>
    )
}

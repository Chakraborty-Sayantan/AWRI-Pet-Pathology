"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Booking } from "./bookings-table"

interface EditBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    booking: Booking;
    onSave: () => void;
}

export function EditBookingModal({ isOpen, onClose, booking, onSave }: EditBookingModalProps) {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        appointmentDate: '',
        timeSlot: '',
    });

    useEffect(() => {
        if (booking) {
            setFormData({
                fullName: booking.full_name,
                phone: booking.phone,
                appointmentDate: new Date(booking.appointment_date).toISOString().split('T')[0], // Format for date input
                timeSlot: booking.time_slot,
            });
        }
    }, [booking]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('admin-token');
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        try {
            const response = await fetch(`${apiUrl}/api/bookings/${booking.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token || '',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) throw new Error('Failed to update booking');
            onSave();
            onClose();
        } catch (error) {
            console.error(error);
            alert('An error occurred while updating the booking.');
        }
    };

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Booking #{booking.id}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" value={formData.fullName} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" value={formData.phone} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="appointmentDate">Appointment Date</Label>
                        <Input id="appointmentDate" type="date" value={formData.appointmentDate} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="timeSlot">Time Slot</Label>
                        <Input id="timeSlot" value={formData.timeSlot} onChange={handleChange} required />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit">Save Changes</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

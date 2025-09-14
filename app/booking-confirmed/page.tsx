"use client"

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { NavigationBar } from '@/components/navigation-bar';
import { FooterSection } from '@/components/footer-section';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function ConfirmationContent() {
    const searchParams = useSearchParams();
    const bookingId = searchParams.get('id');
    const customerName = searchParams.get('name');

    return (
        <Card className="max-w-2xl mx-auto text-center shadow-lg">
            <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800">Booking Confirmed!</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                {customerName && (
                    <p className="text-lg text-gray-600 mb-2">
                        Thank you, <span className="font-semibold text-gray-800">{customerName}</span>!
                    </p>
                )}
                <p className="text-muted-foreground mb-6">
                    Your appointment is scheduled. You can track its status using your phone number.
                </p>
                <div className="text-lg font-semibold bg-blue-50 dark:bg-gray-800 p-4 rounded-md border">
                    Booking ID: <span className="text-blue-600">AWRI_#{bookingId}</span>
                </div>
                <Button asChild className="mt-8">
                    <Link href="/track-booking">
                        Track Your Booking
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
}


export default function BookingConfirmedPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            <NavigationBar />
            <main className="flex-1 py-20">
                <div className="container mx-auto px-4">
                    <Suspense fallback={<div>Loading confirmation...</div>}>
                        <ConfirmationContent />
                    </Suspense>
                </div>
            </main>
            <FooterSection />
        </div>
    );
}

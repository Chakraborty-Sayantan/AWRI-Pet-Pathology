"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface MonthlyStat {
    month: string;
    count: string;
}

export function MonthlyBookingsChart({ data }: { data: MonthlyStat[] }) {
    const chartData = data.map(item => ({
        name: item.month,
        value: parseInt(item.count, 10)
    }));

    return (
        <Card className="bg-gray-50">
            <CardHeader>
                <CardTitle className="text-gray-800">Bookings Over Time</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#0088FE" strokeWidth={2} name="Bookings" />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
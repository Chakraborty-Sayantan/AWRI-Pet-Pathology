"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

interface LocationStat {
    city: string;
    count: string; // The count will be a string from the DB query
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1943'];

export function LocationStats({ data }: { data: LocationStat[] }) {
    const chartData = data.map(item => ({
        name: item.city,
        value: parseInt(item.count, 10)
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Bookings by City</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

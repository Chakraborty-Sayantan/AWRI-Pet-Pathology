"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface PopularTest {
    test_name: string;
    count: string;
}


const getBadgeColor = (index: number) => {
    switch (index) {
        case 0:
            return "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"; 
        case 1:
            return "bg-blue-100 text-blue-800 hover:bg-blue-100";     
        case 2:
            return "bg-amber-100 text-amber-800 hover:bg-amber-100";    
        default:
            return "bg-pink-100 text-gray-800 hover:bg-gray-100";      
    }
};

export function PopularTestsCard({ data }: { data: PopularTest[] }) {
    return (
        <Card className="bg-white text-gray-800">
            <CardHeader>
                <CardTitle>Most Popular Tests</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
                <div className="space-y-4">
                    {data.length > 0 ? data.map((test, index) => (
                        <div key={test.test_name} className="flex items-center justify-between gap-4">
                            <p className="text-sm font-medium leading-none truncate flex-1">
                                {test.test_name}
                            </p>
                            <Badge className={cn("shrink-0", getBadgeColor(index))}>
                                {test.count} {parseInt(test.count) === 1 ? 'booking' : 'bookings'}
                            </Badge>
                        </div>
                    )) : (
                        <p className="text-sm text-muted-foreground text-center pt-4">No test data available.</p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
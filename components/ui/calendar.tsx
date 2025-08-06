"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface CalendarProps {
  selected?: Date
  onSelect: (date: Date) => void
  disabled?: (date: Date) => boolean
}

export function Calendar({ selected, onSelect, disabled }: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date())

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
  const startDate = new Date(startOfMonth)
  startDate.setDate(startDate.getDate() - startDate.getDay())

  const days = []
  let day = startDate
  while (day <= endOfMonth || days.length % 7 !== 0) {
    days.push(new Date(day))
    day.setDate(day.getDate() + 1)
    if (days.length > 42) break; // Safety break
  }
  
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const isSameDay = (d1?: Date, d2?: Date) => {
    return d1?.getFullYear() === d2?.getFullYear() &&
           d1?.getMonth() === d2?.getMonth() &&
           d1?.getDate() === d2?.getDate()
  }

  const isToday = (d: Date) => isSameDay(d, new Date())

  return (
    <div className="bg-background rounded-xl border shadow-lg p-4 w-full max-w-sm">
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" size="icon" onClick={prevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-lg font-bold">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </div>
        <Button variant="outline" size="icon" onClick={nextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm text-muted-foreground mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => {
          const isDisabled = disabled ? disabled(d) : false;
          const isSelected = isSameDay(d, selected);
          const isCurrentMonth = d.getMonth() === currentDate.getMonth();

          return (
            <button
              key={i}
              disabled={isDisabled}
              onClick={() => onSelect(d)}
              className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                !isCurrentMonth && "text-muted-foreground opacity-40",
                isSelected && "bg-primary text-primary-foreground hover:bg-primary/90",
                isToday(d) && !isSelected && "bg-accent text-accent-foreground border-2 border-primary",
                isDisabled && "text-muted-foreground opacity-40 cursor-not-allowed hover:bg-transparent"
              )}
            >
              {d.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

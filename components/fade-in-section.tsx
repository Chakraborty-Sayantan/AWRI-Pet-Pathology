"use client"

import type React from "react"

import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

interface FadeInSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function FadeInSection({ children, className, delay = 0 }: FadeInSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-1000 ease-out",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

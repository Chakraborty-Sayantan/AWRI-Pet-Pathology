import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn("animate-pulse rounded-md bg-gray-200", className)} />
}

export function TestimonialSkeleton() {
  return (
    <div className="p-6 border rounded-lg space-y-4">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-5 w-5" />
        ))}
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  )
}

export function WorkflowSkeleton() {
  return (
    <div className="text-center p-6 space-y-4">
      <Skeleton className="h-16 w-16 rounded-full mx-auto" />
      <Skeleton className="h-6 w-32 mx-auto" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4 mx-auto" />
    </div>
  )
}

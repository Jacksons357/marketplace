import { Skeleton } from "@/components/ui/skeleton"

export function FilterNavSkeleton() {
  return (
    <div className="w-full bg-card p-4 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-2">
        <div className="col-span-1 lg:col-span-2 space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <div className="col-span-1 lg:col-span-1 space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <div className="col-span-1 lg:col-span-1 space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <div className="col-span-1 lg:col-span-1 space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <div className="col-span-1 lg:col-span-1 space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <div className="col-span-1 lg:col-span-2 mt-2 flex items-center justify-center">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
    </div>
  )
}

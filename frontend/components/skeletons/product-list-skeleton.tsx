import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="relative aspect-square">
            <Skeleton className="absolute inset-0 h-full w-full" />
          </div>

          <CardHeader className="p-4 space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
              <Skeleton className="h-5 w-16 rounded-md" />
            </div>
          </CardHeader>

          <CardContent className="p-4 pt-0">
            <Skeleton className="h-6 w-24" />
          </CardContent>

          <CardFooter className="p-4">
            <Skeleton className="h-10 w-full rounded-md" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

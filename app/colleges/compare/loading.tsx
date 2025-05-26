import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container px-4 md:px-6 py-6 md:py-8">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Skeleton className="h-10 w-[250px]" />
            <Skeleton className="h-5 w-[350px] mt-2" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-9 w-[150px]" />
            <Skeleton className="h-9 w-[150px]" />
            <Skeleton className="h-9 w-[150px]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Skeleton className="h-16 w-16 rounded-md mb-3" />
                <Skeleton className="h-6 w-[180px] mb-2" />
                <Skeleton className="h-4 w-[120px] mb-3" />
                <Skeleton className="h-9 w-[120px]" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <Skeleton className="h-10 w-full mb-6" />
          <div className="space-y-4">
            <Skeleton className="h-[300px] w-full rounded-lg" />
            <Skeleton className="h-[100px] w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}

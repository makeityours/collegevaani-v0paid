import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container px-4 py-8 mx-auto md:px-6">
      <div className="space-y-10">
        {/* Hero section skeleton */}
        <div className="py-20 text-center">
          <Skeleton className="w-20 h-6 mx-auto mb-6" />
          <Skeleton className="h-12 max-w-2xl mx-auto mb-6" />
          <Skeleton className="h-12 max-w-2xl mx-auto mb-6" />
          <Skeleton className="h-6 max-w-xl mx-auto mb-10" />
          <div className="flex justify-center gap-4">
            <Skeleton className="w-32 h-10" />
            <Skeleton className="w-32 h-10" />
          </div>
        </div>

        {/* Form skeleton */}
        <div className="max-w-4xl p-6 mx-auto">
          <Skeleton className="h-8 max-w-md mx-auto mb-6" />
          <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10 md:col-span-2" />
          </div>
        </div>

        {/* Featured programs skeleton */}
        <div className="py-16">
          <Skeleton className="h-8 max-w-md mx-auto mb-4" />
          <Skeleton className="h-6 max-w-lg mx-auto mb-12" />
          <div className="max-w-5xl mx-auto">
            <div className="grid w-full grid-cols-3 mb-8 gap-4">
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-6 border rounded-lg">
                  <Skeleton className="h-6 mb-2" />
                  <Skeleton className="w-3/4 h-4 mb-4" />
                  <Skeleton className="w-full h-4 mb-2" />
                  <Skeleton className="w-full h-4 mb-2" />
                  <Skeleton className="w-full h-4 mb-4" />
                  <Skeleton className="w-full h-16" />
                  <div className="flex justify-between mt-4">
                    <Skeleton className="w-20 h-6" />
                    <Skeleton className="w-24 h-9" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why choose section skeleton */}
        <div className="py-16">
          <Skeleton className="h-8 max-w-md mx-auto mb-4" />
          <Skeleton className="h-6 max-w-lg mx-auto mb-12" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="p-6 border rounded-lg">
                <Skeleton className="w-12 h-12 mb-4 rounded-full" />
                <Skeleton className="h-6 mb-3" />
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-3/4 h-4" />
              </div>
            ))}
          </div>
        </div>

        {/* FAQ skeleton */}
        <div className="py-16">
          <Skeleton className="h-8 max-w-md mx-auto mb-4" />
          <Skeleton className="h-6 max-w-lg mx-auto mb-12" />
          <div className="max-w-3xl mx-auto space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="p-4 border rounded-lg">
                <Skeleton className="h-6 mb-2" />
                <Skeleton className="w-full h-4 mb-1" />
                <Skeleton className="w-full h-4 mb-1" />
                <Skeleton className="w-3/4 h-4" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA skeleton */}
        <div className="py-16">
          <Skeleton className="h-8 max-w-md mx-auto mb-4" />
          <Skeleton className="h-6 max-w-lg mx-auto mb-8" />
          <div className="flex justify-center gap-4">
            <Skeleton className="w-32 h-10" />
            <Skeleton className="w-32 h-10" />
          </div>
        </div>
      </div>
    </div>
  )
}

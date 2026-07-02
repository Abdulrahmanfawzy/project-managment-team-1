import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="container m-auto px-4 my-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm p-4 space-y-4"
          >
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>

            <Skeleton className="h-8 w-20" />

            <Skeleton className="h-2 w-full rounded-full" />

            <Skeleton className="h-3 w-24" />
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-5">
        <div className="lg:col-span-6 bg-white rounded-lg p-5 space-y-4">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-72 w-full" />
        </div>

        <div className="lg:col-span-3 bg-white rounded-lg p-5 space-y-3">
          <Skeleton className="h-5 w-36" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>

        <div className="lg:col-span-3 bg-white rounded-lg p-5 space-y-3">
          <Skeleton className="h-5 w-28" />
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 mt-7">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="lg:col-span-3 bg-white rounded-lg p-5 space-y-4"
          >
            <Skeleton className="h-5 w-32" />

            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-full" />

                  <div className="space-y-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>

                <Skeleton className="h-4 w-10" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
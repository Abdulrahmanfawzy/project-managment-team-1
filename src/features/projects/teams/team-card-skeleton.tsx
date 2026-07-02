import { Skeleton } from "@/components/ui/skeleton";

// Loading placeholder that mirrors the TeamCard layout
// (colored header, column labels, member rows, add-member button).
export default function TeamCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
      {/* header: team name + completion */}
      <div className="flex items-center justify-between bg-slate-50 px-4 py-3">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-4 w-20" />
      </div>

      {/* column labels */}
      <div className="flex items-center justify-between px-4 pt-3">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-3 w-10" />
      </div>

      {/* member rows */}
      <div className="space-y-3 px-4 py-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="size-8 rounded-full" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-3 w-8" />
          </div>
        ))}
      </div>

      {/* add member button */}
      <div className="px-4 pb-4 pt-1">
        <Skeleton className="h-9 w-full rounded-md" />
      </div>
    </div>
  );
}

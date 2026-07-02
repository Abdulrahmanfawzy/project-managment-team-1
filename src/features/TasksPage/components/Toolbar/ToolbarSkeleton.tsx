import { Skeleton } from "@/components/ui/skeleton";

export function ToolbarSkeleton() {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:w-auto">
        {/* Search input skeleton */}
        <Skeleton className="h-10 w-72 rounded-md" />

        {/* Project select skeleton */}
        <Skeleton className="h-10 w-full min-w-[10rem] sm:w-44 rounded-md" />

        {/* Task filter select skeleton */}
        <Skeleton className="h-10 w-full min-w-[10rem] sm:w-40 rounded-md" />
      </div>

      {/* Create Task button skeleton */}
      <Skeleton className="h-10 w-36 rounded-full" />
    </div>
  );
}

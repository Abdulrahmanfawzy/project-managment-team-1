import { Skeleton } from "@/components/ui/skeleton";

// Loading placeholder that mirrors the FileCard layout
// (file-type icon, name/author/meta lines, download button).
export default function FileCardSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
      <Skeleton className="size-11 shrink-0 rounded-xl" />

      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-3 w-1/2" />
      </div>

      <Skeleton className="size-8 shrink-0 rounded-lg" />
    </div>
  );
}

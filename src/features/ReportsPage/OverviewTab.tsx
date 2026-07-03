import { useState } from "react";
import { FileText, Loader2 } from "lucide-react";
import { useProfileActivity } from "./hooks/useProfileActivity";
import { useProfile } from "./hooks/useProfile";
import PaginationControls from "./PaginationControls";
import type { ProfileActivity } from "./api/profile.api";

/** Return a relative-time label from an ISO date string. */
function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function OverviewTab() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, isFetching } = useProfileActivity(page);
  const { data: profile } = useProfile();

  // Normalise response shape
  const activities: ProfileActivity[] = Array.isArray(data)
    ? data
    : (data as { data: ProfileActivity[] } | undefined)?.data ?? [];

  const meta = !Array.isArray(data)
    ? (data as { meta?: { current_page: number; last_page: number } })?.meta
    : undefined;

  return (
    <div className="flex flex-col gap-8 py-6">
      {/* About */}
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">About</h2>
        {profile?.about ? (
          <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-4xl whitespace-pre-line">
            {profile.about}
          </p>
        ) : (
          <p className="text-sm md:text-base text-slate-400 italic leading-relaxed max-w-4xl">
            No bio added yet.
          </p>
        )}
      </div>

      {/* Recent Activities */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Recent Activities
        </h2>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="size-6 animate-spin text-brand" />
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center py-16 text-sm text-red-500">
            Failed to load activities. Please try again later.
          </div>
        ) : activities.length === 0 ? (
          <div className="flex items-center justify-center py-16 text-sm text-slate-400">
            No recent activities.
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-3 max-w-4xl">
              {activities.map((activity, i) => (
                <div
                  key={activity.id ?? i}
                  className="flex items-center justify-between p-4 bg-white hover:bg-slate-50/50 rounded-xl border border-slate-100/80 shadow-sm transition-all duration-300"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500">
                      <FileText size={18} strokeWidth={2} />
                    </div>
                    <div className="text-sm">
                      <span className="text-slate-800 font-semibold">
                        {activity.description}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-slate-400 shrink-0 ml-4">
                    {timeAgo(activity.created_at)}
                  </span>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {meta && (
              <div className="max-w-4xl">
                <PaginationControls
                  currentPage={meta.current_page}
                  lastPage={meta.last_page}
                  onPageChange={setPage}
                  isFetching={isFetching}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

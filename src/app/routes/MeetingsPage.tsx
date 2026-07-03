import { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import PageContainer from "@/components/layout/PageContainer";
import MeetingsHeader from "@/features/meetings/MeetingsHeader";
import MonthFilter from "@/features/meetings/MonthFilter";
import CalendarHeader from "@/features/meetings/CalendarHeader";
import CalendarGrid from "@/features/meetings/CalendarGrid";
import { useMeetings } from "@/features/meetings/hooks/useMeetings";
import { buildWeek, rangeLabel } from "@/features/meetings/utils/calendar";

/** Midnight today, used as the default start of the visible 5-day window. */
function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

const WINDOW_DAYS = 5;

export default function MeetingsPage() {
  const [weekStart, setWeekStart] = useState<Date>(startOfToday);
  const { data: meetings, isLoading, isError } = useMeetings();

  const days = useMemo(() => buildWeek(weekStart, WINDOW_DAYS), [weekStart]);

  // Only meetings that fall inside the visible day columns.
  const visibleMeetings = useMemo(() => {
    if (!meetings) return [];
    const dateSet = new Set(days.map((d) => d.dateStr));
    return meetings.filter((m) => dateSet.has(m.date));
  }, [meetings, days]);

  const shift = (amount: number) =>
    setWeekStart((prev) => {
      const next = new Date(prev);
      next.setDate(next.getDate() + amount);
      return next;
    });

  return (
    <DashboardLayout>
      <PageContainer>
        <MeetingsHeader />
        <MonthFilter
          month={rangeLabel(days)}
          onPrev={() => shift(-WINDOW_DAYS)}
          onNext={() => shift(WINDOW_DAYS)}
          onToday={() => setWeekStart(startOfToday())}
        />

        <div className="w-full overflow-x-auto sm:overflow-hidden">
          <CalendarHeader days={days} />

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="size-6 animate-spin text-[#005AFB]" />
            </div>
          ) : isError ? (
            <div className="flex items-center justify-center py-20 text-sm text-red-500">
              Failed to load meetings. Please try again later.
            </div>
          ) : (
            <CalendarGrid days={days} meetings={visibleMeetings} />
          )}
        </div>
      </PageContainer>
    </DashboardLayout>
  );
}


import { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import PageContainer from "@/components/layout/PageContainer";
import MeetingsHeader from "@/features/meetings/MeetingsHeader";
import MonthFilter from "@/features/meetings/MonthFilter";
import CalendarHeader from "@/features/meetings/CalendarHeader";
import CalendarGrid from "@/features/meetings/CalendarGrid";
import { useMeetings } from "@/features/meetings/hooks/useMeetings";
import {
  buildWeek,
  computeRange,
  rangeLabel,
  shiftReference,
  type FilterOption,
} from "@/features/meetings/utils/calendar";

/** Midnight today, used as the default reference date. */
function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export default function MeetingsPage() {
  const [filter, setFilter] = useState<FilterOption>("This Week");
  const [referenceDate, setReferenceDate] = useState<Date>(startOfToday);
  const { data: meetings, isLoading, isError } = useMeetings();

  const { start, count } = useMemo(
    () => computeRange(filter, referenceDate),
    [filter, referenceDate],
  );
  const days = useMemo(() => buildWeek(start, count), [start, count]);

  // Only meetings that fall inside the visible day columns.
  const visibleMeetings = useMemo(() => {
    if (!meetings) return [];
    const dateSet = new Set(days.map((d) => d.dateStr));
    return meetings.filter((m) => dateSet.has(m.date));
  }, [meetings, days]);

  const shift = (direction: 1 | -1) =>
    setReferenceDate((prev) => shiftReference(filter, prev, direction));

  const handleFilterChange = (next: FilterOption) => {
    setFilter(next);
    // Re-center on today whenever the filter itself changes.
    setReferenceDate(startOfToday());
  };

  return (
    <DashboardLayout>
      <PageContainer>
        <MeetingsHeader />
        <MonthFilter
          month={rangeLabel(days)}
          filter={filter}
          onFilterChange={handleFilterChange}
          onPrev={() => shift(-1)}
          onNext={() => shift(1)}
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
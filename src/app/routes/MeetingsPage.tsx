import DashboardLayout from "@/components/layout/dashboard-layout";
import MeetingsHeader from "@/features/meetings/MeetingsHeader";
import MonthFilter from "@/features/meetings/MonthFilter";
import CalendarHeader from "@/features/meetings/CalendarHeader";
import CalendarGrid from "@/features/meetings/CalendarGrid";
import { MOCK_MEETINGS } from "@/features/meetings/data/mockMeetings";

export default function MeetingsPage() {
  return (
    <DashboardLayout>
      <main className="flex-1 px-6 py-6 max-w-[1311px] mx-auto w-full">
        <MeetingsHeader />
        <MonthFilter month="December 2025" filter="This Week" />

        <div className="w-full overflow-x-auto sm:overflow-hidden">
          <CalendarHeader />
          <CalendarGrid meetings={MOCK_MEETINGS} />
        </div>
      </main>
    </DashboardLayout>
  );
}

import DashboardLayout from "@/components/layout/dashboard-layout";
import MeetingsHeader from "@/features/MeetingsPage/MeetingsHeader";
import MonthFilter from "@/features/MeetingsPage//MonthFilter";
import CalendarHeader from "@/features/MeetingsPage//CalendarHeader";
import CalendarGrid from "@/features/MeetingsPage/CalendarGrid";
import { MOCK_MEETINGS } from "@/features/MeetingsPage/Data/mockMeetings";

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

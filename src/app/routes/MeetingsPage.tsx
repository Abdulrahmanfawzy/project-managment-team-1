import DashboardLayout from "@/components/layout/dashboard-layout";
import PageContainer from "@/components/layout/PageContainer";
import MeetingsHeader from "@/features/meetings/MeetingsHeader";
import MonthFilter from "@/features/meetings/MonthFilter";
import CalendarHeader from "@/features/meetings/CalendarHeader";
import CalendarGrid from "@/features/meetings/CalendarGrid";
import { MOCK_MEETINGS } from "@/features/meetings/data/mockMeetings";

export default function MeetingsPage() {
  return (
    <DashboardLayout>
      <PageContainer>
        <MeetingsHeader />
        <MonthFilter month="December 2025" filter="This Week" />

        <div className="w-full overflow-x-auto sm:overflow-hidden">
          <CalendarHeader />
          <CalendarGrid meetings={MOCK_MEETINGS} />
        </div>
      </PageContainer>
    </DashboardLayout>
  );
}

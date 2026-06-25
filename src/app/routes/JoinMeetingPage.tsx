import DashboardLayout from "@/components/layout/dashboard-layout";
import JoinMeetingHeader from "../../features/meetings/components/JoinMeetingHeader";
import MeetingVedio from "../../features/meetings/components/MeetingVedio";
import MeetingSummary from "../../features/meetings/components/MeetingSummary";
import MeetingTranscripts from "../../features/meetings/components/MeetingTranscripts";

export default function JoinMeetingPage() {
  return (
    <DashboardLayout>
      <main className="flex-1 px-4 py-6 sm:px-6">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[1fr_400px]">
          {/* Left column: details, video, summary */}
          <div className="space-y-5">
            <JoinMeetingHeader />
            <MeetingVedio />
            <MeetingSummary />
          </div>

          {/* Right column: transcripts */}
          <aside className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
            <MeetingTranscripts />
          </aside>
        </div>
      </main>
    </DashboardLayout>
  );
}

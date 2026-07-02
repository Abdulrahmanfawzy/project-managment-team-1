import { useParams } from "react-router-dom";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { useMeeting } from "@/features/meetings/hooks/useMeeting";
import JoinMeetingHeader from "../../features/meetings/components/JoinMeetingHeader";
import MeetingVedio from "../../features/meetings/components/MeetingVedio";
import MeetingSummary from "../../features/meetings/components/MeetingSummary";
import MeetingTranscripts from "../../features/meetings/components/MeetingTranscripts";

export default function JoinMeetingPage() {
  const { meetingId } = useParams();
  const { data, isPending, isError, error } = useMeeting(Number(meetingId));

  return (
    <DashboardLayout>
      <main className="flex-1 px-4 py-6 sm:px-6">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[1fr_400px]">
          {/* Left column: details, video, summary */}
          <div className="space-y-5">
            {isPending ? (
              <p className="text-sm text-muted-foreground">Loading meeting…</p>
            ) : isError ? (
              <p className="text-sm text-red-600">
                Failed to load meeting: {error.message}
              </p>
            ) : (
              <JoinMeetingHeader meeting={data.data.meeting} />
            )}
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

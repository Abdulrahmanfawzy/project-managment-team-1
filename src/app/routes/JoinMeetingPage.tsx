import { useParams } from "react-router-dom";

import DashboardLayout from "@/components/layout/dashboard-layout";
import PageContainer from "@/components/layout/PageContainer";
import { useMeeting } from "@/features/meetings/hooks/useMeeting";
import JoinMeetingHeader from "../../features/meetings/components/JoinMeetingHeader";
import MeetingVedio from "../../features/meetings/components/MeetingVedio";
import MeetingSummary from "../../features/meetings/components/MeetingSummary";
import MeetingTranscripts from "../../features/meetings/components/MeetingTranscripts";
import Spinner from "@/components/shared/Spinner";

export default function JoinMeetingPage() {
  const { meetingId } = useParams();
  const { data, isPending, isError, error } = useMeeting(Number(meetingId));

  return (
    <DashboardLayout>
      <PageContainer>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px]">
          {/* Left column: details, video, summary */}
          <div className="space-y-5">
            {isPending ? (
              <Spinner />
            ) : isError ? (
              <p className="text-sm text-red-600">
                Failed to load meeting: {error.message}
              </p>
            ) : (
              <JoinMeetingHeader meeting={data.data.meeting} />
            )}
            <MeetingVedio title={data?.data.meeting.title} />
            <MeetingSummary />
          </div>

          {/* Right column: transcripts */}
          <aside className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
            <MeetingTranscripts />
          </aside>
        </div>
      </PageContainer>
    </DashboardLayout>
  );
}

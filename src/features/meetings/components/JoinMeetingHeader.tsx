import { Calendar, Clock, ClipboardList } from "lucide-react";

import Breadcrumb from "@/components/shared/breadcrumb";
import AvatarGroup from "@/components/ui/avatar-group";
import { meeting, participants } from "../data/data";

export default function JoinMeetingHeader() {
  return (
    <div className="space-y-3">
      <Breadcrumb
        items={[
          { label: "Meetings", to: "/meetings" },
          { label: meeting.title },
        ]}
      />

      <h1 className="text-2xl font-bold text-text-h">{meeting.title}</h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        {/* Project chip */}
        <span className="inline-flex items-center gap-1.5 rounded-md bg-violet-50 px-2 py-1 font-medium text-violet-600">
          <ClipboardList className="size-4" />
          {meeting.project}
        </span>

        <AvatarGroup avatars={participants.map((p) => p.avatar)} size={28} />

        <span className="inline-flex items-center gap-1.5">
          <Calendar className="size-4" />
          {meeting.date}
        </span>

        <span className="inline-flex items-center gap-1.5">
          <Clock className="size-4" />
          {meeting.time}
        </span>
      </div>
    </div>
  );
}

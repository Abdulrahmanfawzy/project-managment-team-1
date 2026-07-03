import { Calendar, Clock, ClipboardList } from "lucide-react";

import Breadcrumb from "@/components/shared/breadcrumb";
import AvatarGroup from "@/components/ui/avatar-group";
import type { Meeting } from "../Types/meeting.types";

export default function JoinMeetingHeader({ meeting }: { meeting: Meeting }) {
  // Prefer the backend avatar; fall back to a stable per-email one.
  const avatars = meeting.participants.map(
    (p) =>
      p.avatar_url ?? `https://i.pravatar.cc/64?u=${encodeURIComponent(p.email)}`,
  );

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
          {meeting.project.name}
        </span>

        <AvatarGroup avatars={avatars} size={28} />

        <span className="inline-flex items-center gap-1.5">
          <Calendar className="size-4" />
          {meeting.date}
        </span>

        <span className="inline-flex items-center gap-1.5">
          <Clock className="size-4" />
          {meeting.start_time} - {meeting.end_time}
        </span>
      </div>
    </div>
  );
}

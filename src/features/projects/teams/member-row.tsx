import { BadgeCheck } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import type { TeamMember } from "./types/teams";

interface MemberRowProps {
  member: TeamMember;
  done: number; // completed tasks assigned to this member (in this project)
  total: number; // all tasks assigned to this member (in this project)
  isLeader?: boolean;
}

export default function MemberRow({
  member,
  done,
  total,
  isLeader,
}: MemberRowProps) {
  const pct = total > 0 ? (done / total) * 100 : 0;

  return (
    <div className="flex items-center gap-3 py-2.5">
      <div className="relative shrink-0">
        <img
          src={member.avatar_url}
          alt={member.name}
          className="size-9 rounded-full object-cover"
        />
        {isLeader && (
          <BadgeCheck className="absolute -right-0.5 -top-0.5 size-4 rounded-full fill-blue-500 text-white" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-1.5">
          <span className="truncate font-semibold text-text-h">
            {member.name}
          </span>
          {member.job_title && (
            <span className="truncate text-xs text-muted-foreground">
              {member.job_title}
            </span>
          )}
        </div>
        <Progress
          value={pct}
          className="mt-1.5 h-1.5 bg-slate-100 [&_[data-slot=progress-indicator]]:bg-blue-600"
        />
      </div>

      <span className="shrink-0 text-xs font-medium text-text-h tabular-nums">
        {String(done).padStart(2, "0")}/{String(total).padStart(2, "0")}
      </span>
    </div>
  );
}

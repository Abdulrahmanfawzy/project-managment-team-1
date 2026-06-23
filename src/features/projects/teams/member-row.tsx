import { BadgeCheck } from "lucide-react";
import type { Member } from "./data/data";
import { Progress } from "@/components/ui/progress";
export default function MemberRow({ member }: { member: Member }) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <div className="relative shrink-0">
        <img
          src={member.avatar}
          alt={member.name}
          className="size-9 rounded-full object-cover"
        />
        {member.isLeader && (
          <BadgeCheck className="absolute -right-0.5 -top-0.5 size-4 rounded-full fill-blue-500 text-white" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-1.5">
          <span className="truncate font-semibold text-text-h">
            {member.name}
          </span>
          <span className="truncate text-xs text-muted-foreground">
            {member.role}
          </span>
        </div>
        <Progress
          value={(member.done / member.total) * 100}
          className="mt-1.5 h-1.5 bg-slate-100 [&_[data-slot=progress-indicator]]:bg-blue-600"
        />
      </div>

      <span className="shrink-0 text-xs font-medium text-text-h tabular-nums">
        {String(member.done).padStart(2, "0")}/{member.total}
      </span>
    </div>
  );
}

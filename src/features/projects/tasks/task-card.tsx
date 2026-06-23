import { Calendar, MessageSquareText } from "lucide-react";

import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import AvatarGroup from "@/components/ui/avatar-group";
import type { Priority, Task } from "./data/data";

const priorityStyles: Record<Priority, string> = {
  High: "bg-red-50 text-red-500",
  Medium: "bg-amber-50 text-amber-500",
  Low: "bg-green-50 text-green-600",
};

function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span
      className={cn(
        "rounded-md px-2 py-0.5 text-xs font-medium",
        priorityStyles[priority],
      )}
    >
      {priority}
    </span>
  );
}

export default function TaskCard({ task }: { task: Task }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3 text-sm">
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-semibold text-text-h">{task.title}</h4>
        <PriorityBadge priority={task.priority} />
      </div>

      <p className="mt-2 text-xs text-muted-foreground">{task.description}</p>

      {task.progress !== undefined && (
        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-text-h">{task.progress}%</span>
          </div>
          <Progress
            value={task.progress}
            className="h-1.5 bg-slate-200 [&_[data-slot=progress-indicator]]:bg-brand"
          />
        </div>
      )}

      {task.reviewer && (
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AvatarGroup avatars={[task.avatars[0]]} size={22} />
            <span className="text-xs font-medium text-text-h">
              {task.reviewer}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">Reviewer</span>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between border-t border-slate-200/70 pt-3">
        <AvatarGroup avatars={task.avatars} />
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            {task.comments}
            <MessageSquareText className="size-3.5" />
          </span>
          <span className="flex items-center gap-1">
            {task.date}
            <Calendar className="size-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}

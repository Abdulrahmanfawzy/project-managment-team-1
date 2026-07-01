import { Calendar, MessageSquareText } from "lucide-react";

import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import AvatarGroup from "@/components/ui/avatar-group";
import type { Priority } from "../../data/data";
import type { ApiTask } from "../../types/tasks";
import { mapApiTask } from "../../utils/task-mapper";
import EditTask from "../Task/EditTask";
import DeleteTaskDialog from "../Task/DeleteTaskDialog";

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

export default function TaskCard({ task }: { task: ApiTask }) {
  // Map the raw API task to the UI display shape; keep `task` for actions.
  const display = mapApiTask(task);

  return (
    <div className="rounded-xl bg-slate-50 p-3 text-sm">
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-semibold text-text-h">{display.title}</h4>
        <div className="flex items-center gap-1.5">
          <PriorityBadge priority={display.priority} />
          <EditTask task={task} />
          <DeleteTaskDialog task={task} />
        </div>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        {display.description}
      </p>

      {display.progress !== undefined && (
        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-text-h">{display.progress}%</span>
          </div>
          <Progress
            value={display.progress}
            className="h-1.5 bg-slate-200 [&_[data-slot=progress-indicator]]:bg-brand"
          />
        </div>
      )}

      <div className="mt-3 flex items-center justify-between border-t border-slate-200/70 pt-3">
        <AvatarGroup avatars={display.avatars} />
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            {display.comments}
            <MessageSquareText className="size-3.5" />
          </span>
          <span className="flex items-center gap-1">
            {display.date}
            <Calendar className="size-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}

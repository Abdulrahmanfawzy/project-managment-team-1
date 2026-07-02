import { MoreVertical } from "lucide-react";

import { cn } from "@/lib/utils";
import AddTask from "../TaskDialog/AddTask";
import TaskCard from "./TaskCard";
import type { ColumnId } from "../../data/data";
import type { ApiTask } from "../../types/tasks";
import { columnToStatus } from "../../utils/task-mapper";

const headerStyles: Record<ColumnId, { bg: string; dot: string }> = {
  todo: { bg: "bg-white", dot: "bg-slate-400" },
  "in-progress": { bg: "bg-blue-50", dot: "bg-blue-500" },
  "in-review": { bg: "bg-rose-50", dot: "bg-rose-400" },
  completed: { bg: "bg-green-50", dot: "bg-green-500" },
};

interface KanbanColumnProps {
  id: ColumnId;
  title: string;
  tasks: ApiTask[];
  /** Show the per-column "Add Task" button. Off on the cross-project page,
   *  which has no project context to create a task in. */
  showAdd?: boolean;
}

export default function KanbanColumn({
  id,
  title,
  tasks,
  showAdd = true,
}: KanbanColumnProps) {
  const style = headerStyles[id];

  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-white ring-1 ring-slate-200/70 overflow-y-auto max-h-[calc(100vh-11rem)]">
      <div
        className={cn("flex items-center justify-between px-4 py-3", style.bg)}
      >
        <div className="flex items-center gap-2">
          <span className={cn("size-2 rounded-full", style.dot)} />
          <span className="text-sm font-medium text-text-h">{title}</span>
        </div>
        <button className="text-muted-foreground hover:text-foreground">
          <MoreVertical className="size-4" />
        </button>
      </div>

      <div className="flex flex-col gap-3 p-4">
        {showAdd && <AddTask status={columnToStatus[id]} />}

        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

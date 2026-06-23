import { MoreVertical, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import TaskCard from "./task-card";
import { columns, type ColumnId } from "./data/data";

const headerStyles: Record<ColumnId, { bg: string; dot: string }> = {
  todo: { bg: "bg-white", dot: "bg-slate-400" },
  "in-progress": { bg: "bg-blue-50", dot: "bg-blue-500" },
  "in-review": { bg: "bg-rose-50", dot: "bg-rose-400" },
  completed: { bg: "bg-green-50", dot: "bg-green-500" },
};

export default function KanbanBoard() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {columns.map((column) => {
        const style = headerStyles[column.id];
        return (
          <div
            key={column.id}
            className="flex flex-col overflow-hidden rounded-xl bg-white ring-1 ring-slate-200/70"
          >
            <div
              className={cn(
                "flex items-center justify-between px-4 py-3",
                style.bg,
              )}
            >
              <div className="flex items-center gap-2">
                <span className={cn("size-2 rounded-full", style.dot)} />
                <span className="text-sm font-medium text-text-h">
                  {column.title}
                </span>
              </div>
              <button className="text-muted-foreground hover:text-foreground">
                <MoreVertical className="size-4" />
              </button>
            </div>

            <div className="flex flex-col gap-3 p-4">
              <button className="flex items-center justify-center gap-1.5 rounded-full border border-dashed border-brand/60 py-2.5 text-sm font-medium text-brand transition-colors hover:bg-brand/5">
                Add Task
                <Plus className="size-4" />
              </button>

              {column.tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

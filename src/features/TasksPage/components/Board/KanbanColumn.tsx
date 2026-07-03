import { useState } from "react";
import { MoreVertical } from "lucide-react";

import { cn } from "@/lib/utils";
import AddTask from "../TaskDialog/AddTask";
import TaskCard from "./TaskCard";
import type { ColumnId } from "../../data/data";
import type { ApiTask } from "../../types/tasks";
import { columnToStatus } from "../../utils/task-mapper";
import { useUpdateTask } from "../../hooks/useUpdateTask";

// Key used to carry the dragged task across the native drag-and-drop API.
const DRAG_MIME = "application/x-task";

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
  const updateTask = useUpdateTask();
  const [isDragOver, setIsDragOver] = useState(false);
  const [draggingId, setDraggingId] = useState<number | null>(null);

  // Move a dropped task into this column by persisting the new status.
  // Mirrors the payload EditTask sends so nothing else about the task changes.
  const moveTaskHere = (task: ApiTask) => {
    const status = columnToStatus[id];
    if (task.status === status) return; // dropped back on its own column

    updateTask.mutate({
      id: task.id,
      data: {
        project_id: task.project_id,
        title: task.title,
        start_date: task.start_date?.slice(0, 10) ?? "",
        description: task.description ?? "",
        priority: task.priority,
        status,
        // keep existing assignees (API requires ≥1)
        user_ids: task.assignees.length
          ? task.assignees.map((a) => a.id)
          : [1],
      },
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const raw = e.dataTransfer.getData(DRAG_MIME);
    if (!raw) return;
    try {
      moveTaskHere(JSON.parse(raw) as ApiTask);
    } catch {
      /* ignore malformed drag payloads */
    }
  };

  return (
    <div
      onDragOver={(e) => {
        // Only react to task drags so unrelated drops are ignored.
        if (!e.dataTransfer.types.includes(DRAG_MIME)) return;
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      className={cn(
        "flex flex-col overflow-hidden scrollbar rounded-xl bg-white ring-1 ring-slate-200/70 overflow-y-auto max-h-[calc(100vh-11rem)] transition-shadow",
        isDragOver && "ring-2 ring-brand",
      )}
    >
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
          <div
            key={task.id}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData(DRAG_MIME, JSON.stringify(task));
              e.dataTransfer.effectAllowed = "move";
              setDraggingId(task.id);
            }}
            onDragEnd={() => setDraggingId(null)}
            className={cn(
              "cursor-grab active:cursor-grabbing transition-opacity",
              draggingId === task.id && "opacity-40",
            )}
          >
            <TaskCard task={task} />
          </div>
        ))}
      </div>
    </div>
  );
}

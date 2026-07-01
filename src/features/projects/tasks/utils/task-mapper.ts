import type { ColumnId, Priority, Task } from "../data/data";
import type { ApiTask, TaskPriority, TaskStatus } from "../types/tasks";

// API status → board column id
const statusToColumn: Record<TaskStatus, ColumnId> = {
  pending: "todo",
  in_progress: "in-progress",
  in_review: "in-review",
  completed: "completed",
};

// board column id → API status (reverse of statusToColumn).
// Used when creating a task from a specific column.
export const columnToStatus: Record<ColumnId, TaskStatus> = {
  todo: "pending",
  "in-progress": "in_progress",
  "in-review": "in_review",
  completed: "completed",
};

// API priority → UI priority badge (no "critical" in the UI → treat as High)
const priorityMap: Record<TaskPriority, Priority> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "High",
};

// Convert one API task into the shape TaskCard expects.
export function mapApiTask(task: ApiTask): Task {
  return {
    id: String(task.id),
    title: task.title,
    description: task.description ?? "",
    priority: priorityMap[task.priority],
    comments: 0, // API has no comment count yet
    date: task.due_date
      ? new Date(task.due_date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      : "—",
    avatars: task.assignees.map(
      (a) => `https://i.pravatar.cc/64?u=${encodeURIComponent(a.email)}`,
    ),
    progress: task.status === "in_progress" ? task.progress : undefined,
  };
}

// Group raw API tasks into the four board columns.
// (Cards map to UI shape themselves so they keep access to the raw task.)
export function groupTasksByColumn(
  tasks: ApiTask[],
): Record<ColumnId, ApiTask[]> {
  const grouped: Record<ColumnId, ApiTask[]> = {
    todo: [],
    "in-progress": [],
    "in-review": [],
    completed: [],
  };
  for (const task of tasks) {
    grouped[statusToColumn[task.status]].push(task);
  }
  return grouped;
}

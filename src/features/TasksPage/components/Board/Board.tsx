import KanbanColumn from "./KanbanColumn";
import { SkeletonCard } from "./SkeletonCard";
import { columns } from "../../data/data";
import { groupTasksByColumn } from "../../utils/task-mapper";
import type { ApiTask } from "../../types/tasks";

interface BoardProps {
  tasks: ApiTask[];
  isPending: boolean;
  isError: boolean;
  error: Error | null;
}

/**
 * Cross-project task board for the standalone /tasks page.
 * Receives tasks (already filtered) from the parent TasksPage and groups
 * them into the status columns.
 */
export function Board({ tasks, isPending, isError, error }: BoardProps) {
  if (isPending) {
    return (
      <section className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </section>
    );
  }

  if (isError) {
    return (
      <p className="p-4 text-sm text-red-600">
        Failed to load tasks: {error?.message}
      </p>
    );
  }

  const tasksByColumn = groupTasksByColumn(tasks);

  return (
    <section className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
      {columns.map((column) => (
        <KanbanColumn
          key={column.id}
          id={column.id}
          title={column.title}
          tasks={tasksByColumn[column.id]}
          showAdd={false}
        />
      ))}
    </section>
  );
}


import KanbanColumn from "./KanbanColumn";
import { SkeletonCard } from "./SkeletonCard";
import { columns } from "../../data/data";
import { useTasks } from "../../hooks/useTasks";
import { groupTasksByColumn } from "../../utils/task-mapper";

/**
 * Cross-project task board for the standalone /tasks page.
 * Fetches every task and groups it into the status columns.
 * (The project-scoped board lives in features/projects/tasks and reuses
 *  the same KanbanColumn + hooks, just filtered to one project.)
 */
export function Board() {
  const { data, isPending, isError, error } = useTasks();

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
        Failed to load tasks: {error.message}
      </p>
    );
  }

  const tasksByColumn = groupTasksByColumn(data.data);

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

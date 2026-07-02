import { useParams } from "react-router-dom";

// Shared task logic + UI now live in the canonical TasksPage feature;
// this project board just reuses them, filtered to one project.
import { columns } from "@/features/TasksPage/data/data";
import { useTasks } from "@/features/TasksPage/hooks/useTasks";
import { groupTasksByColumn } from "@/features/TasksPage/utils/task-mapper";
import KanbanColumn from "@/features/TasksPage/components/Board/KanbanColumn";

export default function KanbanBoard() {
  const { projectId } = useParams();
  const { data, isPending, isError, error } = useTasks();

  if (isPending) {
    return <p className="p-4 text-sm text-muted-foreground">Loading tasks…</p>;
  }

  if (isError) {
    return (
      <p className="p-4 text-sm text-red-600">
        Failed to load tasks: {error.message}
      </p>
    );
  }

  // API has no project filter, so filter to this project's tasks here.
  const projectTasks = data.data.filter(
    (task) => task.project_id === Number(projectId),
  );
  const tasksByColumn = groupTasksByColumn(projectTasks);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {columns.map((column) => (
        <KanbanColumn
          key={column.id}
          id={column.id}
          title={column.title}
          tasks={tasksByColumn[column.id]}
        />
      ))}
    </div>
  );
}

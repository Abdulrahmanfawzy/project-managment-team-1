import { useParams } from "react-router-dom";

import { columns } from "./data/data";
import { useTasks } from "./hooks/useTasks";
import { groupTasksByColumn } from "./utils/task-mapper";
import KanbanColumn from "./components/KanbanColumn";

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

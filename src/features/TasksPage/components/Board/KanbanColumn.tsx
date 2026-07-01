import type { TaskColumn } from "../../types";
import AddTaskButton from "./AddTaskButton";
import { TaskCard } from "./TaskCard";
import { ColumnHeader } from "./ColumnHeader";

export function KanbanColumn({ column }: { column: TaskColumn }) {
  return (
    <div className="max-h-162.5 overflow-y-scroll rounded-2xl border border-border-secondary bg-background overflow-hidden">
      <ColumnHeader title={column.title} variant={column.variant} />

      <div className="p-4">
        <AddTaskButton />

        <div className="mt-4 space-y-4">
          {column.tasks?.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}

          {column.tasks?.length === 0 && (
            <div className="text-center text-sm text-muted-foreground py-8">
              No tasks yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

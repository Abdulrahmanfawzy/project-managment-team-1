import type { Column } from "@/types";
import { ColumnHeader } from "./ColumnHeader";
import AddTaskButton from "./AddTaskButton";
import { TaskCard } from "./TaskCard";

interface KanbanColumnProps {
    column: Column;
}

export function KanbanColumn({ column }: KanbanColumnProps) {
    return (
        <div className="min-h-162.5 rounded-2xl border border-border-secondary bg-background overflow-hidden">
            <ColumnHeader
                title={column.title}
                variant={column.variant}
            />

            <div className="p-4">
                <AddTaskButton />

                <div className="mt-4 space-y-4">
                    {column.tasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}

                    {column.tasks.length === 0 && (
                        <div className="text-center text-sm text-muted-foreground py-8">
                            No Tasks Yet
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
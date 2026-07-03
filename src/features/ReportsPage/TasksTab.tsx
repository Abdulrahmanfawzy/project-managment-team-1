import { useState } from "react";
import { Loader2 } from "lucide-react";
import type { ProfileTask } from "./api/profile.api";
import TaskColumn from "./TaskColumn";
import PaginationControls from "./PaginationControls";
import { useProfileTasks } from "./hooks/useProfileTasks";

export default function TasksTab() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, isFetching } = useProfileTasks(page);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-brand" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-20 text-sm text-red-500">
        Failed to load tasks. Please try again later.
      </div>
    );
  }

  // Normalise: handle `{ data: [...] }` (Laravel resource) or a plain array.
  const tasks: ProfileTask[] = Array.isArray(data)
    ? data
    : (data as { data: ProfileTask[] } | undefined)?.data ?? [];

  const meta = !Array.isArray(data) ? (data as { meta?: { current_page: number; last_page: number } })?.meta : undefined;

  // Split tasks into todo (not completed) and done (completed / progress === 100)
  const todoTasks = tasks
    .filter((t) => t.status !== "completed" && t.progress < 100)
    .map((t) => ({
      id: String(t.id),
      name: t.title || t.name || "Untitled",
      progress: t.progress ?? 0,
    }));

  const doneTasks = tasks
    .filter((t) => t.status === "completed" || t.progress === 100)
    .map((t) => ({
      id: String(t.id),
      name: t.title || t.name || "Untitled",
      progress: 100,
    }));

  return (
    <div className="py-6 w-full">
      {tasks.length === 0 ? (
        <div className="flex items-center justify-center py-20 text-sm text-slate-400">
          No tasks found.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-start">
            <TaskColumn
              title="To do"
              count={todoTasks.length}
              tasks={todoTasks}
              variant="todo"
            />
            <TaskColumn
              title="Done"
              count={doneTasks.length}
              tasks={doneTasks}
              variant="done"
            />
          </div>

          {/* Pagination */}
          {meta && (
            <PaginationControls
              currentPage={meta.current_page}
              lastPage={meta.last_page}
              onPageChange={setPage}
              isFetching={isFetching}
            />
          )}
        </>
      )}
    </div>
  );
}

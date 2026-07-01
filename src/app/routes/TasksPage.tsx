import { getTasksApi } from "@/Api/TasksApi";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { SkeletonCard } from "@/components/shared/SkeletonCard";
import { Board } from "@/features/TasksPage/components/Board/Board";
import { Toolbar } from "@/features/TasksPage/components/Toolbar/Toolbar";
import type { TasksResponse } from "@/features/TasksPage/types";
import { useEffect, useState } from "react";

export default function TasksPage() {
  const [tasksResponse, setTasksResponse] = useState<TasksResponse | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await getTasksApi();
        setTasksResponse(response);
      } finally {
        setIsLoading(false);
      }
    };

    getTasks();
  }, []);

  return (
    <DashboardLayout>
      <main className="space-y-6 p-6" aria-busy={isLoading}>
        <Toolbar />
        {isLoading ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              <span>Loading tasks...</span>
            </div>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          </div>
        ) : tasksResponse ? (
          <Board response={tasksResponse} />
        ) : (
          <div className="text-sm text-muted-foreground">
            No tasks available.
          </div>
        )}
      </main>
    </DashboardLayout>
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Board } from "@/features/TasksPage/components/Board/Board";
import type { TasksResponse } from "@/features/TasksPage/types";
import apiClient from "@/services/ApiClient";

export default function KanbanBoard() {
  const { projectId } = useParams<{ projectId: string }>();
  const [tasksResponse, setTasksResponse] = useState<TasksResponse | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProjectTasks = async () => {
      if (!projectId) {
        setError("Project ID is required");
        setIsLoading(false);
        return;
      }

      try {
        // this line back 404  i don't know if it's endPoint or something else for now 
        const response: TasksResponse = await apiClient.get<TasksResponse>(
          `/projects/${projectId}/tasks`,
        );
        setTasksResponse(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load tasks");
      } finally {
        setIsLoading(false);
      }
    };

    getProjectTasks();
  }, [projectId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-sm text-muted-foreground">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-sm text-destructive">{error}</div>
      </div>
    );
  }

  if (!tasksResponse) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-sm text-muted-foreground">No tasks available.</div>
      </div>
    );
  }

  return <Board response={tasksResponse} />;
}

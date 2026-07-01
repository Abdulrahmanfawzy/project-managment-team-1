import type { TasksResponse } from "@/features/TasksPage/types";
import apiClient from "@/services/ApiClient";

export async function getTasksApi(): Promise<TasksResponse> {
  try {
    const response = await apiClient.get<TasksResponse>("/tasks");
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

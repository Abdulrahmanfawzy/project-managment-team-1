import apiClient from "@/services/ApiClient";
import { toFormData } from "@/lib/toFormData";
import type {
  ApiTask,
  CreateTaskPayload,
  UpdateTaskPayload,
  TasksResponse,
} from "../types/tasks";

// The /tasks endpoints only accept form-data, not JSON.
export const tasksApi = {
  getAll: () => apiClient.get<TasksResponse>("/tasks"),
  getById: (id: number) => apiClient.get<ApiTask>(`/tasks/${id}`),
  create: (data: CreateTaskPayload) =>
    apiClient.post<ApiTask>("/tasks", toFormData(data)),
  // Laravel can't parse multipart bodies on PUT, so spoof the method:
  // POST with _method=PUT + form-data.
  update: (id: number, data: UpdateTaskPayload) =>
    apiClient.post<ApiTask>(`/tasks/${id}`, toFormData({ ...data, _method: "PUT" })),
  delete: (id: number) => apiClient.delete<ApiTask>(`/tasks/${id}`),
};

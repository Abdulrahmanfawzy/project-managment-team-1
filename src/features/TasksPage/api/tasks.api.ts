import axios from "axios";
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

/**
 * Upload one or more files to a task.
 *
 * The endpoint is fully dynamic so the caller controls which environment/
 * workspace URL is used:
 *
 *   POST {url}/tasks/{taskId}/files
 *
 * Each file is appended under the key `"files[]"` as required by most
 * Laravel file-upload endpoints. The auth token is read from localStorage
 * the same way the shared axiosInstance does.
 *
 * @param url     - Dynamic base URL (e.g. "https://api.example.com/api/v1")
 * @param taskId  - ID of the task to attach files to
 * @param files   - Array of File objects to upload
 */
export async function uploadTaskFiles(
  url: string,
  taskId: number,
  files: File[],
): Promise<void> {
  const formData = new FormData();

  // Append the task ID into the body so the server can identify
  // which task these files belong to from the multipart payload itself,
  // in addition to the {taskId} route parameter in the URL.
  formData.append("task_id", String(taskId));

  files.forEach((file) => formData.append("file", file));

  const token = localStorage.getItem("token");

  await axios.post(`${url}/tasks/${taskId}/files`, formData, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      // Do NOT set Content-Type manually — axios sets multipart/form-data
      // with the correct boundary when the body is a FormData instance.
    },
  });
}

import apiClient from "@/services/ApiClient";
import type { GetTasksResponse } from "./tasksTypes";

const TasksService = {
  getAll: (): Promise<GetTasksResponse> =>
    apiClient.get<GetTasksResponse>("/tasks"),
};

export default TasksService;
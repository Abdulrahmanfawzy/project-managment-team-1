import type { Paginated } from "@/types/pagination";

export type TaskStatus = "pending" | "in_progress" | "in_review" | "completed";
export type TaskPriority = "low" | "medium" | "high" | "critical";

export interface TaskAssignee {
  id: number;
  name: string;
  email: string;
}

export interface TaskProject {
  id: number;
  name: string;
}

export interface ApiTask {
  id: number;
  project_id: number;
  title: string;
  description: string | null;
  start_date: string | null;
  due_date: string | null;
  progress: number;
  status: TaskStatus;
  priority: TaskPriority;
  project: TaskProject;
  assignees: TaskAssignee[];
  created_at: string;
  updated_at: string;
}

export interface UpdateTaskPayload {
  project_id: number;
  title: string;
  priority: TaskPriority;
  status: TaskStatus;
  start_date: string;
  user_ids: number[];
  description?: string; // optional
}

export interface CreateTaskPayload {
  project_id: number;
  title: string;
  name: string;
  priority: TaskPriority;
  status: TaskStatus;
  start_date: string;
  user_ids: number[];
  description?: string; // optional
}

/** Response shape for `GET /tasks`. */
export type TasksResponse = Paginated<ApiTask>;

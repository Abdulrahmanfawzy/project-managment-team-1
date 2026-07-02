export interface ApiTask {
  id: number;
  project_id: number;
  title: string;
  description: string;
  start_date: string;
  due_date: string | null;
  progress: number;
  status: "pending" | "in_progress" | "completed" | string;
  priority: "high" | "medium" | "low";
  project: {
    id: number;
    name: string;
  };
  assignees: Array<{
    id: number;
    name: string;
    email: string;
  }>;
  created_at: string;
  updated_at: string;
}

export interface GetTasksResponse {
  data: ApiTask[];
  meta?: {
    total: number;
  };
}
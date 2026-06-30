export interface UpdateProjectPayload {
  name: string;
  description: string;
  start_date: string;
  deadline: string;
  priority: "high" | "medium" | "low";
  status?: "pending" | "in_progress" | "completed";
}

export interface UpdateProjectResponse {
  data: {
    id: number;
    name: string;
    description: string;
    start_date: string;
    deadline: string;
    priority: string;
    status: string;
    created_by: {
      id: number;
      name: string;
    };
    media: unknown[];
    created_at: string;
    updated_at: string;
  };
}
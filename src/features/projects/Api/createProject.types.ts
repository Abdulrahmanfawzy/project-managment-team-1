export interface CreateProjectPayload {
  name: string;
  description: string;
  start_date: string; // "YYYY-MM-DD"
  deadline: string; // "YYYY-MM-DD"
  priority: "high" | "medium" | "low";
  status?: "pending" | "in_progress" | "completed";
}

export interface CreateProjectResponse {
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
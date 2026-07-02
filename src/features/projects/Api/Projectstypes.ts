// Shape of the data as it actually comes back from the API
export interface ApiTeam {
  id: number;
  name: string;
  display_name: string | null;
}

export interface ApiCreatedBy {
  id: number;
  name: string;
}

export interface ApiProject {
  id: number;
  name: string;
  description: string;
  start_date: string;
  deadline: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in_progress" | "completed" | string;
  created_by: ApiCreatedBy;
  teams: ApiTeam[];
  media: unknown[];
  created_at: string;
  updated_at: string;
}

export interface GetProjectsResponse {
  data: ApiProject[];
  links?: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta?: {
    current_page: number;
    last_page: number;
    total: number;
  };
}
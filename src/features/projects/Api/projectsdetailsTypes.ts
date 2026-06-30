export interface ApiProjectDetailsTeam {
  id: number;
  name: string;
  display_name: string | null;
}

export interface ApiProjectDetailsCreatedBy {
  id: number;
  name: string;
}

export interface ApiProjectDetails {
  id: number;
  name: string;
  description: string;
  start_date: string;
  deadline: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in_progress" | "completed" | string;
  created_by: ApiProjectDetailsCreatedBy;
  teams: ApiProjectDetailsTeam[];
  media: unknown[];
  created_at: string;
  updated_at: string;
}

export interface GetProjectDetailsResponse {
  data: ApiProjectDetails;
}
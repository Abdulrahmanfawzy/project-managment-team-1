export interface Assignee {
  id: number;
  name: string;
  email: string;
}

export interface Project {
  id: number;
  name: string;
}

export type Priority = "critical" | "high" | "medium" | "low";

export interface Task {
  id: number;
  project_id: number;
  title: string;
  description: string;
  start_date: string;
  due_date: string | null;
  progress: number;
  status: string;
  priority: Priority;
  project: Project;
  assignees: Assignee[] | null;
  created_at: string;
  updated_at: string;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

export interface TasksResponse {
  data: Task[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: PaginationLink[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export type ColumnVariant = "todo" | "in_progress" | "pending" | "completed";

export interface TaskColumn {
  id: ColumnVariant;
  title: string;
  variant: ColumnVariant;
  tasks?: Task[];
}

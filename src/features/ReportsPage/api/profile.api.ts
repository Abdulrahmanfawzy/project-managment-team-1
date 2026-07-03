import apiClient from "@/services/ApiClient";

// ── Response types ──────────────────────────────────────────────────────────

export interface ProfileFile {
  id: number;
  name: string;
  path: string;
  size: number; // bytes
  mime_type: string;
  created_at: string;
  updated_at: string;
  [key: string]: unknown; // allow extra fields from the API
}

export interface ProfileTask {
  id: number;
  title: string;
  name?: string;
  status: string;
  priority: string;
  progress: number;
  start_date: string | null;
  due_date: string | null;
  description: string | null;
  project?: { id: number; name: string };
  assignees?: { id: number; name: string; email: string }[];
  created_at: string;
  updated_at: string;
  [key: string]: unknown;
}

export interface ProfileActivity {
  id: number;
  description: string;
  created_at: string;
  [key: string]: unknown;
}

/** Standard Laravel pagination links / meta */
export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
}

// ── API calls ───────────────────────────────────────────────────────────────

/** GET /profile/files — no pagination */
export const getProfileFiles = () =>
  apiClient.get<{ data: ProfileFile[] } | ProfileFile[]>("/profile/files");

/** GET /profile/tasks?per_page=15&page=N */
export const getProfileTasks = (page: number = 1, perPage: number = 15) =>
  apiClient.get<PaginatedResponse<ProfileTask>>("/profile/tasks", {
    per_page: perPage,
    page,
  });

/** GET /profile/activity?limit=15&page=N */
export const getProfileActivity = (page: number = 1, limit: number = 15) =>
  apiClient.get<PaginatedResponse<ProfileActivity>>("/profile/activity", {
    limit,
    page,
  });

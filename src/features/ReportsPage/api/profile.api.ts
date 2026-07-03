import apiClient from "@/services/ApiClient";

// ── Response types ──────────────────────────────────────────────────────────

export interface ProfileCounts {
  tasks: number;
  teams: number;
  projects: number;
}

export interface Profile {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  country_code: string | null;
  full_phone: string | null;
  about: string | null;
  job_title: string | null;
  experience_years: number;
  availability_status: string;
  current_team: string | null;
  current_project: string | null;
  teams: { id: number; name: string }[];
  roles: { id: number; name: string }[] | string[];
  counts: ProfileCounts;
  files: ProfileFile[];
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  [key: string]: unknown;
}

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

/** GET /profile — the authenticated user's own profile */
export const getProfile = () =>
  apiClient.get<{ data: Profile } | Profile>("/profile");

/** Body accepted by `PUT /profile`. */
export interface UpdateProfilePayload {
  name: string;
  email: string;
  phone?: string | null;
  country_code?: string | null;
  about?: string | null;
  job_title?: string | null;
  experience_years?: number;
  availability_status?: string;
  current_team_id?: number | null;
  current_project_id?: number | null;
}

/** PUT /profile — update the authenticated user's profile; returns the fresh record. */
export const updateProfile = (payload: UpdateProfilePayload) =>
  apiClient.put<{ data: Profile } | Profile>("/profile", payload);

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

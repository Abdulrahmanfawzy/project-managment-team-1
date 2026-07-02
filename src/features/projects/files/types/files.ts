export interface FileResponse {
  id: number;
  name: string;
  original_name: string;
  mime_type: string;
  extension: string;
  file_type: string;
  size: number;
  status: "attached" | "detached";
  url: string;
  download_url: string;
  uploaded_by: string;
  uploaded_by_id: number;
  is_attached: boolean;
  // null for detached files that aren't linked to a project/task
  attachable_type: "project" | "task" | null;
  attachable_id: number | null;
  // The linked project/task, included when a file is fetched/created attached.
  attachable?: {
    id: number;
    type: string;
    label: string;
  } | null;
  uploader: {
    id: number;
    name: string;
    email: string;
  };
  created_at: string;
  updated_at: string;
}

// Laravel-style pagination wrapper returned by the GET /files list endpoint.
export interface PaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface PaginationMeta {
  current_page: number;
  from: number | null;
  last_page: number;
  links: { url: string | null; label: string; page: number | null; active: boolean }[];
  path: string;
  per_page: number;
  to: number | null;
  total: number;
}

export interface FilesListResponse {
  data: FileResponse[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

export interface UploadFilePayload {
  name: string;
  file: File;
}
export interface UploadFileResponse {
  data: FileResponse;
}

export interface ProjectFilesResponse {
  data: FileResponse[];
}

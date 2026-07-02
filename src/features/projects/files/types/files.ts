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
  is_attached: boolean;
  attachable_type: "project" | "task";
  attachable_id: number;
  uploader: {
    id: number;
    name: string;
    email: string;
  };
  created_at: string;
  updated_at: string;
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

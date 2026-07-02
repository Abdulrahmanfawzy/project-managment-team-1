import apiClient from "@/services/ApiClient";
import { toFormData } from "@/lib/toFormData";
import type {
  UploadFilePayload,
  ProjectFilesResponse,
  UploadFileResponse,
} from "../types/files";

// The /files endpoints only accept form-data, not JSON.
export const projectFilesApi = {
  getAll: (projectId: number) =>
    apiClient.get<ProjectFilesResponse>(`projects/${projectId}/files`),
  // Upload via POST /files. With a valid projectId it attaches to that project
  // ("Upload & Attach to Project"); without one it's a detached upload.
  create: (projectId: number | undefined, data: UploadFilePayload) =>
    apiClient.post<UploadFileResponse>(
      `files`,
      toFormData({
        ...data,
        project_id: Number.isFinite(projectId) ? projectId : undefined,
      }),
    ),
};

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
  create: (projectId: number, data: UploadFilePayload) =>
    apiClient.post<UploadFileResponse>(
      `projects/${projectId}/files`,
      toFormData(data),
    ),
};

import api from "@/lib/axios";
import type { FilesListResponse } from "@/features/projects/files/types/files";

// GET /files — all files across the workspace (paginated).
export const getFiles = async (): Promise<FilesListResponse> => {
  const { data } = await api.get<FilesListResponse>("/files");
  return data;
};

import { useQuery } from "@tanstack/react-query";
import { projectFilesApi } from "../api/projectFiles.api";
import { fileKeys } from "../types/filesKeys";

export function useProjectFiles(projectId: number) {
  return useQuery({
    queryKey: fileKeys.lists(),
    queryFn: () => projectFilesApi.getAll(projectId),
  });
}

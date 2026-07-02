import { useMutation, useQueryClient } from "@tanstack/react-query";

import { projectFilesApi } from "../api/projectFiles.api";
import { fileKeys } from "../types/filesKeys";
import type { UploadFilePayload } from "../types/files";

const useUploadFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      data,
    }: {
      projectId: number | undefined;
      data: UploadFilePayload;
    }) => projectFilesApi.create(projectId, data),
    onSuccess: () => {
      // Refresh both the per-project list and the workspace-wide all-files list.
      queryClient.invalidateQueries({ queryKey: fileKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
  });
};

export default useUploadFile;

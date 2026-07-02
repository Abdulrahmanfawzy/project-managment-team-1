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
      projectId: number;
      data: UploadFilePayload;
    }) => projectFilesApi.create(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: fileKeys.lists() });
    },
  });
};

export default useUploadFile;

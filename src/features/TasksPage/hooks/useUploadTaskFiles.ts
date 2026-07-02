import { useMutation } from "@tanstack/react-query";
import { tasksApi } from "../api/tasks.api";

interface UploadTaskFilesArgs {
  url: string;
  files: File[];
  taskId: number;
}

const useUploadTaskFiles = () => {
  return useMutation({
    mutationFn: ({ url, taskId, files }: UploadTaskFilesArgs) =>
      tasksApi.uploadFiles(url, taskId, files),
  });
};

export default useUploadTaskFiles;


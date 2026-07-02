import { useQuery } from "@tanstack/react-query";
import { tasksApi } from "../api/tasks.api";
import { taskKeys } from "./tasksKeys";

export function useTask(id: number) {
  return useQuery({
    queryKey: taskKeys.detail(id),
    queryFn: () => tasksApi.getById(id),
    enabled: !!id,
  });
}

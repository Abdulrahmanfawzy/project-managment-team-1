import { useMutation, useQueryClient } from "@tanstack/react-query";
import ProjectsService from "../Api/Projectsservice";
import { PROJECTS_QUERY_KEY } from "./useProjects";
import type { UpdateProjectPayload } from "../Api/updateProject.types";

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateProjectPayload;
    }) => ProjectsService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
  });
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ProjectsService from "../Api/Projectsservice";
import { PROJECTS_QUERY_KEY } from "./useProjects";

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ProjectsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
  });
}
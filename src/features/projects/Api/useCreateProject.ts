import { useMutation, useQueryClient } from "@tanstack/react-query";
import ProjectsService from "../Api/Projectsservice";
import { PROJECTS_QUERY_KEY } from "../hooks/useProjects";
import type { CreateProjectPayload } from "../Api/createProject.types";

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProjectPayload) =>
      ProjectsService.create(payload),
    onSuccess: () => {
      // Refresh the projects list so the new project shows up immediately.
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
  });
}
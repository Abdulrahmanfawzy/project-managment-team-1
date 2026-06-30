import { useQuery } from "@tanstack/react-query";
import ProjectsService from "../Api/Projectsservice";
import { mapApiProjectToProject } from "../Api/projects.mapper";
import type { Project } from "@/types/project";

export const PROJECTS_QUERY_KEY = ["projects"] as const;

export function useProjects() {
  return useQuery({
    queryKey: PROJECTS_QUERY_KEY,
    queryFn: async (): Promise<Project[]> => {
      const res = await ProjectsService.getAll();
      return res.data.map(mapApiProjectToProject);
    },
  });
}

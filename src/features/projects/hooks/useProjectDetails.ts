import { useQuery } from "@tanstack/react-query";
import ProjectDetailsService from "../Api/projectDetailsService";
import TasksService from "../Api/tasksService";
import {
  mapApiProjectDetailsToProjectDetails,
  computeTaskStats,
} from "../Api/projectDetails.mapper";
import { buildProjectWorkload } from "../utils/workloadChart";
import type { ProjectDetails } from "@/types/project";

export function useProjectDetails(projectId: string | undefined) {
  return useQuery({
    queryKey: ["project-details", projectId],
    queryFn: async (): Promise<ProjectDetails> => {
      // Fetch project details and the full tasks list in parallel.
      const [projectRes, tasksRes] = await Promise.all([
        ProjectDetailsService.getById(projectId!),
        TasksService.getAll(),
      ]);

      const taskStats = computeTaskStats(tasksRes.data, Number(projectId));

      const chartData = buildProjectWorkload(
        tasksRes.data,
        Number(projectId),
        projectRes.data.start_date,
        projectRes.data.deadline,
      );

      return mapApiProjectDetailsToProjectDetails(
        projectRes.data,
        taskStats,
        chartData,
      );
    },
    enabled: !!projectId,
  });
}

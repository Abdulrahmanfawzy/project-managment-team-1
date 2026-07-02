import { useQuery } from "@tanstack/react-query";
import { teamsApi } from "../api/teams.api";
import { teamKeys } from "./teamKeys";

export function useProjectTeams(projectId: number) {
  return useQuery({
    queryKey: teamKeys.lists(projectId),
    queryFn: () => teamsApi.getAll(projectId),
    enabled: Number.isFinite(projectId),
  });
}

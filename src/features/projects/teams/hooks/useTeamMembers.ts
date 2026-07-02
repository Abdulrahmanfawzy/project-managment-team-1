import { useQuery } from "@tanstack/react-query";

import { teamsApi } from "../api/teams.api";
import { teamKeys } from "./teamKeys";

export function useTeamMembers(teamId: number) {
  return useQuery({
    queryKey: teamKeys.members(teamId),
    queryFn: () => teamsApi.getMembers(teamId),
    enabled: Number.isFinite(teamId),
  });
}

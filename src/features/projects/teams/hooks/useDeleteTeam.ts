import { useMutation, useQueryClient } from "@tanstack/react-query";

import { teamsApi } from "../api/teams.api";
import { teamKeys } from "./teamKeys";

export function useDeleteTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (teamId: number) => teamsApi.delete(teamId),
    onSuccess: () => {
      // Refresh every team list/members query (covers the current project).
      queryClient.invalidateQueries({ queryKey: teamKeys.all });
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { teamsApi } from "../api/teams.api";
import { teamKeys } from "./teamKeys";

interface AddTeamMembersVars {
  teamId: number;
  userIds: number[];
}

/** Add members to an existing team (POST /teams/{id}/members). */
export function useAddTeamMembers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ teamId, userIds }: AddTeamMembersVars) =>
      teamsApi.addMembers(teamId, { user_ids: userIds }),
    onSuccess: (_res, { teamId }) => {
      queryClient.invalidateQueries({ queryKey: teamKeys.members(teamId) });
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { teamsApi } from "../api/teams.api";
import { teamKeys } from "./teamKeys";

interface CreateTeamForProjectVars {
  projectId: number;
  name: string;
  userIds: number[];
}

/**
 * Creates a team and attaches it to the current project in one submit.
 * The backend splits this across three endpoints, so we chain them:
 *   1. POST /teams                       → create the team, get its id
 *   2. POST /teams/{id}/members          → add the selected members (if any)
 *   3. POST /projects/{projectId}/teams  → attach the team to this project
 *
 * If any step fails the mutation rejects, so the form can surface the error.
 */
export function useCreateTeamForProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      projectId,
      name,
      userIds,
    }: CreateTeamForProjectVars) => {
      // 1. create the global team
      const created = await teamsApi.create({ name });
      const teamId = created.data.id;

      // 2. add members (skip the call when none were entered)
      if (userIds.length > 0) {
        await teamsApi.addMembers(teamId, { user_ids: userIds });
      }

      // 3. attach the new team to the current project
      return teamsApi.attachToProject(projectId, { team_ids: [teamId] });
    },
    onSuccess: (_res, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: teamKeys.lists(projectId) });
    },
  });
}

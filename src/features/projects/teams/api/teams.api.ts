import apiClient from "@/services/ApiClient";
import { toFormData } from "@/lib/toFormData";
import type {
  ProjectTeamsRes,
  TeamMembersRes,
  CreateTeamPayload,
  CreateTeamRes,
  AddMembersPayload,
  AddMembersRes,
  AttachTeamsPayload,
  AttachTeamsRes,
  DeleteTeamRes,
} from "../types/teams";

// The /teams endpoints only accept form-data, not JSON.
export const teamsApi = {
  getAll: (projectId: number) =>
    apiClient.get<ProjectTeamsRes>(`/projects/${projectId}/teams`),

  // The team's members (the project teams list doesn't expand them).
  getMembers: (teamId: number) =>
    apiClient.get<TeamMembersRes>(`/teams/${teamId}/members`),

  // 1. Create a global team.
  create: (data: CreateTeamPayload) =>
    apiClient.post<CreateTeamRes>(`/teams`, toFormData(data)),

  // 2. Add members (user ids) to a team. `user_ids` is sent as user_ids[0], …
  addMembers: (teamId: number, data: AddMembersPayload) =>
    apiClient.post<AddMembersRes>(`/teams/${teamId}/members`, toFormData(data)),

  // 3. Attach existing team(s) to a project. `team_ids` sent as team_ids[0], …
  attachToProject: (projectId: number, data: AttachTeamsPayload) =>
    apiClient.post<AttachTeamsRes>(
      `/projects/${projectId}/teams`,
      toFormData(data),
    ),

  // Delete a team globally.
  delete: (teamId: number) =>
    apiClient.delete<DeleteTeamRes>(`/teams/${teamId}`),
};

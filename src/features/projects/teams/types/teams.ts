export interface TeamMember {
  id: number;
  name: string;
  email: string;
  job_title: string | null;
  phone: string | null;
  country_code: string | null;
  experience_years: number;
  availability_status: string;
  avatar_url: string;
}

export interface ProjectTeam {
  id: number;
  name: string;
  display_name: string | null;
  description: string | null;
  // Present only on endpoints that expand members (e.g. add-members response);
  // the project teams list may omit them.
  members?: TeamMember[];
  members_count?: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectTeamsRes {
  data: ProjectTeam[];
}

/** GET /teams/{teamId}/members — the team's members. */
export interface TeamMembersRes {
  data: TeamMember[];
}

/** POST /teams — create a global team. */
export interface CreateTeamPayload {
  name: string;
}
export interface CreateTeamRes {
  data: ProjectTeam;
}

/** POST /teams/{teamId}/members — attach users to a team. */
export interface AddMembersPayload {
  user_ids: number[];
}
export interface AddMembersRes {
  data: ProjectTeam & {
    members: TeamMember[];
    members_count: number;
    projects_count: number;
  };
}

/** DELETE /teams/{teamId} — delete a team. */
export interface DeleteTeamRes {
  message: string;
}

/** POST /projects/{projectId}/teams — attach existing teams to a project. */
export interface AttachTeamsPayload {
  team_ids: number[];
}
export interface AttachTeamsRes {
  data: {
    id: number;
    name: string;
    teams: Pick<ProjectTeam, "id" | "name" | "display_name">[];
  };
}

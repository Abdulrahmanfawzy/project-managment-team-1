export interface MeetingParticipant {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
}

export interface MeetingCreator {
  id: number;
  name: string;
  email: string;
}

export interface MeetingProject {
  id: number;
  name: string;
}

export interface MeetingTeam {
  id: number;
  name: string;
}

export interface Meeting {
  id: string;
  title: string;
  description: string;
  starts_at: string;
  ends_at: string;
  date: string;
  start_time: string;
  end_time: string;
  meeting_link: string;
  location: string;
  project_id: number;
  created_by: number;
  creator: MeetingCreator;
  project: MeetingProject;
  participants: MeetingParticipant[];
  teams: MeetingTeam[];
  created_at: string;
  updated_at: string;
}

export interface MeetingResponse {
  success: boolean;
  message: string;
  data: {
    meeting: Meeting;
  };
  paginate: null;
}

export interface MeetingsListResponse {
  success: boolean;
  message: string;
  data: {
    meetings: Meeting[];
  };
  paginate: unknown;
}

/** A user as returned inside a team's `members` array. */
export interface TeamMemberUser {
  id: number;
  name: string;
  email: string;
  avatar_url?: string;
}

/** A team from `GET /teams`, including its inline members. */
export interface TeamWithMembers {
  id: number;
  name: string;
  display_name: string | null;
  members: TeamMemberUser[];
  members_count: number;
}

export interface CreateMeetingPayload {
  title: string;
  description?: string;
  starts_at: string; // "YYYY-MM-DD HH:MM:SS"
  ends_at: string; // "YYYY-MM-DD HH:MM:SS"
  meeting_link?: string;
  location?: string;
  project_id: number;
  team_ids?: number[];
  user_ids?: number[];
}

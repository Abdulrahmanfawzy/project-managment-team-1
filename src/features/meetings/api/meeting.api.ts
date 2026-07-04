import apiClient from "@/services/ApiClient";

import type {
  CreateMeetingPayload,
  MeetingResponse,
  MeetingsListResponse,
} from "../Types/meeting.types";

export const meetingsApi = {
  /** GET /meetings?per_page=N — full meeting objects. */
  list: (perPage = 100) =>
    apiClient.get<MeetingsListResponse>("/meetings", { per_page: perPage }),

  getById: (id: number) => apiClient.get<MeetingResponse>(`/meetings/${id}`),

  /** POST /meetings — create a meeting (JSON body). */
  create: (payload: CreateMeetingPayload) =>
    apiClient.post<MeetingResponse>("/meetings", payload),

  /** PUT /meetings/:id — update a meeting (JSON body). */
  update: (id: number, payload: CreateMeetingPayload) =>
    apiClient.put<MeetingResponse>(`/meetings/${id}`, payload),

  /** DELETE /meetings/:id */
  remove: (id: number) => apiClient.delete<MeetingResponse>(`/meetings/${id}`),
};


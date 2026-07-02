import apiClient from "@/services/ApiClient";

import type { MeetingResponse } from "../Types/meeting.types";

// The /tasks endpoints only accept form-data, not JSON.
export const meetingsApi = {
  getById: (id: number) => apiClient.get<MeetingResponse>(`/meetings/${id}`),
};

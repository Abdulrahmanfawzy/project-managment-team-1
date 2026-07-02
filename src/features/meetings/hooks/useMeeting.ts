import { useQuery } from "@tanstack/react-query";
import { meetingsApi } from "../api/meeting.api";
import { meetingKeys } from "./meetingKeys";

export function useMeeting(id: number) {
  return useQuery({
    queryKey: meetingKeys.detail(id),
    queryFn: () => meetingsApi.getById(id),
    enabled: !!id,
  });
}

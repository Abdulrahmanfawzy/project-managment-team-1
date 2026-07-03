import { useQuery } from "@tanstack/react-query";
import { meetingsApi } from "../api/meeting.api";
import { meetingKeys } from "./meetingKeys";
import type { Meeting } from "../Types/meeting.types";

/** All meetings (unwrapped to a flat `Meeting[]`). */
export function useMeetings(perPage = 100) {
  return useQuery({
    queryKey: meetingKeys.lists(),
    queryFn: () => meetingsApi.list(perPage),
    select: (res): Meeting[] => res.data.meetings,
  });
}

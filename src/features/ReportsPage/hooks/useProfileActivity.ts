import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getProfileActivity } from "../api/profile.api";
import { profileKeys } from "./profileKeys";

export function useProfileActivity(page: number = 1, limit: number = 15) {
  return useQuery({
    queryKey: profileKeys.activity(page),
    queryFn: () => getProfileActivity(page, limit),
    placeholderData: keepPreviousData,
  });
}

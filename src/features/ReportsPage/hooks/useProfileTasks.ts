import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getProfileTasks } from "../api/profile.api";
import { profileKeys } from "./profileKeys";

export function useProfileTasks(page: number = 1, perPage: number = 15) {
  return useQuery({
    queryKey: profileKeys.tasks(page),
    queryFn: () => getProfileTasks(page, perPage),
    placeholderData: keepPreviousData,
  });
}

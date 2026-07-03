import { useQuery } from "@tanstack/react-query";
import { getProfile, type Profile } from "../api/profile.api";
import { profileKeys } from "./profileKeys";

/** Fetch the authenticated user's profile and normalise the `{ data }` wrapper. */
export function useProfile() {
  return useQuery({
    queryKey: profileKeys.detail(),
    queryFn: getProfile,
    select: (raw): Profile =>
      (raw as { data?: Profile })?.data ?? (raw as Profile),
  });
}

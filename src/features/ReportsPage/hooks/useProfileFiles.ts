import { useQuery } from "@tanstack/react-query";
import { getProfileFiles } from "../api/profile.api";
import { profileKeys } from "./profileKeys";

export function useProfileFiles() {
  return useQuery({
    queryKey: profileKeys.files(),
    queryFn: getProfileFiles,
  });
}

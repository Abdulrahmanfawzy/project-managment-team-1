import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  updateProfile,
  type Profile,
  type UpdateProfilePayload,
} from "../api/profile.api";
import { profileKeys } from "./profileKeys";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateProfile(payload),
    onSuccess: (raw) => {
      // The endpoint returns the fresh profile — seed the cache so the header,
      // navbar and overview update immediately without an extra request.
      const updated = (raw as { data?: Profile })?.data ?? (raw as Profile);
      queryClient.setQueryData(profileKeys.detail(), { data: updated });
      toast.success("Profile updated successfully");
    },
    onError: (err: unknown) => {
      const data = (
        err as {
          response?: {
            data?: { message?: string; errors?: Record<string, string[]> };
          };
        }
      )?.response?.data;

      // Laravel 422 returns { message, errors: { field: [msg, ...] } }.
      // Surface the first field-level message (most actionable) and log them all.
      if (data?.errors) {
        console.error("Profile update validation errors:", data.errors);
        const firstMsg = Object.values(data.errors)[0]?.[0];
        toast.error(firstMsg ?? data.message ?? "Failed to update profile");
        return;
      }
      toast.error(data?.message ?? "Failed to update profile");
    },
  });
}

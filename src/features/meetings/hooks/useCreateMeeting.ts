import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { meetingsApi } from "../api/meeting.api";
import { meetingKeys } from "./meetingKeys";
import type { CreateMeetingPayload } from "../Types/meeting.types";

export function useCreateMeeting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateMeetingPayload) => meetingsApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: meetingKeys.lists() });
      toast.success("Meeting created successfully");
    },
    onError: (err: unknown) => {
      const data = (
        err as {
          response?: {
            data?: { message?: string; errors?: Record<string, string[]> };
          };
        }
      )?.response?.data;
      if (data?.errors) {
        const firstMsg = Object.values(data.errors)[0]?.[0];
        toast.error(firstMsg ?? data.message ?? "Failed to create meeting");
        return;
      }
      toast.error(data?.message ?? "Failed to create meeting");
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

import { meetingsApi } from "../api/meeting.api";
import { meetingKeys } from "./meetingKeys";

export function useDeleteMeeting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => meetingsApi.remove(id),
    onSuccess: async () => {
      await Swal.fire({
        icon: "success",
        title: "Meeting deleted",
        timer: 1500,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries({ queryKey: meetingKeys.lists() });
    },
    onError: async (err: unknown) => {
      const message = extractApiErrorMessage(err);
      await Swal.fire({
        icon: "error",
        title: "Delete failed",
        text: message,
      });
    },
  });
}

function extractApiErrorMessage(err: unknown) {
  const data = err as {
    response?: { data?: { message?: string; errors?: Record<string, string[]> } };
  };

  return (
    data.response?.data?.message ??
    (data.response?.data?.errors
      ? Object.values(data.response.data.errors)[0]?.[0]
      : undefined) ??
    "Failed to delete meeting"
  );
}


export const meetingKeys = {
  all: ["meetings"] as const,
  lists: () => [...meetingKeys.all, "list"] as const,
  detail: (id: number) => [...meetingKeys.all, "detail", id] as const,
};

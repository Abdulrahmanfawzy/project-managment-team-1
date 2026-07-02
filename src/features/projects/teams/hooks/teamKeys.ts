export const teamKeys = {
  all: ["teams"] as const,
  lists: (projectId: number) => [...teamKeys.all, "list", projectId] as const,
  detail: (id: number) => [...teamKeys.all, "detail", id] as const,
  members: (teamId: number) => [...teamKeys.all, "members", teamId] as const,
};

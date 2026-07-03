export const profileKeys = {
  all: ["profile"] as const,
  detail: () => [...profileKeys.all, "detail"] as const,
  files: () => [...profileKeys.all, "files"] as const,
  tasks: (page: number) => [...profileKeys.all, "tasks", page] as const,
  activity: (page: number) => [...profileKeys.all, "activity", page] as const,
};

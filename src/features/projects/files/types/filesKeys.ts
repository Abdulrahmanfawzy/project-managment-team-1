export const fileKeys = {
  all: ["files"] as const,
  lists: () => [...fileKeys.all, "list"] as const,
  detail: (id: number) => [...fileKeys.all, "detail", id] as const,
};

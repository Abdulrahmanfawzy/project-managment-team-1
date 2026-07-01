export const taskKeys = {
  all: ["tasks"] as const,
  lists: () => [...taskKeys.all, "list"] as const,
  detail: (id: number) => [...taskKeys.all, "detail", id] as const,
};

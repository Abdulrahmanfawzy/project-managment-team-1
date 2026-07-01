import type { TaskColumn } from "@/features/TasksPage/types";



export const columns : TaskColumn[] = [
  {
    id: "todo",
    title: "To-do",
    variant: "todo",
  },
  {
    id: "in_progress",
    title: "In Progress",
    variant: "in_progress",
  },
  {
    id: "pending",
    title: "In Review",
    variant: "pending",
  },
  {
    id: "completed",
    title: "Completed Tasks",
    variant: "completed",
  },
];

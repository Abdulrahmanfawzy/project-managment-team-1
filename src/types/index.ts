export type ColumnVariant =
    | "todo"
    | "progress"
    | "review"
    | "done";

export interface Column {
    id: string;
    title: string;
    variant: ColumnVariant;
    tasks: Task[];
}

export type Priority = "High" | "Medium" | "Low";

export interface Task {
    id: string;
    title: string;
    description: string;
    priority: Priority;
    comments: number;
    dueDate: string;
    assignees: string[];
    progress?: number;
}

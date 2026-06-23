export type Priority = "High" | "Medium" | "Low";

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  comments: number;
  date: string;
  avatars: string[];
  progress?: number;
  reviewer?: string;
};

export type ColumnId = "todo" | "in-progress" | "in-review" | "completed";

export type Column = {
  id: ColumnId;
  title: string;
  tasks: Task[];
};

const avatar = (n: number) => `https://i.pravatar.cc/64?img=${n}`;

export const columns: Column[] = [
  {
    id: "todo",
    title: "To-do",
    tasks: [
      {
        id: "t1",
        title: "Creat Wireframes",
        description: "Initial layout and structure for mani page",
        priority: "High",
        comments: 8,
        date: "Dec 12",
        avatars: [avatar(1), avatar(2), avatar(3)],
      },
      {
        id: "t2",
        title: "User Research Analysis",
        description: "Initial layout and structure for mani page",
        priority: "Medium",
        comments: 8,
        date: "Dec 12",
        avatars: [avatar(4), avatar(5), avatar(6)],
      },
      {
        id: "t3",
        title: "Design System Updates",
        description: "Update component library with new brand color",
        priority: "Low",
        comments: 8,
        date: "Dec 12",
        avatars: [avatar(7), avatar(8), avatar(9)],
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [
      {
        id: "p1",
        title: "Chat Screen Prototyping",
        description: "Create Interactive Prototype for Chat screen",
        priority: "High",
        comments: 8,
        date: "Dec 12",
        progress: 62,
        avatars: [avatar(11), avatar(12), avatar(13)],
      },
      {
        id: "p2",
        title: "Create Miro interaction",
        description: "Initial layout and structure for mani page",
        priority: "Low",
        comments: 8,
        date: "Dec 12",
        progress: 32,
        avatars: [avatar(14), avatar(15)],
      },
    ],
  },
  {
    id: "in-review",
    title: "In Review",
    tasks: [
      {
        id: "r1",
        title: "Mobile Resposivness",
        description: "Create Interactive Prototype for Chat screen",
        priority: "High",
        comments: 8,
        date: "Dec 12",
        reviewer: "Ali Hassan",
        avatars: [avatar(16), avatar(17), avatar(18)],
      },
      {
        id: "r2",
        title: "Accessibility Audit",
        description: "Initial layout and structure for mani page",
        priority: "Low",
        comments: 8,
        date: "Dec 12",
        reviewer: "Ali Hassan",
        avatars: [avatar(19), avatar(20)],
      },
    ],
  },
  {
    id: "completed",
    title: "Completed Tasks",
    tasks: [
      {
        id: "c1",
        title: "Login Screen",
        description: "Create Interactive Prototype for Chat screen",
        priority: "High",
        comments: 8,
        date: "Dec 12",
        avatars: [avatar(21), avatar(22), avatar(23)],
      },
      {
        id: "c2",
        title: "Survey",
        description: "Initial layout and structure for mani page",
        priority: "Low",
        comments: 8,
        date: "Dec 12",
        avatars: [avatar(24)],
      },
    ],
  },
];

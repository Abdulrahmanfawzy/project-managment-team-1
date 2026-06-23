import type { Column } from "@/types";

const avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
];

export const columns: Column[] = [
    {
        id: "todo",
        title: "To-do",
        variant: "todo",
        tasks: [
            {
                id: "1",
                title: "Creat Wireframes",
                description: "Initial layout and structure for mani page",
                priority: "High",
                comments: 2,
                dueDate: "Dec 12",
                assignees: [avatars[0], avatars[1], avatars[2]],
            },
            {
                id: "2",
                title: "User Research Analysis",
                description: "Initial layout and structure for mani page",
                priority: "Medium",
                comments: 0,
                dueDate: "Dec 12",
                assignees: [avatars[1], avatars[2], avatars[3]],
            },
            {
                id: "3",
                title: "Design System Updates",
                description: "Update component library with new brand color",
                priority: "Low",
                comments: 1,
                dueDate: "Dec 12",
                assignees: [avatars[0], avatars[2], avatars[3]],
            },
        ],
    },
    {
        id: "progress",
        title: "In Progress",
        variant: "progress",
        tasks: [
            {
                id: "4",
                title: "Chat Screen Prototyping",
                description: "Create Interactive Prototype for Chat screen",
                priority: "High",
                comments: 4,
                dueDate: "Dec 12",
                assignees: [avatars[0], avatars[1], avatars[2]],
                progress: 62,
            },
            {
                id: "5",
                title: "Create Miro interaction",
                description: "Initial layout and structure for mani page",
                priority: "Low",
                comments: 0,
                dueDate: "Dec 12",
                assignees: [avatars[1], avatars[3]],
                progress: 32,
            },
        ],
    },
    {
        id: "review",
        title: "In Review",
        variant: "review",
        tasks: [
            {
                id: "6",
                title: "Mobile Resposivness",
                description: "Create Interactive Prototype for Chat screen",
                priority: "High",
                comments: 1,
                dueDate: "Dec 12",
                assignees: [avatars[0], avatars[1], avatars[2]],

            },
            {
                id: "7",
                title: "Accessibility Audit",
                description: "Initial layout and structure for mani page",
                priority: "Low",
                comments: 3,
                dueDate: "Dec 12",
                assignees: [avatars[2], avatars[3]],

            },
        ],
    },
    {
        id: "done",
        title: "Completed Tasks",
        variant: "done",
        tasks: [
            {
                id: "8",
                title: "Login Screen",
                description: "Create Interactive Prototype for Chat screen",
                priority: "High",
                comments: 5,
                dueDate: "Dec 12",
                assignees: [avatars[0], avatars[1], avatars[2]],
            },
            {
                id: "9",
                title: "Survey",
                description: "Initial layout and structure for mani page",
                priority: "Low",
                comments: 0,
                dueDate: "Dec 12",
                assignees: [avatars[2], avatars[3]],
            },
        ],
    },
];
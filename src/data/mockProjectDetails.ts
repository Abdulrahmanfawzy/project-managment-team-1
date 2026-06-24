import type { ProjectDetails } from "@/types/project";




export const MOCK_DETAILS: Record<string, ProjectDetails> = {
  alpha: {
    id: "alpha",
    name: "Alpha",
    completedPercentage: 42,
    startDate: "Oct 12",
    deadline: "Dec 25",
    description:
      "This project focuses on organizing tasks, tracking progress, and coordinating team efforts to ensure timely delivery and clear visibility across all project activities.",
    projectType: "SaaS",
    priority: "High",
    totalTasks: 140,
    pendingTasks: 62,
    inProgressTasks: 36,
    completedTasks: 42,
    totalTasksCount: 94,
    projectCompletedPercentage: 78,
    team: [
      {
        id: "1",
        name: "Mohanad wahib",
        role: "Leader",
        isOnline: true,
        avatarUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80",
      },
      {
        id: "2",
        name: "Sara Hassan",
        role: "UI/UX",
        isOnline: false,
        avatarUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80",
      },
      {
        id: "3",
        name: "Ali Mohamed",
        role: "UI/UX",
        isOnline: false,
        avatarUrl:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80",
      },
      {
        id: "4",
        name: "Khalid Mousa",
        role: "UI/UX",
        isOnline: false,
        avatarUrl:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80",
      },
    ],
    chartData: [
      { month: "Jan", value: 8000 },
      { month: "Feb", value: 10000 },
      { month: "Mar", value: 7000 },
      { month: "Apr", value: 22000 },
      { month: "May", value: 12000 },
      { month: "Jun", value: 24000 },
    ],
  },
};
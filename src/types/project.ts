export interface TeamMember {
  id: string;
  name: string;
  avatarUrl: string;
  role?: string;
  isOnline?: boolean;
}

export interface Project {
  id: string;
  name: string;
  projectName: string;
  startDate: string;
  deadline: string;
  status: "active" | "done" | "pending" | "in-progress";
  filesCount: number;
  priority: "high" | "medium" | "low";
  iconColor: string;
  team: TeamMember[];
}


export interface ChartDataItem {
  month: string;
  value: number;
}

export interface ProjectDetails {
  id: string;
  name: string;
  completedPercentage: number;
  startDate: string;
  deadline: string;
  description: string;
  projectType: string;
  priority: string;
  totalTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
  completedTasks: number;
  totalTasksCount: number;
  projectCompletedPercentage: number;
  team: TeamMember[];
  chartData: ChartDataItem[];
}
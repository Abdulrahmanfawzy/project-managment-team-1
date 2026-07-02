import type { ProjectDetails } from "@/types/project";
import type { ApiProjectDetails } from "./projectsdetailsTypes";
import type { ApiTask } from "./tasksTypes";

function avatarFor(name: string): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
}

interface TaskStats {
  totalTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
  completedTasks: number;
  totalTasksCount: number;
  projectCompletedPercentage: number;
}

// Computes task-related stats for a single project from the full tasks list.
export function computeTaskStats(
  allTasks: ApiTask[],
  projectId: number,
): TaskStats {
  const projectTasks = allTasks.filter((t) => t.project_id === projectId);

  const pendingTasks = projectTasks.filter((t) => t.status === "pending").length;
  const inProgressTasks = projectTasks.filter((t) => t.status === "in_progress").length;
  const completedTasks = projectTasks.filter((t) => t.status === "completed").length;
  const totalTasks = projectTasks.length;

  const projectCompletedPercentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return {
    totalTasks,
    pendingTasks,
    inProgressTasks,
    completedTasks,
    totalTasksCount: totalTasks,
    projectCompletedPercentage,
  };
}

export function mapApiProjectDetailsToProjectDetails(
  api: ApiProjectDetails,
  taskStats: TaskStats,
): ProjectDetails {
  return {
    id: String(api.id),
    name: api.name,
    completedPercentage: taskStats.projectCompletedPercentage,
    startDate: api.start_date,
    deadline: api.deadline,
    description: api.description,
    // Not provided by the API yet
    projectType: "—",
    priority: api.priority,
    totalTasks: taskStats.totalTasks,
    pendingTasks: taskStats.pendingTasks,
    inProgressTasks: taskStats.inProgressTasks,
    completedTasks: taskStats.completedTasks,
    totalTasksCount: taskStats.totalTasksCount,
    projectCompletedPercentage: taskStats.projectCompletedPercentage,
    team: api.teams.map((t) => ({
      id: String(t.id),
      name: t.display_name ?? t.name,
      avatarUrl: avatarFor(t.display_name ?? t.name),
      role: "",
    })),
    // Not provided by the API yet — empty until backend adds analytics data
    chartData: [],
  };
}
import type { Project } from "@/types/project";
import type { ApiProject } from "./Projectstypes";

// Maps the API's `status` values to the ones our UI expects.
function mapStatus(apiStatus: string): Project["status"] {
  switch (apiStatus) {
    case "pending":
      return "pending";
    case "in_progress":
      return "in-progress";
    case "completed":
      return "done";
    default:
      return "active";
  }
}

export function mapApiProjectToProject(apiProject: ApiProject): Project {
  return {
    id: String(apiProject.id),
    name: apiProject.name,
    projectName: apiProject.name,
    startDate: apiProject.start_date,
    deadline: apiProject.deadline,
    status: mapStatus(apiProject.status),
    filesCount: apiProject.media?.length ?? 0,
    priority: apiProject.priority,
    iconColor: "",
    team: apiProject.teams.map((t) => ({
      id: String(t.id),
      name: t.display_name ?? t.name,
      avatarUrl: "https://ui-avatars.com/api/?name=${encodeURIComponent(t.display_name ?? t.name)}&background=random", // API doesn't provide avatars for teams yet
    })),
  };
}
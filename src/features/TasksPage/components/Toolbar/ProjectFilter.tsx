import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ApiTask } from "../../types/tasks";

interface ProjectSelectProps {
  tasks: ApiTask[];
  value: string;
  onValueChange: (value: string) => void;
}

export function ProjectSelect({ tasks, value, onValueChange }: ProjectSelectProps) {
  // Deduplicate projects by project_id
  const uniqueProjects = Array.from(
    new Map(
      tasks.map((task) => [task.project_id, { id: task.project_id, name: task.project.name }]),
    ).values(),
  );

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full min-w-[10rem] sm:w-44">
        <SelectValue placeholder="All Projects" />
      </SelectTrigger>

      <SelectContent className="max-h-60 overflow-y-auto">
        <SelectItem value="all">All Projects</SelectItem>

        {uniqueProjects.length > 0 ? (
          uniqueProjects.map((project) => (
            <SelectItem key={project.id} value={String(project.id)}>
              project {project.id}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="no-projects" disabled>
            No projects available
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}

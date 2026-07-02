import { useMemo } from "react";
import type { ApiTask } from "../../types/tasks";
import { CreateTaskButton } from "./CreateTaskButton";
import { ProjectSelect } from "./ProjectFilter";
import { SearchInput } from "./SearchInput";
import { TaskFilterSelect } from "./TaskFilterSelect";

interface ToolbarProps {
  tasks: ApiTask[];
  selectedProjectId: string;
  selectedProjectName: string;
  searchQeury: string
  setSelectedProjectId: (value: string) => void;
  setSelectedProjectName: (value: string) => void;
  setSearchQeury: (value: string) => void;
}

export function Toolbar({
  tasks,
  selectedProjectId,
  selectedProjectName,
  searchQeury,
  setSelectedProjectId,
  setSelectedProjectName,
  setSearchQeury
}: ToolbarProps) {
  // Derive unique projects once from the loaded tasks list
  const projects = useMemo(
    () =>
      Array.from(
        new Map(
          tasks.map((t) => [t.project_id, { id: t.project_id, name: t.project.name }]),
        ).values(),
      ),
    [tasks],
  );

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:w-auto">
        <SearchInput
          value={searchQeury}
          onValueChange={setSearchQeury}
        />
        <ProjectSelect
          tasks={tasks}
          value={selectedProjectId}
          onValueChange={setSelectedProjectId}
        />
        <TaskFilterSelect
          tasks={tasks}
          value={selectedProjectName}
          onValueChange={setSelectedProjectName}
        />
      </div>

      <CreateTaskButton projects={projects} />
    </div>
  );
}


import { CreateTaskButton } from "./CreateTaskButton";
import { ProjectSelect } from "./ProjectFilter";
import { SearchInput } from "./SearchInput";
import { TaskFilterSelect } from "./TaskFilterSelect";

export function Toolbar() {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <SearchInput />
        <ProjectSelect />
        <TaskFilterSelect />
      </div>

      <CreateTaskButton />
    </div>
  );
}

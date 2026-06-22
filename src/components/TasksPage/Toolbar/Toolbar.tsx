import { CreateTaskButton } from "./CreateTaskButton";
import { ProjectSelect } from "./ProjectFilter";
import { SearchInput } from "./SearchInput";
import { TaskFilterSelect } from "./TaskFilterSelect";

export function Toolbar() {
    return (
        <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <SearchInput />
                <ProjectSelect />
                <TaskFilterSelect />
            </div>

            <CreateTaskButton />
        </div>
    );
}
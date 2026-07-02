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

export function TaskFilterSelect({ tasks, value, onValueChange }: ProjectSelectProps) {
    const uniqueProjects = Array.from(
        new Map(
            tasks.map((task) => [task.project_id, { id: task.project_id, name: task.project.name }]),
        ).values(),
    );
    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger className="w-full min-w-[10rem] sm:w-40">
                <SelectValue placeholder="My Task" />
            </SelectTrigger>

            <SelectContent className="max-h-60 overflow-y-auto">
                <SelectItem value="all">
                    All Tasks
                </SelectItem>
                {
                    uniqueProjects.length > 0 ?
                        uniqueProjects.map((project) => (
                            <SelectItem value={String(project.id)} key={project.id}>
                                {project.name}
                            </SelectItem>
                        ))
                        : (

                            <SelectItem value="no-projects" disabled>
                                No Tasks available
                            </SelectItem>
                        )

                }

            </SelectContent>
        </Select>
    );
}
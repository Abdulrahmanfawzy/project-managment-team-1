import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddTask, { type ProjectOption } from "../TaskDialog/AddTask";

interface CreateTaskButtonProps {
  projects?: ProjectOption[];
}

export function CreateTaskButton({ projects }: CreateTaskButtonProps) {
  return (
    <AddTask
      projects={projects}
      trigger={
        <Button size="lg" variant="brand" className="rounded-full cursor-pointer">
          Create Task
          <Plus className="ml-2 h-4 w-4" />
        </Button>
      }
    />
  );
}

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddTask from "../Task/AddTask";

export function CreateTaskButton() {
  return (
    <AddTask
      trigger={
        <Button size="lg" variant="brand" className="rounded-full cursor-pointer">
          Create Task
          <Plus className="ml-2 h-4 w-4" />
        </Button>
      }
    />
  );
}

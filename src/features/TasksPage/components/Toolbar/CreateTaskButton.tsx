import AddTaskDialog from "@/components/shared/AddTaskDialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export function CreateTaskButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          variant="brand"
          className="rounded-full cursor-pointer"
        >
          Create Task
          <Plus className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <AddTaskDialog />
    </Dialog>
  );
}

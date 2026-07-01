import AddTaskDialog from "@/components/shared/AddTaskDialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export default function AddTaskButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="w-full rounded-full border-dashed border-brand text-brand hover:bg-brand/5 hover:text-brand cursor-pointer"
        >
          Add Task
          <Plus className="size-4" />
        </Button>
      </DialogTrigger>
      <AddTaskDialog />
    </Dialog>
  );
}

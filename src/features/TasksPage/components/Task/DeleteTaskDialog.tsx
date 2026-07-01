import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useDeleteTask } from "../../hooks/useDeleteTask";
import type { ApiTask } from "../../types/tasks";

export default function DeleteTaskDialog({ task }: { task: ApiTask }) {
  const [open, setOpen] = useState(false);
  const deleteTask = useDeleteTask();

  const handleDelete = () => {
    deleteTask.mutate(task.id, { onSuccess: () => setOpen(false) });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          aria-label="Delete task"
          className="text-muted-foreground hover:text-red-600"
        >
          <Trash2 className="size-3.5" />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>Delete task?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-medium text-foreground">{task.title}</span>?
            This action can&apos;t be undone.
          </DialogDescription>
        </DialogHeader>

        {deleteTask.isError && (
          <p className="text-sm text-red-600">
            {/* @ts-expect-error – axios error shape */}
            {deleteTask.error?.response?.data?.message ?? "Failed to delete task"}
          </p>
        )}

        <DialogFooter className="mt-4 gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={handleDelete}
            disabled={deleteTask.isPending}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {deleteTask.isPending ? "Deleting…" : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

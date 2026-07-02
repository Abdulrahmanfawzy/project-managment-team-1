import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Pencil, FileText, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUpdateTask } from "../../hooks/useUpdateTask";
import type { ApiTask, TaskPriority, TaskStatus } from "../../types/tasks";

type FormValues = {
  title: string;
  start_date: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
};

export default function EditTask({ task }: { task: ApiTask }) {
  const [open, setOpen] = useState(false);
  const updateTask = useUpdateTask();

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      title: task.title,
      start_date: task.start_date?.slice(0, 10) ?? "",
      description: task.description ?? "",
      priority: task.priority,
      status: task.status,
    },
  });

  const onSubmit = (values: FormValues) => {
    updateTask.mutate(
      {
        id: task.id,
        data: {
          project_id: task.project_id,
          title: values.title,
          start_date: values.start_date,
          description: values.description,
          priority: values.priority,
          status: values.status,
          // keep existing assignees (API requires ≥1)
          user_ids: task.assignees.length
            ? task.assignees.map((a) => a.id)
            : [1],
        },
      },
      { onSuccess: () => setOpen(false) },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          aria-label="Edit task"
          className="text-muted-foreground hover:text-foreground"
        >
          <Pencil className="size-3.5" />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl rounded-3xl p-8 border-border-secondary bg-white dark:bg-slate-950">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-xl font-bold text-foreground">
            Edit Task
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Task Name */}
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white dark:bg-slate-950 px-1 text-xs text-muted-foreground font-medium z-10">
              Task Name
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <FileText className="size-4" />
              </span>
              <Input
                required
                placeholder="Task Name"
                {...register("title", { required: true })}
                className="pl-10 h-11 border-slate-200 dark:border-slate-800 bg-transparent rounded-xl focus-visible:ring-1 focus-visible:ring-slate-300"
              />
            </div>
          </div>

          {/* Start Date & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Input
                required
                type="date"
                {...register("start_date", { required: true })}
                className="h-11 pr-10 border-slate-200 dark:border-slate-800 bg-transparent rounded-xl focus-visible:ring-1 focus-visible:ring-slate-300"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            </div>
            <div className="relative">
              <label className="absolute -top-2 left-3 bg-white dark:bg-slate-950 px-1 text-xs text-muted-foreground font-medium z-10">
                Status
              </label>
              <select
                {...register("status")}
                className="h-11 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300"
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="in_review">In Review</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Priority */}
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white dark:bg-slate-950 px-1 text-xs text-muted-foreground font-medium z-10">
              Priority
            </label>
            <select
              {...register("priority")}
              className="h-11 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          {/* Description */}
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white dark:bg-slate-950 px-1 text-xs text-muted-foreground font-medium z-10">
              Description
            </label>
            <textarea
              required
              rows={3}
              placeholder="Task description"
              {...register("description", { required: true })}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300"
            />
          </div>

          {/* API error */}
          {updateTask.isError && (
            <p className="text-sm text-red-600">
              {/* @ts-expect-error – axios error shape */}
              {updateTask.error?.response?.data?.message ??
                "Failed to update task"}
            </p>
          )}

          {/* Submit */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={updateTask.isPending}
              className="w-full h-12 bg-brand hover:bg-brand/90 text-white rounded-xl font-semibold shadow-lg shadow-brand/10 cursor-pointer disabled:opacity-60"
            >
              {updateTask.isPending ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

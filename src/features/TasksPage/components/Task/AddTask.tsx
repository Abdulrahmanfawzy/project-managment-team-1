import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Calendar, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useCreateTask from "../../hooks/useCreateTask";
import type { TaskPriority, TaskStatus } from "../../types/tasks";

type FormValues = {
  title: string;
  start_date: string;
  description?: string;
  priority: TaskPriority;
};

interface AddTaskProps {
  status?: TaskStatus; // which column this button belongs to (default "pending")
  projectId?: number; // override the route param (e.g. from a project picker)
  trigger?: React.ReactNode; // custom trigger; defaults to the dashed "Add Task" button
}

export default function AddTask({
  status = "pending",
  projectId: projectIdProp,
  trigger,
}: AddTaskProps) {
  const [open, setOpen] = useState(false);
  const { projectId: projectIdParam } = useParams();
  const projectId = projectIdProp ?? Number(projectIdParam);
  const createTask = useCreateTask();
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { priority: "medium" },
  });

  const onSubmit = (values: FormValues) => {
    createTask.mutate(
      {
        project_id: projectId,
        name: "hanan", // TODO: replace with logged-in user once sign-in is ready
        title: values.title,
        start_date: values.start_date,
        description: values.description,
        priority: values.priority, // chosen in the form
        status, // taken from the column this button is in
        user_ids: [1], // TODO: API requires ≥1 assignee; wire "Add Guests" field
      },
      {
        onSuccess: () => {
          reset();
          setOpen(false);
        },
        onError: (error) => {
          // Log the exact server response so we can see what's wrong.
          console.error("Create task failed:", error);
          // @ts-expect-error – axios error shape
          console.error("Server said:", error?.response?.data);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button
            variant="outline"
            size="lg"
            className="w-full rounded-full border-dashed border-brand text-brand hover:bg-brand/5 hover:text-brand cursor-pointer"
          >
            Add Task
            <Plus className="size-4" />
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl rounded-3xl p-8 border-border-secondary bg-white dark:bg-slate-950">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-xl font-bold text-foreground">
            Create Task
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

          {/* Start Date & End Date */}
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
              <Input
                placeholder="End Date"
                className="h-11 pr-10 border-slate-200 dark:border-slate-800 bg-transparent rounded-xl focus-visible:ring-1 focus-visible:ring-slate-300"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
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

          {/* Add Guests */}
          <div className="space-y-2">
            <div className="relative">
              <label className="absolute -top-2 left-3 bg-white dark:bg-slate-950 px-1 text-xs text-muted-foreground font-medium z-10">
                Add Guests
              </label>
              <div className="relative flex items-center pr-1 border border-slate-200 dark:border-slate-800 rounded-xl h-11 focus-within:ring-1 focus-within:ring-slate-300">
                <Input
                  placeholder="@Anas Mohamed"
                  className="border-0 focus-visible:ring-0 shadow-none h-full bg-transparent"
                />
                <Button
                  type="button"
                  size="sm"
                  className="bg-[#18181B] dark:bg-slate-800 hover:bg-black dark:hover:bg-slate-700 text-white rounded-lg px-4 h-8 shrink-0 cursor-pointer font-medium text-xs"
                >
                  Add +
                </Button>
              </div>
            </div>
          </div>

          {/* Add Task Files */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider pl-1">
              Add Task Files
            </span>
            <div className="border border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center gap-2 bg-slate-50/20 dark:bg-slate-900/10 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
              <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Upload className="size-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Drag and drop files or click to upload
              </p>
            </div>
          </div>

          {/* API error */}
          {createTask.isError && (
            <p className="text-sm text-red-600">
              {/* @ts-expect-error – axios error shape */}
              {createTask.error?.response?.data?.message ??
                "Failed to create task"}
            </p>
          )}

          {/* Create Task Submit */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={createTask.isPending}
              className="w-full h-12 bg-brand hover:bg-brand/90 text-white rounded-xl font-semibold shadow-lg shadow-brand/10 cursor-pointer disabled:opacity-60"
            >
              {createTask.isPending ? "Creating…" : "Create Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

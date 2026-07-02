import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Calendar, Users, FolderKanban, Upload } from "lucide-react";
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
  status: TaskStatus;
  project_id: number;
  user_ids: string; // comma-separated IDs entered by user
};

export interface ProjectOption {
  id: number;
  name: string;
}

interface AddTaskProps {
  status?: TaskStatus; // pre-select status (e.g. from a column button)
  projectId?: number; // pre-select project (e.g. from the project details page)
  projects?: ProjectOption[]; // list to populate the project dropdown
  trigger?: React.ReactNode; // custom trigger element
}

export default function AddTask({
  status = "pending",
  projectId: projectIdProp,
  projects = [],
  trigger,
}: AddTaskProps) {
  const [open, setOpen] = useState(false);
  const { projectId: projectIdParam } = useParams();

  // Resolve the default project_id: prop > route param > 0 (user must pick)
  const defaultProjectId =
    projectIdProp ?? (projectIdParam ? Number(projectIdParam) : 0);

  const createTask = useCreateTask();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      priority: "medium",
      status,
      project_id: defaultProjectId > 0 ? defaultProjectId : (0 as unknown as number),
    },
  });

  const onSubmit = (values: FormValues) => {
    // Parse comma-separated user IDs into a number array
    const userIds = values.user_ids
      ? values.user_ids
        .split(",")
        .map((s) => Number(s.trim()))
        .filter((n) => !isNaN(n) && n > 0)
      : [1]; // fallback to user ID 1 if nothing entered

    createTask.mutate(
      {
        project_id: Number(values.project_id), // always sent as Number
        title: values.title,
        name: values.title, // API requires "name" field (mirrors title)
        start_date: values.start_date,
        description: values.description,
        priority: values.priority,
        status: values.status,
        user_ids: userIds,
      },
      {
        onSuccess: () => {
          reset();
          setOpen(false);
        },
        onError: (error) => {
          console.error("Create task failed:", error);
          // @ts-expect-error axios error shape
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Task Name */}
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white dark:bg-slate-950 px-1 text-xs text-muted-foreground font-medium z-10">
              Task Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <FileText className="size-4" />
              </span>
              <Input
                placeholder="Task Name"
                {...register("title", { required: "Task name is required" })}
                className="pl-10 h-11 border-slate-200 dark:border-slate-800 bg-transparent rounded-xl focus-visible:ring-1 focus-visible:ring-slate-300"
              />
            </div>
            {errors.title && (
              <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Project + Status row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Project picker — sends project_id as Number */}
            <div className="relative">
              <label className="absolute -top-2 left-3 bg-white dark:bg-slate-950 px-1 text-xs text-muted-foreground font-medium z-10">
                Project <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                  <FolderKanban className="size-4" />
                </span>
                <Controller
                  name="project_id"
                  control={control}
                  rules={{
                    required: "Project is required",
                    validate: (v) => Number(v) > 0 || "Select a project",
                  }}
                  render={({ field }) => (
                    <select
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="h-11 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent pl-10 pr-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 appearance-none"
                    >
                      <option value={0} disabled>
                        Select project…
                      </option>
                      {projects.map((p) => (
                        <option key={p.id} value={p.id}>
                          project {p.id}
                        </option>
                      ))}
                      {/* Fallback when no projects list is passed (e.g. project details page) */}
                      {projects.length === 0 && defaultProjectId > 0 && (
                        <option value={defaultProjectId}>
                          Project #{defaultProjectId}
                        </option>
                      )}
                    </select>
                  )}
                />
              </div>
              {errors.project_id && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.project_id.message}
                </p>
              )}
            </div>

            {/* Status */}
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

          {/* Start Date + Priority row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Start Date */}
            <div className="relative">
              <label className="absolute -top-2 left-3 bg-white dark:bg-slate-950 px-1 text-xs text-muted-foreground font-medium z-10">
                Start Date <span className="text-red-500">*</span>
              </label>
              <Input
                required
                type="date"
                {...register("start_date", { required: true })}
                className="h-11 pr-10 border-slate-200 dark:border-slate-800 bg-transparent rounded-xl focus-visible:ring-1 focus-visible:ring-slate-300"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
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
          </div>

          {/* Description */}
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white dark:bg-slate-950 px-1 text-xs text-muted-foreground font-medium z-10">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Task description (optional)"
              {...register("description")}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300"
            />
          </div>

          {/* Assignee IDs */}
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white dark:bg-slate-950 px-1 text-xs text-muted-foreground font-medium z-10">
              Assignee IDs
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Users className="size-4" />
              </span>
              <Input
                placeholder="e.g. 1, 2, 3  (comma-separated user IDs)"
                {...register("user_ids")}
                className="pl-10 h-11 border-slate-200 dark:border-slate-800 bg-transparent rounded-xl focus-visible:ring-1 focus-visible:ring-slate-300"
              />
            </div>
            <p className="mt-1 text-xs text-muted-foreground pl-1">
              Leave blank to assign to user #1
            </p>
          </div>

          {/* Add Task Files */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-1">
              Add Task Files
            </span>
            <div className="border border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center gap-2 bg-slate-50/20 dark:bg-slate-900/10 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
              <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Upload className="size-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Drag and drop files or click to upload
              </p>
            </div>
          </div>

          {/* API error banner */}
          {createTask.isError && (
            <p className="text-sm text-red-600 rounded-lg bg-red-50 px-3 py-2">
              {/* @ts-expect-error axios error shape */}
              {createTask.error?.response?.data?.message ?? "Failed to create task"}
            </p>
          )}

          {/* Submit */}
          <div className="pt-1">
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

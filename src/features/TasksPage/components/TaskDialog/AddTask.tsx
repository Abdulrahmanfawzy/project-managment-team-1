import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Calendar, FolderKanban, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import MultiSelectDropdown, {
  type MultiOption,
} from "@/components/shared/MultiSelectDropdown";
import { useTeams } from "@/features/Dashboard/hooks/UseTeams";
import type { TeamWithMembers } from "@/features/meetings/Types/meeting.types";
import useCreateTask from "../../hooks/useCreateTask";
import type { TaskPriority, TaskStatus } from "../../types/tasks";

type FormValues = {
  title: string;
  start_date: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  project_id: number;
  user_ids: string[]; // selected assignee user IDs
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

  // Assignee options = the members across all teams (deduped by user id).
  const { data: teamsResp } = useTeams();
  const memberOptions: MultiOption[] = (() => {
    const teams: TeamWithMembers[] =
      (teamsResp as { data?: TeamWithMembers[] })?.data ?? [];
    const byId = new Map<number, MultiOption>();
    for (const team of teams) {
      for (const m of team.members) {
        if (!byId.has(m.id)) {
          byId.set(m.id, {
            value: String(m.id),
            label: m.name,
            sublabel: m.email,
            avatarUrl: m.avatar_url,
          });
        }
      }
    }
    return [...byId.values()];
  })();

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
      user_ids: [],
    },
  });

  // ── File upload state ─────────────────────────────────────────────────────
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
      setUploadError(null);
    }
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    // Selected assignee IDs → numbers; fall back to user #1 if none picked
    // (the API requires at least one assignee).
    const userIds =
      values.user_ids.length > 0 ? values.user_ids.map(Number) : [1];

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
        onSuccess: async (response) => {
          // Laravel wraps the created resource in a `{ data: { … } }` envelope.
          // apiClient.post already unwraps the axios layer (res.data), so
          // `response` here is `{ data: ApiTask }`.
          const createdTask = (response as unknown as { data: { id: number } }).data ?? response;

          // Upload attached files (if any) after the task is created.
          if (selectedFiles.length > 0) {
            try {
              const { uploadTaskFiles } = await import("../../api/tasks.api");
              const baseUrl = import.meta.env.VITE_API_URL as string;
              await uploadTaskFiles(baseUrl, createdTask.id, selectedFiles);
            } catch (err) {
              console.error("File upload failed:", err);
              setUploadError("Task created, but file upload failed. Please try again.");
              // Do not close the dialog — let the user see the error.
              setIsSubmitting(false);
              return;
            }
          }

          reset();
          setSelectedFiles([]);
          setUploadError(null);
          setIsSubmitting(false);
          setOpen(false);
        },
        onError: (error) => {
          console.error("Create task failed:", error);
          // @ts-expect-error axios error shape
          console.error("Server said:", error?.response?.data);
          setIsSubmitting(false);
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

          {/* Assignees */}
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white dark:bg-slate-950 px-1 text-xs text-muted-foreground font-medium z-10">
              Assignees
            </label>
            <Controller
              name="user_ids"
              control={control}
              render={({ field }) => (
                <MultiSelectDropdown
                  options={memberOptions}
                  selected={field.value}
                  onChange={field.onChange}
                  placeholder="Select assignees"
                  emptyText="No team members found"
                />
              )}
            />
            <p className="mt-1 text-xs text-muted-foreground pl-1">
              Leave empty to assign to user #1
            </p>
          </div>

          {/* ── Add Task Files ──────────────────────────────────────────── */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-1">
              Add Task Files
            </span>

            {/* Hidden native file input */}
            <input
              id="task-file-upload"
              type="file"
              multiple
              className="sr-only"
              onChange={handleFileChange}
            />

            {/* Drop-zone / click target */}
            <label
              htmlFor="task-file-upload"
              className="border border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center gap-2 bg-slate-50/20 dark:bg-slate-900/10 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors"
            >
              <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Upload className="size-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground text-center">
                {selectedFiles.length > 0
                  ? `${selectedFiles.length} file${selectedFiles.length > 1 ? "s" : ""} selected — click to change`
                  : "Drag and drop files or click to upload"}
              </p>
            </label>

            {/* Selected file pills */}
            {selectedFiles.length > 0 && (
              <ul className="flex flex-wrap gap-1.5 pt-1">
                {selectedFiles.map((file) => (
                  <li
                    key={file.name}
                    className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-0.5 text-[11px] font-medium text-brand"
                  >
                    <FileText className="size-3 shrink-0" />
                    <span className="max-w-[140px] truncate">{file.name}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Upload error (only shown when task creation succeeded but upload failed) */}
            {uploadError && (
              <p className="text-sm text-amber-600 rounded-lg bg-amber-50 px-3 py-2">
                {uploadError}
              </p>
            )}
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
              disabled={isSubmitting}
              className="w-full h-12 bg-brand hover:bg-brand/90 text-white rounded-xl font-semibold shadow-lg shadow-brand/10 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? "Creating…" : "Create Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

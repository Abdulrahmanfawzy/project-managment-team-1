import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Plus, Users, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreateTeamForProject } from "../hooks/useCreateTeamForProject";

type FormValues = {
  name: string;
  user_ids: string; // comma-separated IDs entered by the user
};

export default function CreateTeam() {
  const [open, setOpen] = useState(false);
  const { projectId } = useParams();
  const createTeam = useCreateTeamForProject();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { name: "", user_ids: "" },
  });

  const onSubmit = (values: FormValues) => {
    // Parse comma-separated member IDs → number[] (mirrors the AddTask form).
    const userIds = values.user_ids
      ? values.user_ids
          .split(",")
          .map((s) => Number(s.trim()))
          .filter((n) => !isNaN(n) && n > 0)
      : [];

    createTeam.mutate(
      { projectId: Number(projectId), name: values.name, userIds },
      {
        onSuccess: () => {
          reset();
          setOpen(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="brand" size="lg">
          Create Team
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl rounded-3xl p-8 border-border-secondary bg-white dark:bg-slate-950">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-xl font-bold text-foreground">
            Create Team
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Team Name */}
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white dark:bg-slate-950 px-1 text-xs text-muted-foreground font-medium z-10">
              Team Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <FileText className="size-4" />
              </span>
              <Input
                placeholder="e.g. Frontend Team"
                {...register("name", { required: "Team name is required" })}
                className="pl-10 h-11 border-slate-200 dark:border-slate-800 bg-transparent rounded-xl focus-visible:ring-1 focus-visible:ring-slate-300"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Member IDs */}
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white dark:bg-slate-950 px-1 text-xs text-muted-foreground font-medium z-10">
              Member IDs
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
              Leave blank to create the team without members.
            </p>
          </div>

          {/* API error banner */}
          {createTeam.isError && (
            <p className="text-sm text-red-600 rounded-lg bg-red-50 px-3 py-2">
              {/* @ts-expect-error – axios error shape */}
              {createTeam.error?.response?.data?.message ??
                "Failed to create team"}
            </p>
          )}

          {/* Submit */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={createTeam.isPending}
              className="w-full h-12 bg-brand hover:bg-brand/90 text-white rounded-xl font-semibold shadow-lg shadow-brand/10 cursor-pointer disabled:opacity-60"
            >
              {createTeam.isPending ? "Creating…" : "Create Team"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

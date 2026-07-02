import { useState } from "react";
import { useForm } from "react-hook-form";
import { UserPlus, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAddTeamMembers } from "../hooks/useAddTeamMembers";
import type { ProjectTeam } from "../types/teams";

type FormValues = { user_ids: string };

export default function AddTeamMembers({ team }: { team: ProjectTeam }) {
  const [open, setOpen] = useState(false);
  const addMembers = useAddTeamMembers();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { user_ids: "" } });

  const onSubmit = (values: FormValues) => {
    const userIds = values.user_ids
      .split(",")
      .map((s) => Number(s.trim()))
      .filter((n) => !isNaN(n) && n > 0);

    if (userIds.length === 0) return;

    addMembers.mutate(
      { teamId: team.id, userIds },
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
        <Button
          variant="outline"
          size="sm"
          className="w-full rounded-full border-dashed border-brand text-brand hover:bg-brand/5 hover:text-brand cursor-pointer"
        >
          Add Member
          <UserPlus className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-3xl p-8 border-border-secondary bg-white dark:bg-slate-950">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-xl font-bold text-foreground">
            Add members to {team.display_name ?? team.name}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white dark:bg-slate-950 px-1 text-xs text-muted-foreground font-medium z-10">
              Member IDs <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Users className="size-4" />
              </span>
              <Input
                placeholder="e.g. 1, 2, 3  (comma-separated user IDs)"
                {...register("user_ids", {
                  required: "Enter at least one user ID",
                })}
                className="pl-10 h-11 border-slate-200 dark:border-slate-800 bg-transparent rounded-xl focus-visible:ring-1 focus-visible:ring-slate-300"
              />
            </div>
            {errors.user_ids && (
              <p className="mt-1 text-xs text-red-500">
                {errors.user_ids.message}
              </p>
            )}
          </div>

          {addMembers.isError && (
            <p className="text-sm text-red-600 rounded-lg bg-red-50 px-3 py-2">
              {/* @ts-expect-error – axios error shape */}
              {addMembers.error?.response?.data?.message ??
                "Failed to add members"}
            </p>
          )}

          <Button
            type="submit"
            disabled={addMembers.isPending}
            className="w-full h-12 bg-brand hover:bg-brand/90 text-white rounded-xl font-semibold shadow-lg shadow-brand/10 cursor-pointer disabled:opacity-60"
          >
            {addMembers.isPending ? "Adding…" : "Add Members"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

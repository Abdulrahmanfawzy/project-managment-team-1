import React, { useState } from "react";
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

export default function AddTaskButton() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

      <DialogContent className="sm:max-w-2xl rounded-3xl p-8 border-border-secondary bg-white dark:bg-slate-950">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-xl font-bold text-foreground">
            Create Task
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                className="pl-10 h-11 border-slate-200 dark:border-slate-800 bg-transparent rounded-xl focus-visible:ring-1 focus-visible:ring-slate-300"
              />
            </div>
          </div>

          {/* Start Date & End Date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Input
                placeholder="Start Date"
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

            {/* Overlapping Guest Avatars */}
            <div className="flex -space-x-1.5 pt-1 pl-1">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="Guest"
                className="size-7 rounded-full ring-2 ring-white dark:ring-slate-950 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                alt="Guest"
                className="size-7 rounded-full ring-2 ring-white dark:ring-slate-950 object-cover"
              />
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

          {/* Create Task Submit */}
          <div className="pt-2">
            <Button
              type="submit"
              className="w-full h-12 bg-brand hover:bg-brand/90 text-white rounded-xl font-semibold shadow-lg shadow-brand/10 cursor-pointer"
            >
              Create Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
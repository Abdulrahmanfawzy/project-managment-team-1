import { useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Plus, FileText, Upload } from "lucide-react";

import useUploadFile from "../hooks/useUploadFile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type FormValues = {
  name: string;
  file: File | null;
};

export default function UploadFile() {
  const [open, setOpen] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const { projectId } = useParams();
  const uploadFile = useUploadFile();

  const { register, handleSubmit, setValue, reset } = useForm<FormValues>({
    defaultValues: { name: "", file: null },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setValue("file", file);
    setSelectedFileName(file?.name ?? null);
  };

  const onSubmit = (values: FormValues) => {
    if (!values.file) return; // no file chosen yet

    uploadFile.mutate(
      {
        projectId: Number(projectId),
        data: { name: values.name, file: values.file },
      },
      {
        onSuccess: () => {
          reset();
          setSelectedFileName(null);
          setOpen(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="brand" size="lg">
          Upload File
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl rounded-3xl p-8 border-border-secondary bg-white dark:bg-slate-950">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-xl font-bold text-foreground">
            Upload File
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* File Name */}
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white dark:bg-slate-950 px-1 text-xs text-muted-foreground font-medium z-10">
              File Name
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <FileText className="size-4" />
              </span>
              <Input
                required
                placeholder="File Name"
                {...register("name", { required: true })}
                className="pl-10 h-11 border-slate-200 dark:border-slate-800 bg-transparent rounded-xl focus-visible:ring-1 focus-visible:ring-slate-300"
              />
            </div>
          </div>

          {/* File upload area */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider pl-1">
              File
            </span>
            <label className="border border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center gap-2 bg-slate-50/20 dark:bg-slate-900/10 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Upload className="size-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground text-center">
                {selectedFileName ?? "Drag and drop files or click to upload"}
              </p>
            </label>
          </div>

          {/* API error */}
          {uploadFile.isError && (
            <p className="text-sm text-red-600">
              {/* @ts-expect-error – axios error shape */}
              {uploadFile.error?.response?.data?.message ??
                "Failed to upload file"}
            </p>
          )}

          {/* Submit */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={uploadFile.isPending}
              className="w-full h-12 bg-brand hover:bg-brand/90 text-white rounded-xl font-semibold shadow-lg shadow-brand/10 cursor-pointer disabled:opacity-60"
            >
              {uploadFile.isPending ? "Uploading…" : "Upload File"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

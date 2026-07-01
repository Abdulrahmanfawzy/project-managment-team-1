import { Download, FileText } from "lucide-react";

import { cn } from "@/lib/utils";
import { downloadFile } from "@/lib/downloadFile";
import type { FileItem, FileType } from "./data/data";

const fileTypeMeta: Record<FileType, { label: string; wrap: string }> = {
  pdf: { label: "PDF", wrap: "bg-red-50 text-red-500" },
  doc: { label: "DOC", wrap: "bg-blue-50 text-blue-500" },
  xls: { label: "XLS", wrap: "bg-green-50 text-green-600" },
  img: { label: "IMG", wrap: "bg-amber-50 text-amber-500" },
};

export default function FileCard({ file }: { file: FileItem }) {
  const meta = fileTypeMeta[file.type];
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
      <div
        className={cn(
          "relative flex size-11 shrink-0 items-center justify-center rounded-xl",
          meta.wrap,
        )}
      >
        <FileText className="size-5" />
        <span className="absolute -bottom-1 rounded px-1 text-[9px] font-bold leading-tight">
          {meta.label}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="truncate font-semibold text-text-h">{file.name}</h4>
        <p className="truncate text-xs text-muted-foreground">
          By {file.author}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {file.size} • {file.uploadedAt}
        </p>
      </div>

      <button
        type="button"
        onClick={() => downloadFile(file.url, file.downloadName)}
        aria-label={`Download ${file.name}`}
        className="shrink-0 rounded-lg p-1.5 text-text-h transition-colors hover:bg-slate-100"
      >
        <Download className="size-5" />
      </button>
    </div>
  );
}

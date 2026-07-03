import { Download, FileText, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProfileFiles } from "./hooks/useProfileFiles";
import type { ProfileFile } from "./api/profile.api";

/** Format bytes into a human-readable string. */
function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Return a relative-time label from an ISO date string. */
function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

// Type badge label + colours, matching the project/dashboard file cards.
const fileTypeMeta: Record<string, { label: string; wrap: string }> = {
  pdf: { label: "PDF", wrap: "bg-red-50 text-red-500" },
  doc: { label: "DOC", wrap: "bg-blue-50 text-blue-500" },
  xls: { label: "XLS", wrap: "bg-green-50 text-green-600" },
  ppt: { label: "PPT", wrap: "bg-orange-50 text-orange-500" },
  zip: { label: "ZIP", wrap: "bg-purple-50 text-purple-500" },
  img: { label: "IMG", wrap: "bg-amber-50 text-amber-500" },
  file: { label: "FILE", wrap: "bg-slate-100 text-slate-500" },
};

/** Pick a badge kind from the file's mime type, falling back to its extension. */
function getFileMeta(file: ProfileFile) {
  const mime = (file.mime_type ?? "").toLowerCase();
  const ext = (file.name.split(".").pop() ?? "").toLowerCase();
  const is = (m: string, ...exts: string[]) =>
    mime.includes(m) || exts.includes(ext);

  if (mime.startsWith("image/") || ["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(ext))
    return fileTypeMeta.img;
  if (is("pdf", "pdf")) return fileTypeMeta.pdf;
  if (is("word", "doc", "docx")) return fileTypeMeta.doc;
  if (is("sheet", "excel", "csv", "xls", "xlsx")) return fileTypeMeta.xls;
  if (is("presentation", "powerpoint", "ppt", "pptx")) return fileTypeMeta.ppt;
  if (is("zip", "rar", "7z", "gz", "tar")) return fileTypeMeta.zip;
  return fileTypeMeta.file;
}

export default function FilesTab() {
  const { data: rawData, isLoading, isError } = useProfileFiles();

  // Normalise: the response might be `{ data: [...] }` (Laravel resource) or a plain array.
  const files: ProfileFile[] = Array.isArray(rawData)
    ? rawData
    : (rawData as { data: ProfileFile[] } | undefined)?.data ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-brand" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-20 text-sm text-red-500">
        Failed to load files. Please try again later.
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 text-sm text-slate-400">
        No files found.
      </div>
    );
  }

  return (
    <div className="py-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.map((file) => {
          const meta = getFileMeta(file);
          return (
            <div
              key={file.id}
              className="flex items-center justify-between gap-3 p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 group"
            >
              {/* Left section: icon and details */}
              <div className="flex items-center gap-3 min-w-0">
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
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span
                    className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors duration-200 truncate"
                    title={file.name}
                  >
                    {file.name}
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">
                    {formatSize(file.size)} • {timeAgo(file.created_at)}
                  </span>
                </div>
              </div>

              {/* Right section: Download action */}
              <a
                href={file.path}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="shrink-0 p-2 hover:bg-slate-50 active:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors duration-200"
                aria-label={`Download ${file.name}`}
              >
                <Download size={18} />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

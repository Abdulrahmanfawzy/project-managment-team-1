import { Download, Loader2 } from "lucide-react";
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

// Custom PDF document icon with a folded corner and PDF label
const PdfIcon = () => (
  <svg
    className="w-10 h-12 shrink-0 transition-transform duration-300 group-hover:scale-105"
    viewBox="0 0 40 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Main Red Page Body */}
    <path
      d="M0 4C0 1.79086 1.79086 0 4 0H28L40 12V44C40 46.2091 38.2091 48 36 48H4C1.79086 48 0 46.2091 0 44V4Z"
      fill="#EF4444"
    />
    {/* Folded Corner flap */}
    <path
      d="M28 0V8C28 10.2091 29.7909 12 32 12H40L28 0Z"
      fill="#F87171"
    />
    {/* PDF text label */}
    <text
      x="7"
      y="34"
      fill="white"
      fontSize="9"
      fontWeight="900"
      fontFamily="Inter, sans-serif"
    >
      PDF
    </text>
  </svg>
);

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
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 group cursor-pointer"
          >
            {/* Left section: Icon and details */}
            <div className="flex items-center gap-4">
              <PdfIcon />
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors duration-200">
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
              className="p-2 hover:bg-slate-50 active:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors duration-200"
              aria-label="Download file"
            >
              <Download size={18} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

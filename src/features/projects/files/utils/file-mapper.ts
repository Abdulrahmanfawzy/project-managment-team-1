import type { FileItem, FileType } from "../data/data";
import type { FileResponse } from "../types/files";

// The public origin of the API, derived from VITE_API_URL
// (e.g. "https://collabspace-team-one.newcinderella.online").
const API_ORIGIN = new URL(import.meta.env.VITE_API_URL).origin;

// The backend currently returns file URLs with "http://localhost" (its own
// APP_URL). Rewrite that host to the public origin so downloads work.
// TODO: remove once the backend sets APP_URL to the public domain.
function fixFileUrl(url: string): string {
  return url.replace(/^https?:\/\/localhost(:\d+)?/, API_ORIGIN);
}

// API extension / category → the card's FileType badge.
function toFileType(file: FileResponse): FileType {
  const ext = file.extension?.toLowerCase() ?? "";
  if (ext === "pdf") return "pdf";
  if (["doc", "docx"].includes(ext)) return "doc";
  if (["xls", "xlsx", "csv"].includes(ext)) return "xls";
  if (["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(ext)) return "img";
  if (file.file_type === "image") return "img";
  return "doc"; // sensible default
}

// bytes → human readable, e.g. 11513 → "11.2 KB"
function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

// "2026-07-01 14:18:55" → "Jul 1, 2026"
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Convert one API file into the shape FileCard expects.
export function mapFileResponse(file: FileResponse): FileItem {
  return {
    id: String(file.id),
    name: file.name,
    author: file.uploader.name,
    size: formatSize(file.size),
    uploadedAt: formatDate(file.created_at),
    type: toFileType(file),
    url: fixFileUrl(file.url),
    downloadName: file.original_name,
  };
}

// The `count` files with the newest upload date (newest first).
export function getRecentFiles(
  files: FileResponse[],
  count = 3,
): FileResponse[] {
  return [...files]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, count);
}

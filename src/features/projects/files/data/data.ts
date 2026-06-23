export type FileType = "pdf" | "doc" | "xls" | "img";

export type FileItem = {
  id: string;
  name: string;
  author: string;
  size: string; // pre-formatted, e.g. "6.4 MB"
  uploadedAt: string; // pre-formatted, e.g. "1h ago"
  type: FileType;
};

const mock = (id: number, type: FileType = "pdf"): FileItem => ({
  id: String(id),
  name: "Design mockups",
  author: "Ahmed Hassan",
  size: "6.4 MB",
  uploadedAt: "1h ago",
  type,
});

export const recentFiles: FileItem[] = [mock(1), mock(2), mock(3)];

export const allFiles: FileItem[] = Array.from({ length: 9 }, (_, i) =>
  mock(i + 1),
);

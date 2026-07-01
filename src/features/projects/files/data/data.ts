export type FileType = "pdf" | "doc" | "xls" | "img";

export type FileItem = {
  id: string;
  name: string;
  author: string;
  size: string; // pre-formatted, e.g. "6.4 MB"
  uploadedAt: string; // pre-formatted, e.g. "1h ago"
  type: FileType;
  url: string; // download/open link
  downloadName: string; // original filename incl. extension
};

import FileCard from "@/features/projects/files/FileCard";
import UploadFile from "@/features/projects/files/components/UploadFile";
import type { FileItem } from "@/features/projects/files/data/data";

// Placeholder data — replace with the API response once the endpoint is wired up.
const placeholderFile: FileItem = {
  id: "0",
  name: "Design mockups",
  author: "Ahmed Hassan",
  size: "6.4 MB",
  uploadedAt: "1h ago",
  type: "pdf",
  url: "#",
  downloadName: "design-mockups.pdf",
};

const recentFiles: FileItem[] = Array.from({ length: 3 }, (_, i) => ({
  ...placeholderFile,
  id: `recent-${i}`,
}));

const allFiles: FileItem[] = Array.from({ length: 9 }, (_, i) => ({
  ...placeholderFile,
  id: `all-${i}`,
}));

export default function AllFilesSection() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-h">Recent Files</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {recentFiles.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text-h">All Files</h2>
          <UploadFile />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {allFiles.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>
      </section>
    </div>
  );
}

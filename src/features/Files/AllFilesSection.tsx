import FileCard from "@/features/projects/files/FileCard";
import FileCardSkeleton from "@/features/projects/files/FileCardSkeleton";
import UploadFile from "@/features/projects/files/components/UploadFile";
import {
  mapFileResponse,
  getRecentFiles,
} from "@/features/projects/files/utils/file-mapper";
import { useFiles } from "./Hooks/UseFiles";

const gridClass = "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3";

function SkeletonGrid({ count }: { count: number }) {
  return (
    <div className={gridClass}>
      {Array.from({ length: count }).map((_, i) => (
        <FileCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default function AllFilesSection() {
  const { data, isPending, isError } = useFiles();

  if (isPending) {
    return (
      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-text-h">Recent Files</h2>
          <SkeletonGrid count={3} />
        </section>
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-text-h">All Files</h2>
          <SkeletonGrid count={6} />
        </section>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="p-4 text-sm text-red-600">
        Failed to load files. Please try again.
      </p>
    );
  }

  const files = data.data;
  const recentFiles = getRecentFiles(files, 3).map(mapFileResponse);
  const allFiles = files.map(mapFileResponse);

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-h">Recent Files</h2>
        {recentFiles.length === 0 ? (
          <p className="text-sm text-muted-foreground">No files yet.</p>
        ) : (
          <div className={gridClass}>
            {recentFiles.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text-h">All Files</h2>
          <UploadFile />
        </div>

        {allFiles.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No files yet. Upload one to get started.
          </p>
        ) : (
          <div className={gridClass}>
            {allFiles.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

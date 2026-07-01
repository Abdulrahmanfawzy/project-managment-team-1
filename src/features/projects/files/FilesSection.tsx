import { useParams } from "react-router-dom";
import FileCard from "./FileCard";
import UploadFile from "./components/UploadFile";
import { useProjectFiles } from "./hooks/useProjectFiles";
import { mapFileResponse, getRecentFiles } from "./utils/file-mapper";

const FilesSection = () => {
  const { projectId } = useParams();
  const { data: files, isLoading, isError } = useProjectFiles(Number(projectId));

  const recentFiles = getRecentFiles(files?.data ?? []);

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-h">Recent Files</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {recentFiles.map((file) => (
            <FileCard key={file.id} file={mapFileResponse(file)} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text-h">All Files</h2>
          <UploadFile />
        </div>

        {isLoading && (
          <p className="text-sm text-muted-foreground">Loading files…</p>
        )}
        {isError && <p className="text-sm text-red-600">Failed to load files.</p>}
        {files && files.data.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No files yet. Upload one to get started.
          </p>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {files?.data.map((file) => (
            <FileCard key={file.id} file={mapFileResponse(file)} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default FilesSection;

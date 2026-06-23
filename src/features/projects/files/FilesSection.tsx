import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import FileCard from "./FileCard";
import { allFiles, recentFiles } from "./data/data";

const FilesSection = () => {
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
          <Button variant="brand" size="lg">
            Upload File
            <Plus />
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {allFiles.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default FilesSection;

import { Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useDashboardRecents } from "@/features/Dashboard/hooks/UseRecents";
import Spinner from "@/components/shared/Spinner";

export default function DashboardFiles() {
  const { data, isPending, error } = useDashboardRecents();

  if (isPending) {
    return <Spinner />;
  }

  if (error) {
    return <p>Something went wrong.</p>;
  }

  return (
    <div className="lg:col-span-3 space-y-4 rounded-lg h-auto lg:max-h-80 bg-white py-5 px-3 shadow-sm  overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-black">Recent files</h2>
        <Link to="/files" className="text-blue-500 text-sm">
          See All
        </Link>
      </div>

      {data?.data?.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No recent files found.</p>
      ) : (
        data?.data?.map((file: any) => (
          <div
            key={file.id}
            className="flex justify-between items-center space-x-2 border-b border-gray-100 pb-2"
          >
            <img
              src={file.avatar_url}
              className="w-8 h-8 shrink-0"
              alt={file.name}
            />

            <div className="text-xs flex-1 min-w-0">
              <h2 className="truncate font-medium">{file.name}</h2>
              <p className="text-gray-400">
                By {file.uploaded_by} • {file.created_at}
              </p>
            </div>

            <Download className="w-4 h-4 text-gray-500 shrink-0 cursor-pointer" />
          </div>
        ))
      )}
    </div>
  );
}

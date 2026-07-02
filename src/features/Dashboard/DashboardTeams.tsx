import { ArrowDown } from "lucide-react";
import avatar from "@/assets/Avatar.svg";
import { useTeams } from "@/features/Dashboard/hooks/UseTeams";
import Spinner from "@/components/shared/Spinner";

export default function DashboardProgresses() {
  const { data, isPending, error } = useTeams();

  if (isPending) {
    return <Spinner />;
  }

  if (error) {
    return <p>Something went wrong.</p>;
  }

  return (
    <div className="lg:col-span-3 space-y-4 bg-white rounded-lg p-5 shadow-sm">
      <div className="flex space-x-3 items-center">
        <h2 className="text-black font-bold">Teams</h2>
        <h2 className="flex items-center text-sm text-gray-600 bg-gray-50 px-2 py-0.5 rounded">
          All Teams
          <ArrowDown className="w-4 h-4 ml-1" />
        </h2>
      </div>

      <div className="flex justify-between text-xs font-semibold text-gray-400 pb-1">
        <h2>Name</h2>
        <h2>Projects</h2>
      </div>

      <div className="space-y-3 overflow-y-auto max-h-56 pr-1">
        {data?.data.map((item: any) => (
          <div
            key={item.id}
            className="flex justify-between items-center space-x-2"
          >
            <img
              src={avatar}
              className="w-7 h-7 rounded-full shrink-0"
              alt="avatar"
            />

            <div className="flex-1">
              <h2 className="text-xs font-medium">{item.name}</h2>

              <div className="w-full bg-blue-200 rounded-full h-1 mt-1">
                <div
                  className="h-1 bg-blue-800 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(item.members_count * 20, 100)}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="text-xs font-medium text-gray-700 shrink-0">
              <p>{item.projects_count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
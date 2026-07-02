import { ArrowUpRight, Gauge } from "lucide-react";
import StatsCard from "@/components/shared/StatsCard";
import Spinner from "@/components/shared/Spinner";
import Charts from "@/components/ui/chart";
import { statistics } from "./Data/DashboardData";
import DashboardTasks from "./DashboardTasks";
import DashboardFiles from "./DashboardFiles";
import DashboardActiveProjects from "./DashboardActiveFiles";
import DashboardEvents from "./DashboardEvents";
import AskAi from "./AskAi";
import { useDashboardStats } from "@/features/Dashboard/hooks/UseDashboardStats";
import DashboardTeams from "./DashboardTeams";
import DashboardSkeleton from "./DashboardSkleton";

export default function DashboardPage() {
  const { data, isPending, error } = useDashboardStats();

  if (isPending) {
    return (
   
        <DashboardSkeleton />
    
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 my-6">
        <h2>Something went wrong!</h2>
      </div>
    );
  }

  return (
    <div className="container   my-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {statistics.map((item, index) => (
          <StatsCard
            key={index}
            title={item.title}
            value={data?.data.completed_tasks ?? 0}
            icon={item.icon}
            color={item.color}
            backgroundColor={item.backgroundColor}
            progressValue={`${data?.data.completed_tasks ?? 0} / ${data?.data.total_tasks ?? 0}`}
            iconColor={item.iconColor}
          />
        ))}

        <div className="p-4 bg-white border border-gray-100 shadow-sm text-black space-y-2 rounded-lg flex justify-between">
          <div className="space-y-3">
            <h2 className="text-gray-600 font-medium">
              Completion Rate
            </h2>

            <h2 className="text-2xl font-bold">
              {data?.data.completion_rate ?? 0}%
            </h2>

         
          </div>

          <div>
            <Gauge className="text-gray-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-5 w-full">
        <div className="lg:col-span-6 bg-white rounded-lg">
          <Charts />
        </div>

        <DashboardActiveProjects />
        <DashboardFiles />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 mt-7 w-full">
        <DashboardTasks />
        <DashboardTeams />
        <DashboardEvents />
        <AskAi />
      </div>
    </div>
  );
}
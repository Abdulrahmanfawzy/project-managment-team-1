import {
  ArrowUpRight,
  Gauge,
} from "lucide-react";
import Chart, {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import StatsCard from "@/components/shared/StatsCard";
import Charts from "@/components/ui/chart";
import { statistics } from "./Data/DashboardData";
import DashboardTasks from "./DashboardTasks";
import DashboardFiles from "./DashboardFiles";
import DashboardActiveProjects from "./DashboardActiveFiles";
import DashboardProgresses from "./DashboardProgresses";
import DashboardEvents from "./DashboardEvents";
import AskAi from "./AskAi";
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;
export default function DashboardPage() {
  return (
    <div className="container m-auto  px-4  my-6 ">
      <div className="grid grid-cols-1  lg:grid-cols-4 gap-4 ">
        {statistics.map((item, index) => (
          <StatsCard
            key={index}
            title={item.title}
            value={item.value}
            subValue={item.subValue}
            icon={item.icon}
            color={item.color}
            backgroundColor={item.backgroundColor}
            progressValue={item.progressValue}
            iconColor={item.iconColor}
          />
        ))}
        <div className="p-4 shadow-sm text-black  space-y-2 rounded-sm flex justify-between">
          <div className="space-y-3">
            <h2 className="text-gray-600 font-medium">Completion Rate</h2>
            <h2 className="text-2xl font-bold">33%</h2>
            <div className="flex items-center gap-2">
              <ArrowUpRight size={18} className="text-green-700" />
              <span className="text-xs text-gray-500 md:text-sm">
                +10% From last month
              </span>
            </div>
          </div>
          <div>
            <Gauge className="text-gray-400" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-5 w-full">
        <div className="lg:col-span-6 bg-white rounded-lg  ">
          <Charts />
        </div>
        <DashboardActiveProjects />
        <DashboardFiles />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 mt-7 w-full">
        <DashboardTasks />
        <DashboardProgresses />
        <DashboardEvents />
        <AskAi />
      </div>
    </div>
  )
}
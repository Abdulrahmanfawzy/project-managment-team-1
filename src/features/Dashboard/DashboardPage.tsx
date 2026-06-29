import {
  ArrowDown,
  ArrowUpRight,
  Backpack,
  CalendarDays,
  ClipboardCheck,
  ClipboardClock,
  ClipboardList,
  Download,
  Gauge,
} from "lucide-react";

import Chart, {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import StatsCard from "@/components/shared/StatsCard";
import { Link } from "react-router-dom";
export const description = "A line chart with dots";

import Charts from "@/components/ui/chart";
import avatar from "@/assets/Avatar.svg"
import avatar2 from "@/assets/Avatar2.svg"
import avatar3 from "@/assets/Avatar3.svg"
import image from "@/assets/image 2.svg"
import { Active, events, files, progresses, statistics, Tasks } from "./Data/DashboardData";
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

        <div className="lg:col-span-3 bg-white h-auto lg:max-h-80 rounded-lg p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-black">Active Projects</h2>
            <Link to="/projects" className="text-blue-500 text-sm">See All</Link>
          </div>
          {Active.map((item) => (
            <div className="rounded-sm my-4">
              <div className="flex space-x-1.5 items-center mb-2">
                <Backpack className={`${item.backgroundColor} ${item.iconColor} p-1 text-2xl rounded-full w-7 h-7`} />
                <h2 className="font-medium text-sm">{item.ProjectName}</h2>
              </div>
              <div className={`w-full ${item.backgroundColor} rounded-full h-2`}>
                <div className={`${item.progressColor} h-2 rounded-full w-1/2`}></div>
              </div>
              <h2 className="mt-1 text-xs text-gray-500">Task: {item.tasks}</h2>
            </div>
          ))}
        </div>

        <div className="lg:col-span-3 space-y-4 rounded-lg h-auto lg:max-h-80 bg-white py-5 px-3 shadow-sm">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-black">Recent files</h2>
            <Link to="/projects/alpha/files" className="text-blue-500 text-sm">See All</Link>
          </div>
          {files.map((file) => (
            <div className="flex justify-between items-center space-x-2 border-b border-gray-100 pb-2">
              <img src={file.img} className="w-8 h-8 shrink-0" alt="pdf" />
              <div className="text-xs flex-1 min-w-0">
                <h2 className="truncate font-medium">{file.name}</h2>
                <p className="text-gray-400">By {file.personName} • {file.time}</p>
              </div>
              <Download className="w-4 h-4 text-gray-500 shrink-0 cursor-pointer" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 mt-7 w-full">
        <div className="lg:col-span-3 space-y-4 bg-white rounded-lg p-5 shadow-sm flex flex-col justify-between ">
          <div className="flex justify-between items-center">
            <h2 className="text-black font-bold">Tasks</h2>
            <Link to="/tasks" className="text-blue-500 text-sm">View All</Link>
          </div>
          {Tasks.map((task) => (
            <div className="rounded-sm">
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-medium truncate max-w-[70%]">{task.taskName}</h2>
                <h2 className={`${task.priorityBackground} rounded-full ${task.priorityColor} px-2.5 py-0.5 text-xs font-semibold`}>{task.priority}</h2>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <h2>Due: {task.taskDeadline}</h2>
                <p>{task.taskProgress}</p>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-1 mt-1">
                <div className={`h-1 bg-blue-800 rounded-full w-[${task.taskProgress}]`} ></div>
              </div>
            </div>
          ))}
        </div>
    
        <div className="lg:col-span-3 space-y-4 bg-white rounded-lg p-5 shadow-sm ">
          <div className="flex space-x-3 items-center">
            <h2 className="text-black font-bold">Teams</h2>
            <h2 className="flex items-center text-sm text-gray-600 bg-gray-50 px-2 py-0.5 rounded">UI/UX <ArrowDown className="w-4 h-4 ml-1" /></h2>
          </div>
          <div className="flex justify-between text-xs font-semibold text-gray-400 pb-1">
            <h2>Name</h2>
            <h2>Tasks</h2>
          </div>
          <div className="space-y-3 overflow-y-auto max-h-56 pr-1">
            {progresses.map((item) => (
              <div className="flex justify-between items-center space-x-2">
                <img src={avatar} className="w-7 h-7 rounded-full shrink-0" alt="avatar" />
                <div className="flex-1 ">
                  <h2 className="text-xs font-medium ">{item.Name}</h2>
                  <div className="w-full bg-blue-200 rounded-full h-1 mt-1">
                    <div className={`h-1 bg-blue-800 rounded-full ${item.progress}`}></div>
                  </div>
                </div>
                <div className="text-xs font-medium text-gray-700 shrink-0">
                  <p>{item.progressValue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-3 space-y-5 bg-white rounded-lg p-5 shadow-sm ">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-black">Upcoming event</h2>
            <Link to="/meetings" className="text-blue-500 text-sm">View All</Link>
          </div>
          <div className="space-y-4 overflow-y-auto max-h-60 pr-1">
            {events.map((event) => (
              <div className=" rounded-md ">
                <div className="flex justify-between items-start">
                  <h2 className="text-sm font-medium text-gray-800">{event.title}</h2>
                  <h2 className="flex items-center text-xs  px-1.5 py-0.5 rounded font-medium">{event.date} <CalendarDays className="w-3 h-3 ml-1" /></h2>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex ">
                    <img src={avatar2} className="w-6 h-6 rounded-full border-2 border-white" />
                    <img src={avatar3} className="w-6 h-6 rounded-full border-2 border-white" />
                    <img src={avatar2} className="w-6 h-6 rounded-full border-2 border-white" />
                  </div>
                  <h2 className="text-xs text-gray-400 font-medium">{event.time}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-3 bg-white rounded-lg shadow-sm p-5 flex flex-col justify-between ">
          <h2 className="font-semibold text-black">Ask AI</h2>
          <div className="flex flex-col items-center justify-center my-auto">
            <img src={image} className="w-16 h-16 object-contain mb-2" alt="ai-bot" />
            <h2 className="text-sm text-gray-500 font-medium">Ask me anything</h2>
          </div>
          <div className="w-full mt-2">
            <textarea
              className="w-full bg-gray-100 rounded-md p-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none" rows={2}
              placeholder="Ask for anything..." />
          </div>
        </div>
      </div>
    </div>
)}
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  ChevronDown,
  Calendar,
  Folder,
  AlertCircle,
  CheckCircle2,
  Check,
  Loader2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import Chart from "@/components/ui/chart";
import { Cell, Customized, Pie, PieChart, ResponsiveContainer } from "recharts";
import { useProjectDetails } from "@/features/projects/hooks/useProjectDetails";

interface ViewBox {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
}

const renderNeedle = (
  value: number,
  cx: number,
  cy: number,
  iR: number,
  oR: number,
  color: string,
) => {
  const RADIAN = Math.PI / 180;
  const angle = 180 - (value / 100) * 180;
  const length = (iR + oR) / 1.35;

  const xB = cx + length * Math.sin(-angle * RADIAN);
  const yB = cy + length * Math.cos(-angle * RADIAN);

  return (
    <g>
      <line
        x1={cx}
        y1={cy}
        x2={xB}
        y2={yB}
        stroke={color}
        strokeWidth={7.5}
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r={6} fill={color} />
    </g>
  );
};

export default function ProjectDetailsPage() {
  const { projectId } = useParams();

  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("UI/UX");
  const roles = ["UI/UX", "Front End", "Back End", "Graphic Designers"];

  // ✅ Real API data
  const { data: details, isLoading, isError } = useProjectDetails(projectId);

  const NeedleCustomized = ({ viewBox }: { viewBox?: ViewBox }) => {
    if (!viewBox || !details) return null;
    const { cx, cy, innerRadius, outerRadius } = viewBox;
    return renderNeedle(
      details.projectCompletedPercentage,
      cx,
      cy,
      innerRadius,
      outerRadius,
      "#27272B",
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 w-full">
        <Loader2 className="animate-spin text-[#005AFB]" size={32} />
      </div>
    );
  }

  if (isError || !details) {
    return (
      <div className="flex items-center justify-center py-20 w-full text-red-500 text-sm">
        Failed to load project details. Please try again.
      </div>
    );
  }

  const gaugeData = [
    { value: details.projectCompletedPercentage },
    { value: 100 - details.projectCompletedPercentage },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[864px_416px] gap-8 w-full items-start max-w-[1312px]">
      {/* Left Column */}
      <div className="flex flex-col gap-8 w-full">
        {/* Description */}
        <Card className="p-5 bg-white border border-[#F3F4F6] rounded-[16px] shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Description
          </h3>
          <p className="text-[14px] text-slate-500 leading-relaxed font-inter">
            {details.description}
          </p>
        </Card>

        {/* Graphs / Monthly Flow */}
        <Chart data={details.chartData} />

        {/* Product Details */}
        <Card className="p-5 bg-white border border-[#F3F4F6] rounded-[16px] shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">
            Product Details
          </h3>
          <div className="grid grid-cols-3 gap-y-8 gap-x-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Folder size={18} />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium">
                  Project Type
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  {details.projectType}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium">
                  Start Date
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  {details.startDate}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium">
                  Deadline
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  {details.deadline}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                <AlertCircle size={18} />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium">
                  Priority
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  {details.priority}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center text-slate-600">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium">
                  Total Tasks
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  {details.totalTasks}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Right Column */}
      <div className="flex flex-col gap-8 w-full">
        {/* Project Progress Gauge */}
        <Card className="p-5 bg-white border border-[#F3F4F6] rounded-[16px] shadow-sm flex flex-col items-center">
          <div className="w-full text-left mb-4">
            <h3 className="text-lg font-semibold text-slate-900">
              Project Progress
            </h3>
          </div>

          <div className="relative w-44.5 h-30 flex items-center justify-center overflow-hidden mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ bottom: -20 }}>
                <Pie
                  data={gaugeData}
                  startAngle={180}
                  endAngle={0}
                  innerRadius={68}
                  outerRadius={76}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                  cx="50%"
                  cy="80%"
                >
                  <Cell fill="#27272B" />
                  <Cell fill="#E9E9EA" />
                </Pie>
                <Customized component={NeedleCustomized} />
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute bottom-0 text-center flex flex-col items-center">
              <span className="text-[24px] font-bold text-[#27272B] tracking-tight">
                {details.projectCompletedPercentage}%
              </span>
              <span className="text-[12px] text-slate-400 font-medium">
                Project Completed
              </span>
            </div>
          </div>

          <div className="flex justify-between w-full mt-8 pt-6 border-t border-slate-50">
            <div className="text-center">
              <p className="text-[15px] font-bold text-slate-800">
                {details.pendingTasks}
                <span className="text-xs text-slate-400 font-normal">
                  /{details.totalTasksCount}
                </span>
              </p>
              <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-[#E9E9EA]"></span>{" "}
                Pending tasks
              </p>
            </div>
            <div className="text-center">
              <p className="text-[15px] font-bold text-slate-800">
                {details.inProgressTasks}
                <span className="text-xs text-slate-400 font-normal">
                  /{details.totalTasksCount}
                </span>
              </p>
              <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span> In
                progress tasks
              </p>
            </div>
            <div className="text-center">
              <p className="text-[15px] font-bold text-slate-800">
                {details.completedTasks}
                <span className="text-xs text-slate-400 font-normal">
                  /{details.totalTasksCount}
                </span>
              </p>
              <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>{" "}
                Completed tasks
              </p>
            </div>
          </div>
        </Card>

        {/* Team Members */}
        <Card className="p-5 bg-white border border-[#F3F4F6] rounded-[16px] shadow-sm relative">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Team Members
            </h3>
            <div className="relative">
              <button
                onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
                className="text-[13px] font-medium text-slate-600 flex items-center gap-1 hover:bg-slate-50 px-2 py-1 rounded"
              >
                {selectedRole}{" "}
                <ChevronDown size={14} className="text-slate-400" />
              </button>
              {isTeamDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-45 bg-white border border-[#F3F4F6] rounded-xl shadow-lg p-2 z-10 flex flex-col gap-1">
                  {roles.map((role) => (
                    <div
                      key={role}
                      onClick={() => {
                        setSelectedRole(role);
                        setIsTeamDropdownOpen(false);
                      }}
                      className="flex items-center justify-between px-3 py-2 text-[13px] text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer"
                    >
                      <span>{role}</span>
                      {selectedRole === role && (
                        <Check size={14} className="text-green-500" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {details.team.length === 0 ? (
              <p className="text-sm text-slate-400">No team members yet.</p>
            ) : (
              details.team.map((member, idx) => (
                <div
                  key={member.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        className="w-9.5 h-9.5 rounded-full object-cover"
                      />
                      {idx === 0 && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
                          <Check
                            size={10}
                            className="text-white"
                            strokeWidth={3}
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-slate-800">
                        {member.name}
                      </p>
                      <span className="text-[12px] text-slate-400 font-normal">
                        {member.role}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
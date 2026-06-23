
import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import { ChevronDown, Calendar, Folder, AlertCircle, CheckCircle2, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { ProjectDetails } from "@/types/project";

const MOCK_DETAILS: Record<string, ProjectDetails> = {
  alpha: {
    id: "alpha",
    name: "Alpha",
    completedPercentage: 42,
    startDate: "Oct 12",
    deadline: "Dec 25",
    description:
      "This project focuses on organizing tasks, tracking progress, and coordinating team efforts to ensure timely delivery and clear visibility across all project activities.",
    projectType: "SaaS",
    priority: "High",
    totalTasks: 140,
    pendingTasks: 62,
    inProgressTasks: 36,
    completedTasks: 42,
    totalTasksCount: 94,
    projectCompletedPercentage: 78,
    team: [
      { id: "1", name: "Mohanad wahib", role: "Leader", isOnline: true, avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80" },
      { id: "2", name: "Sara Hassan", role: "UI/UX", isOnline: false, avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80" },
      { id: "3", name: "Ali Mohamed", role: "UI/UX", isOnline: false, avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80" },
      { id: "4", name: "Khalid Mousa", role: "UI/UX", isOnline: false, avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80" },
    ],
    chartData: [
      { month: "Jan", value: 8000 },
      { month: "Feb", value: 10000 },
      { month: "Mar", value: 7000 },
      { month: "Apr", value: 22000 },
      { month: "May", value: 12000 },
      { month: "Jun", value: 24000 },
    ],
  },
};

const renderNeedle = (value: number, cx: number, cy: number, iR: number, oR: number, color: string) => {
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
  const navigate = useNavigate();
  const [activeTab] = useState<string>("overview");

  // Dropdown States
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("UI/UX");
  const roles = ["UI/UX", "Front End", "Back End", "Graphic Designers"];

  const details = useMemo<ProjectDetails>(() => {
    if (!projectId) return MOCK_DETAILS.alpha;
    return MOCK_DETAILS[projectId] ?? MOCK_DETAILS.alpha;
  }, [projectId]);

  const gaugeData = [
    { value: details.projectCompletedPercentage },
    { value: 100 - details.projectCompletedPercentage },
  ];

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex justify-center py-8 px-12 font-sans selection:bg-blue-100">
      <div className="w-full max-w-[1312px] flex flex-col gap-8">
        
        {/* header frame  */}
        <div className="w-full flex justify-between items-start">
          <div className="flex flex-col gap-4">
            {/* breadcrumbs */}
            <div className="flex items-center gap-2 text-[14px] font-normal font-inter">
              <span 
                className="text-[#00000099] cursor-pointer hover:text-black transition-colors"
                onClick={() => navigate("/projects")}
              >
                Projects
              </span>
              <span className="text-[#00000099]">{`>`}</span>
              <span className="text-black">{details.name}</span>
            </div>

            {/* title  and indicator */}
            <div className="flex items-center gap-4">
              <h1 className="text-[31px] font-semibold text-black leading-tight">
                {details.name}
              </h1>
              <div className="bg-[#EAF6EA] px-3 py-1.5 rounded-full flex items-center justify-center">
                <span className="text-[12px] text-[#22C55E] font-medium">
                  {details.completedPercentage}% Completed
                </span>
              </div>
            </div>
          </div>

          {/* due date frame */}
          <div className="w-81 h-17.75 p-3 rounded-[12px] border border-[#F3F4F6] bg-white flex flex-col justify-between">
            <span className="text-[14px] text-[#252525] font-normal leading-none">DuE Date</span>
            
            <div className="relative w-[300px] h-[4px] bg-[#E6EFFF] rounded-full overflow-hidden mt-1">
              <div 
                className="absolute top-0 left-0 h-full bg-[#005AFB] rounded-[100px]" 
                style={{ width: `${details.completedPercentage}%` }}
              />
            </div>

            <div className="flex justify-between w-full mt-1">
              <span className="text-[11px] text-slate-500 font-medium">Start Date: <span className="text-black">{details.startDate}</span></span>
              <span className="text-[11px] text-slate-500 font-medium">Deadline: <span className="text-black">{details.deadline}</span></span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200">
          <div className="flex gap-8 text-sm font-medium text-slate-500">
             <button className="text-blue-600 border-b-2 border-blue-600 pb-2">Overview</button>
             <button className="pb-2 hover:text-slate-900">Tasks</button>
             <button className="pb-2 hover:text-slate-900">Teams</button>
             <button className="pb-2 hover:text-slate-900">Files</button>
          </div>
        </div>

        {/* layout area  */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-[864px_416px] gap-[32px] w-full items-start">
            
            {/* Left Column */}
            <div className="flex flex-col gap-[32px] w-full">
              
              {/* Description */}
              <Card className="p-5 bg-white border border-[#F3F4F6] rounded-[16px] shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Description</h3>
                <p className="text-[14px] text-slate-500 leading-relaxed font-inter">{details.description}</p>
              </Card>

              {/* Graphs / Monthly Flow */}
              <Card className="p-5 bg-white border border-[#F3F4F6] rounded-[16px] shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-slate-900">Project overview</h3>
                  <div className="flex gap-4 text-xs font-medium text-slate-500">
                    <button className="flex items-center gap-1 hover:text-slate-900 transition-colors">
                      All Projects <ChevronDown size={14} />
                    </button>
                    <button className="flex items-center gap-1 hover:text-slate-900 transition-colors">
                      This Year <ChevronDown size={14} />
                    </button>
                  </div>
                </div>

                <div className="h-[220px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={details.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="figmaVectorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0.01%" stopColor="#2563EB" stopOpacity={0.1} />
                          <stop offset="99.95%" stopColor="#3B82F6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v/1000}k`} />
                      <Tooltip cursor={{ stroke: '#E2E8F0', strokeWidth: 1 }} />
                      <Area type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={2} fill="url(#figmaVectorGradient)" fillOpacity={1} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Product Details */}
              <Card className="p-5 bg-white border border-[#F3F4F6] rounded-[16px] shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 mb-6">Product Details</h3>
                <div className="grid grid-cols-3 gap-y-8 gap-x-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      <Folder size={18} />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400 font-medium">Project Type</p>
                      <p className="text-sm font-semibold text-slate-800">{details.projectType}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400 font-medium">Start Date</p>
                      <p className="text-sm font-semibold text-slate-800">{details.startDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400 font-medium">Deadline</p>
                      <p className="text-sm font-semibold text-slate-800">{details.deadline}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                      <AlertCircle size={18} />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400 font-medium">Priority</p>
                      <p className="text-sm font-semibold text-slate-800">{details.priority}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center text-slate-600">
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400 font-medium">Total Tasks</p>
                      <p className="text-sm font-semibold text-slate-800">{details.totalTasks}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column  */}
            <div className="flex flex-col gap-[32px] w-full">
              
              {/* Project Progress Gauge */}
              <Card className="p-5 bg-white border border-[#F3F4F6] rounded-[16px] shadow-sm flex flex-col items-center">
                <div className="w-full text-left mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Project Progress</h3>
                </div>
                
                <div className="relative w-[178px] h-[120px] flex items-center justify-center overflow-hidden mt-2">
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
                      {({ viewBox }) => {
                        const { cx, cy, innerRadius, outerRadius } = viewBox;
                        return renderNeedle(details.projectCompletedPercentage, cx, cy, innerRadius, outerRadius, "#27272B");
                      }}
                    </PieChart>
                  </ResponsiveContainer>
                  
                  <div className="absolute bottom-0 text-center flex flex-col items-center">
                    <span className="text-[24px] font-bold text-[#27272B] tracking-tight">{details.projectCompletedPercentage}%</span>
                    <span className="text-[12px] text-slate-400 font-medium">Project Completed</span>
                  </div>
                </div>

                <div className="flex justify-between w-full mt-8 pt-6 border-t border-slate-50">
                  <div className="text-center">
                    <p className="text-[15px] font-bold text-slate-800">{details.pendingTasks}<span className="text-xs text-slate-400 font-normal">/{details.totalTasksCount}</span></p>
                    <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5 mt-1">
                      <span className="w-2 h-2 rounded-full bg-[#E9E9EA]"></span> Pending tasks
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-[15px] font-bold text-slate-800">{details.inProgressTasks}<span className="text-xs text-slate-400 font-normal">/{details.totalTasksCount}</span></p>
                    <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5 mt-1">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span> In progress tasks
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-[15px] font-bold text-slate-800">{details.completedTasks}<span className="text-xs text-slate-400 font-normal">/{details.totalTasksCount}</span></p>
                    <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5 mt-1">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span> Completed tasks
                    </p>
                  </div>
                </div>
              </Card>

              {/* Team Members */}
              <Card className="p-5 bg-white border border-[#F3F4F6] rounded-[16px] shadow-sm relative">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-slate-900">Team Members</h3>
                  <div className="relative">
                    <button 
                      onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
                      className="text-[13px] font-medium text-slate-600 flex items-center gap-1 hover:bg-slate-50 px-2 py-1 rounded"
                    >
                      {selectedRole} <ChevronDown size={14} className="text-slate-400" />
                    </button>
                    {isTeamDropdownOpen && (
                      <div className="absolute right-0 top-full mt-2 w-[180px] bg-white border border-[#F3F4F6] rounded-xl shadow-lg p-2 z-10 flex flex-col gap-1">
                        {roles.map((role) => (
                          <div 
                            key={role}
                            onClick={() => { setSelectedRole(role); setIsTeamDropdownOpen(false); }}
                            className="flex items-center justify-between px-3 py-2 text-[13px] text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer"
                          >
                            <span>{role}</span>
                            {selectedRole === role && <Check size={14} className="text-green-500" />}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {details.team.map((member, idx) => (
                    <div key={member.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img src={member.avatarUrl} alt={member.name} className="w-[38px] h-[38px] rounded-full object-cover" />
                          {idx === 0 && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center border-[2px] border-white">
                              <Check size={10} className="text-white" strokeWidth={3} />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-[14px] font-semibold text-slate-800">{member.name}</p>
                          <span className="text-[12px] text-slate-400 font-normal">{member.role}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

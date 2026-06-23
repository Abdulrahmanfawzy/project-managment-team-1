import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ChartsProps {
  data: { month: string; value: number }[];
}

export default function Charts({ data }: ChartsProps) {
  return (
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
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="figmaVectorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0.01%" stopColor="#2563EB" stopOpacity={0.1} />
                <stop offset="99.95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}k`} />
            <Tooltip cursor={{ stroke: "#E2E8F0", strokeWidth: 1 }} />
            <Area type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={2} fill="url(#figmaVectorGradient)" fillOpacity={1} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
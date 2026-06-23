import React from "react";
import type { TeamData } from "./data/data";
import type { Team } from "./data/data";
import MemberRow from "./member-row";
import { cn } from "@/lib/utils";
const teamMeta: Record<
  Team,
  { title: string; header: string; accent: string }
> = {
  UI: { title: "UI/UX", header: "bg-[#FAECF6]", accent: "text-[#A43782]" },
  Front: {
    title: "Frontend",
    header: "bg-[#F2EAF2]",
    accent: "text-[#7D2D7E]",
  },
  Back: { title: "Backend", header: "bg-[#E6F8F7]", accent: "text-[#04B5AE]" },
  Market: {
    title: "Marketing",
    header: "bg-[#E9E9EA]",
    accent: "text-[#27272B]",
  },
};
export default function TeamCard({ data }: { data: TeamData }) {
  const meta = teamMeta[data.team];
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
      {/* header */}
      <div
        className={cn(
          "flex items-center justify-between px-4 py-3",
          meta.header,
        )}
      >
        <h3 className="text-lg font-semibold text-text-h">{meta.title}</h3>
        <span className={cn("text-sm font-medium", meta.accent)}>
          {data.completed}% Completed
        </span>
      </div>

      {/* Name / Tasks column labels */}
      <div className="flex items-center justify-between px-4 pt-3 text-sm text-muted-foreground">
        <span>Name</span>
        <span>Tasks</span>
      </div>

      {/* members */}
      <div className="divide-y divide-slate-100 px-4 pb-2">
        {data.members.map((member, i) => (
          <MemberRow key={i} member={member} />
        ))}
      </div>
    </div>
  );
}

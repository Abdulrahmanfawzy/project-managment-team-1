import { useParams } from "react-router-dom";

import { cn } from "@/lib/utils";
import { useTasks } from "@/features/TasksPage/hooks/useTasks";
import type { ProjectTeam } from "./types/teams";
import { useTeamMembers } from "./hooks/useTeamMembers";
import MemberRow from "./member-row";
import DeleteTeam from "./components/DeleteTeam";
import AddTeamMembers from "./components/AddTeamMembers";
import Spinner from "@/components/shared/Spinner";

// The API doesn't categorize teams, so cycle a palette by position to keep
// the cards visually distinct (matches the original UI/Front/Back/Market look).
const palette = [
  { header: "bg-[#FAECF6]", accent: "text-[#A43782]" },
  { header: "bg-[#F2EAF2]", accent: "text-[#7D2D7E]" },
  { header: "bg-[#E6F8F7]", accent: "text-[#04B5AE]" },
  { header: "bg-[#E9E9EA]", accent: "text-[#27272B]" },
];

export default function TeamCard({
  team,
  index = 0,
}: {
  team: ProjectTeam;
  index?: number;
}) {
  const meta = palette[index % palette.length];
  const { projectId } = useParams();

  // Members come from their own endpoint; tasks drive the progress numbers.
  const { data: membersRes, isPending } = useTeamMembers(team.id);
  const { data: tasksRes } = useTasks();

  const members = membersRes?.data ?? [];
  const projectTasks = (tasksRes?.data ?? []).filter(
    (t) => t.project_id === Number(projectId),
  );

  // Tasks assigned to a member (in this project) + how many are completed.
  const statsFor = (memberId: number) => {
    const assigned = projectTasks.filter((t) =>
      t.assignees.some((a) => a.id === memberId),
    );
    const done = assigned.filter((t) => t.status === "completed").length;
    return { done, total: assigned.length };
  };

  // Team completion = completed / total tasks across all its members.
  const totals = members.reduce(
    (acc, m) => {
      const s = statsFor(m.id);
      return { done: acc.done + s.done, total: acc.total + s.total };
    },
    { done: 0, total: 0 },
  );
  const teamPct =
    totals.total > 0 ? Math.round((totals.done / totals.total) * 100) : 0;

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
      {/* header: team name + computed completion */}
      <div
        className={cn(
          "flex items-center justify-between px-4 py-3",
          meta.header,
        )}
      >
        <h3 className="text-lg font-semibold text-text-h">
          {team.display_name ?? team.name}
        </h3>
        <div className="flex items-center gap-3">
          <span className={cn("text-sm font-medium", meta.accent)}>
            {teamPct}% Completed
          </span>
          <DeleteTeam team={team} />
        </div>
      </div>

      {/* column labels */}
      <div className="flex items-center justify-between px-4 pt-3 text-sm text-muted-foreground">
        <span>Name</span>
        <span>Tasks</span>
      </div>

      {/* members with per-person task progress */}
      <div className="divide-y divide-slate-100 px-4 pb-2">
        {isPending ? (
          <Spinner className="py-3" />
        ) : members.length === 0 ? (
          <p className="py-3 text-xs text-muted-foreground">No members yet.</p>
        ) : (
          members.map((member, i) => {
            const { done, total } = statsFor(member.id);
            return (
              <MemberRow
                key={member.id}
                member={member}
                done={done}
                total={total}
                isLeader={i === 0}
              />
            );
          })
        )}
      </div>

      {/* add a member to this existing team */}
      <div className="px-4 pb-4 pt-1">
        <AddTeamMembers team={team} />
      </div>
    </div>
  );
}

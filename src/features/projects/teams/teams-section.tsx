import { useParams } from "react-router-dom";

import TeamCard from "./team-card";
import TeamCardSkeleton from "./team-card-skeleton";
import CreateTeam from "./components/CreateTeam";
import { useProjectTeams } from "./hooks/useProjectTeams";

const TeamsSection = () => {
  const { projectId } = useParams();
  const { data, isPending, isError, error } = useProjectTeams(
    Number(projectId),
  );

  const teams = data?.data ?? [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text-h">Teams</h2>
        <CreateTeam />
      </div>

      {isPending && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <TeamCardSkeleton key={i} />
          ))}
        </div>
      )}

      {isError && (
        <p className="p-4 text-sm text-red-600">
          Failed to load teams: {error.message}
        </p>
      )}

      {!isPending && !isError && teams.length === 0 && (
        <p className="p-4 text-sm text-muted-foreground">
          This project has no teams yet. Create one to get started.
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {teams.map((team, i) => (
          <TeamCard key={team.id} team={team} index={i} />
        ))}
      </div>
    </div>
  );
};

export default TeamsSection;

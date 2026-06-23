import TeamCard from "./team-card";
import { teams } from "./data/data";

const TeamsSection = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {teams.map((team) => (
        <TeamCard key={team.team} data={team} />
      ))}
    </div>
  );
};

export default TeamsSection;

import React from "react";
import type { TeamMember } from "@/types/project";

interface Props {
  members: TeamMember[];
  max?: number;
}

const COLORS = ["#6366F1", "#EC4899", "#14B8A6", "#F59E0B", "#8B5CF6"];

const getInitials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

const AvatarGroup: React.FC<Props> = ({ members, max = 3 }) => {
  const visible = members.slice(0, max);
  const overflow = members.length - max;

  return (
    <div className="flex items-center">
      {visible.map((member, i) => (
        <div
          key={member.id}
          title={member.name}
          style={{
            backgroundColor: member.avatarUrl ? undefined : COLORS[i % COLORS.length],
            marginLeft: i === 0 ? 0 : -8,
            zIndex: visible.length - i,
            width: 32,
            height: 32,
            borderRadius: 9999,
          }}
          className="flex items-center justify-center text-white text-xs font-semibold overflow-hidden relative border-2 border-white"
        >
          {member.avatarUrl ? (
            <img src={member.avatarUrl} alt={member.name} className="w-full h-full object-cover" />
          ) : (
            getInitials(member.name)
          )}
        </div>
      ))}
      {overflow > 0 && (
        <div
          style={{ marginLeft: -8 }}
          className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-semibold"
        >
          +{overflow}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
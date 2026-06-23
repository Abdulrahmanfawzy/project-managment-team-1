import React from "react";
import type { ProjectPriority } from "@/types/project";

interface Props {
  priority: ProjectPriority;
}

const priorityConfig: Record<ProjectPriority, { label: string; color: string }> = {
  high:   { label: "High",   color: "#EF4444" },
  medium: { label: "Medium", color: "#F59E0B" },
  low:    { label: "Low",    color: "#22C55E" },
};

const ProjectPriorityBadge: React.FC<Props> = ({ priority }) => {
  const { label, color } = priorityConfig[priority];
  return (
    <span style={{ color }} className="text-sm font-medium">
      {label}
    </span>
  );
};

export default ProjectPriorityBadge;
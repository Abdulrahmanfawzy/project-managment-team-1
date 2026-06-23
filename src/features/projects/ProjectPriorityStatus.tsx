import React from "react";
import type { Project } from "@/types/project";


type ProjectStatus = Project["status"];

interface Props {
  status: ProjectStatus;
}

const statusConfig: Record<ProjectStatus, { label: string; bg: string; color: string }> = {

  active: {
    label: "Active",
    bg: "",
    color: "#FA2B75",
  },
  done: {
    label: "Done",
    bg: "",
    color: "#2BA52E",
  },
  pending: {
    label: "Pending",
    bg: "#F59E0B",
    color: "#FFFFFF",
  },
  "in-progress": {
    label: "In Progress",
    bg: "#2563EB",
    color: "#FFFFFF",
  },
};


const ProjectPriorityStatus: React.FC<Props> = ({ status }) => {
  const cfg = statusConfig[status];

  return (
    <span
      style={{
        background: cfg.bg,
        color: cfg.color,
        borderRadius: 16,
        padding: "10px 12px",
        fontFamily: "Inter, sans-serif",
        fontWeight: 400,
        fontSize: 14,
        lineHeight: "150%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: 28,
      }}
    >
      {cfg.label}
    </span>
  );
};

export default ProjectPriorityStatus;

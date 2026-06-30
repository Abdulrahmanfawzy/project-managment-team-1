import React from "react";
import { Plus } from "lucide-react";

interface ProjectsPageHeaderProps {
  onAddProjectClick: () => void;
}

const ProjectsPageHeader: React.FC<ProjectsPageHeaderProps> = ({
  onAddProjectClick,
}) => {
  return (
    <div
      style={{
        width: 1311,
        height: 40,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 48,
      }}
    >
      <h1
        style={{
          margin: 0,
          fontFamily: "Inter, sans-serif",
          fontWeight: 600,
          fontSize: 31,
          lineHeight: "150%",
          color: "#000712",
        }}
      >
        All Projects
      </h1>

      <button
        onClick={onAddProjectClick}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "12px 12px 12px 20px",
          gap: 8,
          width: 135,
          height: 40,
          borderRadius: 32,
          background: "#005AFB",
          border: "none",
          color: "#FFFFFF",
          cursor: "pointer",
          fontFamily: "Inter",
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        <Plus size={16} />
        Add Project
      </button>
    </div>
  );
};

export default ProjectsPageHeader;
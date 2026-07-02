import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BriefcaseBusiness, FileText, Pencil, Trash2 } from "lucide-react";
import type { Project } from "@/types/project";
import ProjectPriorityBadge from "./ProjectPriorityBadge";
import AvatarGroup from "./AvatarGroup";
import ProjectPriorityStatus from "./ProjectPriorityStatus";
import EditProjectModal from "./components/EditProjectModal";  
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { useDeleteProject } from "./hooks/useDeleteProject";  

interface Props {
  projects: Project[];
}

const COLUMNS = [
  "Project Name",
  "Start Date",
  "Deadline",
  "Status",
  "Files",
  "Teams",
  "Priority",
  "",
];

const ProjectsTable: React.FC<Props> = ({ projects }) => {
  const navigate = useNavigate();

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProject, setDeletingProject] = useState<Project | null>(
    null,
  );

  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();

  const handleConfirmDelete = () => {
    if (!deletingProject) return;
    deleteProject(deletingProject.id, {
      onSuccess: () => setDeletingProject(null),
    });
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        <table
          style={{
            width: 1312,
            borderCollapse: "separate",
            borderSpacing: "0 12px",
          }}
        >
          <thead>
            <tr style={{ height: 59 }}>
              {COLUMNS.map((col) => (
                <th
                  key={col}
                  style={{
                    textAlign: "left",
                    fontFamily: "Inter, sans-serif",
                    fontStyle: "normal",
                    fontWeight: 500,
                    fontSize: 18,
                    lineHeight: "150%",
                    color: "#000712",
                    padding: "16px 16px",
                    verticalAlign: "middle",
                    whiteSpace: "nowrap",
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                onClick={() => navigate(`/projects/${project.id}`)}
                style={{
                  height: 60,
                  backgroundColor: "#FFFFFF",
                  cursor: "pointer",
                  borderRadius: "12px",
                }}
                onMouseEnter={(e) => {
                  (
                    e.currentTarget as HTMLTableRowElement
                  ).style.backgroundColor = "#F6F8FA";
                }}
                onMouseLeave={(e) => {
                  (
                    e.currentTarget as HTMLTableRowElement
                  ).style.backgroundColor = "#FFFFFF";
                }}
              >
                <td
                  style={{
                    padding: "16px",
                    verticalAlign: "middle",
                    borderTopLeftRadius: "12px",
                    borderBottomLeftRadius: "12px",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        backgroundColor:
                          project.id === "alpha" || project.name === "Alpha"
                            ? "rgba(125, 45, 126, 0.15)"
                            : "rgba(4, 181, 174, 0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <BriefcaseBusiness
                        size={16}
                        color={
                          project.id === "alpha" || project.name === "Alpha"
                            ? "#7D2D7E"
                            : "#04B5AE"
                        }
                      />
                    </div>

                    <span className="font-medium text-gray-900">
                      {project.name || project.projectName}
                    </span>
                  </div>
                </td>

                <td style={{ padding: "16px", verticalAlign: "middle" }}>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      fontSize: 18,
                      lineHeight: "150%",
                      color: "#000712",
                    }}
                  >
                    {project.startDate}
                  </span>
                </td>

                <td style={{ padding: "16px", verticalAlign: "middle" }}>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      fontSize: 18,
                      lineHeight: "150%",
                      color: "#000712",
                    }}
                  >
                    {project.deadline}
                  </span>
                </td>

                <td style={{ padding: "16px", verticalAlign: "middle" }}>
                  <ProjectPriorityStatus status={project.status} />
                </td>

                <td style={{ padding: "16px", verticalAlign: "middle" }}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <FileText size={20} color="#FA9E00" />
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 500,
                        fontSize: 18,
                        lineHeight: "150%",
                        color: "#000712",
                      }}
                    >
                      {project.filesCount} Files
                    </span>
                  </div>
                </td>

                <td style={{ padding: "16px", verticalAlign: "middle" }}>
                  <AvatarGroup members={project.team} />
                </td>

                <td style={{ padding: "16px", verticalAlign: "middle" }}>
                  <ProjectPriorityBadge priority={project.priority} />
                </td>

                {/* Edit / Delete actions */}
                <td
                  style={{
                    padding: "16px",
                    verticalAlign: "middle",
                    borderTopRightRadius: "12px",
                    borderBottomRightRadius: "12px",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <button
                      aria-label="Edit project"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingProject(project);
                      }}
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        padding: 4,
                        color: "#71717A",
                      }}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      aria-label="Delete project"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeletingProject(project);
                      }}
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        padding: 4,
                        color: "#EF4444",
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditProjectModal
        project={editingProject}
        onClose={() => setEditingProject(null)}
      />

      <ConfirmDialog
        open={!!deletingProject}
        title="Delete this project?"
        message={`Are you sure you want to delete "${deletingProject?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingProject(null)}
      />
    </div>
  );
};

export default ProjectsTable;
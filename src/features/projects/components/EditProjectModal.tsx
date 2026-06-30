import React from "react";
import { X, Briefcase, Calendar, Loader2 } from "lucide-react";
import type { Project } from "@/types/project";
import {
  PRIORITY_OPTIONS,
  useEditProjectForm,
} from "../hooks/useEditProjectForm";

interface EditProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({
  project,
  onClose,
}) => {
  const {
    projectName,
    setProjectName,
    description,
    setDescription,
    priority,
    setPriority,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    formError,
    isUpdating,
    handleClose,
    handleSubmit,
  } = useEditProjectForm(project, onClose);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
      }}
    >
      <div
        style={{
          width: 532,
          background: "#FFFFFF",
          borderRadius: 24,
          boxShadow: "0px 12px 32px rgba(0,0,0,0.08)",
          padding: "32px 32px 24px 32px",
          fontFamily: "Inter, sans-serif",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          <div style={{ fontWeight: 600, fontSize: 22, color: "#111827" }}>
            Edit Project
          </div>
          <button
            aria-label="Close"
            onClick={handleClose}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: 1, position: "relative" }}>
              <label
                style={{
                  position: "absolute",
                  left: 12,
                  top: -8,
                  background: "#FFF",
                  padding: "0 4px",
                  fontSize: 10,
                  color: "#9CA3AF",
                }}
              >
                Project Name
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  border: "1px solid #E5E7EB",
                  borderRadius: 12,
                  padding: "12px 14px",
                  height: 44,
                  boxSizing: "border-box",
                }}
              >
                <Briefcase size={16} color="#9CA3AF" />
                <input
                  type="text"
                  placeholder="Project Name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  style={{
                    border: "none",
                    outline: "none",
                    width: "100%",
                    fontSize: 13,
                    color: "#111827",
                  }}
                />
              </div>
            </div>
            <div style={{ width: 160, position: "relative" }}>
              <label
                style={{
                  position: "absolute",
                  left: 12,
                  top: -8,
                  background: "#FFF",
                  padding: "0 4px",
                  fontSize: 10,
                  color: "#9CA3AF",
                }}
              >
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) =>
                  setPriority(
                    e.target.value as (typeof PRIORITY_OPTIONS)[number],
                  )
                }
                style={{
                  width: "100%",
                  border: "1px solid #E5E7EB",
                  borderRadius: 12,
                  padding: "12px 14px",
                  height: 44,
                  boxSizing: "border-box",
                  cursor: "pointer",
                  fontSize: 13,
                  color: "#111827",
                  appearance: "none",
                  background: "#FFF",
                }}
              >
                {PRIORITY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <label
              style={{
                position: "absolute",
                left: 12,
                top: -8,
                background: "#FFF",
                padding: "0 4px",
                fontSize: 10,
                color: "#9CA3AF",
              }}
            >
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief project description"
              rows={2}
              style={{
                width: "100%",
                border: "1px solid #E5E7EB",
                borderRadius: 12,
                padding: "12px 14px",
                boxSizing: "border-box",
                fontSize: 13,
                color: "#111827",
                resize: "none",
                fontFamily: "Inter, sans-serif",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: 1, position: "relative" }}>
              <label
                style={{
                  position: "absolute",
                  left: 12,
                  top: -8,
                  background: "#FFF",
                  padding: "0 4px",
                  fontSize: 10,
                  color: "#9CA3AF",
                }}
              >
                Start Date
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid #E5E7EB",
                  borderRadius: 12,
                  padding: "8px 14px",
                  height: 44,
                  boxSizing: "border-box",
                }}
              >
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={{
                    border: "none",
                    outline: "none",
                    width: "100%",
                    fontSize: 13,
                    color: "#111827",
                  }}
                />
                <Calendar size={16} color="#9CA3AF" />
              </div>
            </div>
            <div style={{ flex: 1, position: "relative" }}>
              <label
                style={{
                  position: "absolute",
                  left: 12,
                  top: -8,
                  background: "#FFF",
                  padding: "0 4px",
                  fontSize: 10,
                  color: "#9CA3AF",
                }}
              >
                End Date
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid #E5E7EB",
                  borderRadius: 12,
                  padding: "8px 14px",
                  height: 44,
                  boxSizing: "border-box",
                }}
              >
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  style={{
                    border: "none",
                    outline: "none",
                    width: "100%",
                    fontSize: 13,
                    color: "#111827",
                  }}
                />
                <Calendar size={16} color="#9CA3AF" />
              </div>
            </div>
          </div>

          {formError && (
            <p style={{ color: "#EF4444", fontSize: 12, margin: 0 }}>
              {formError}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={isUpdating}
            style={{
              width: "100%",
              height: 44,
              background: isUpdating ? "#94B8FF" : "#005AFB",
              color: "#FFF",
              border: "none",
              borderRadius: 100,
              fontSize: 14,
              fontWeight: 500,
              cursor: isUpdating ? "not-allowed" : "pointer",
              marginTop: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            {isUpdating ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProjectModal;
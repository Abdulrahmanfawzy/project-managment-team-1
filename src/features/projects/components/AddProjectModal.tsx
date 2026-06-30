import React from "react";
import { X, Briefcase, Calendar, Upload, Loader2 } from "lucide-react";
import {
  PRIORITY_OPTIONS,
  useAddProjectForm,
} from "../hooks/useAddProjectForm";

interface AddProjectModalProps {
  open: boolean;
  onClose: () => void;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({ open, onClose }) => {
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
    isCreating,
    handleClose,
    handleSubmit,
  } = useAddProjectForm(onClose);

  if (!open) return null;

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
            New Project
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
          {/* Project Name & Priority */}
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

          {/* Description */}
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

          {/* Dates */}
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

          {/* Files (visual only) */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 500 }}>
              Add Project Files
            </span>
            <div
              style={{
                height: 110,
                border: "1.5px dashed #E5E7EB",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "not-allowed",
                opacity: 0.6,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  color: "#9CA3AF",
                  fontSize: 12,
                }}
              >
                <Upload size={14} />
                <span>File upload coming soon</span>
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
            disabled={isCreating}
            style={{
              width: "100%",
              height: 44,
              background: isCreating ? "#94B8FF" : "#005AFB",
              color: "#FFF",
              border: "none",
              borderRadius: 100,
              fontSize: 14,
              fontWeight: 500,
              cursor: isCreating ? "not-allowed" : "pointer",
              marginTop: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            {isCreating ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Creating...
              </>
            ) : (
              "Add Project"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProjectModal;

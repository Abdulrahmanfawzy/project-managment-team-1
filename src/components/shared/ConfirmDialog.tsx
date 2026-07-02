import React from "react";
import { AlertTriangle, Loader2 } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  message,
  confirmLabel = "Delete",
  isLoading = false,
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !isLoading) onCancel();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 200,
      }}
    >
      <div
        style={{
          width: 380,
          background: "#FFFFFF",
          borderRadius: 20,
          boxShadow: "0px 12px 32px rgba(0,0,0,0.12)",
          padding: "28px",
          fontFamily: "Inter, sans-serif",
          boxSizing: "border-box",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "#FEE2E2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          <AlertTriangle size={26} color="#EF4444" />
        </div>

        <h3
          style={{
            fontSize: 17,
            fontWeight: 600,
            color: "#111827",
            margin: "0 0 8px",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: 13,
            color: "#6B7280",
            margin: "0 0 24px",
            lineHeight: 1.5,
          }}
        >
          {message}
        </p>

        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={onCancel}
            disabled={isLoading}
            style={{
              flex: 1,
              height: 42,
              borderRadius: 100,
              border: "1px solid #E5E7EB",
              background: "#FFFFFF",
              color: "#374151",
              fontSize: 14,
              fontWeight: 500,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            style={{
              flex: 1,
              height: 42,
              borderRadius: 100,
              border: "none",
              background: isLoading ? "#FCA5A5" : "#EF4444",
              color: "#FFFFFF",
              fontSize: 14,
              fontWeight: 500,
              cursor: isLoading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={14} />
                Deleting...
              </>
            ) : (
              confirmLabel
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
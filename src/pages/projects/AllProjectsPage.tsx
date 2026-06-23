import React, { useMemo, useState } from "react";
import { ChevronDown, Check, Plus, Search, X, Calendar, Upload, Briefcase } from "lucide-react";
import type { Project } from "@/types/project";
import ProjectsTable from "@/components/projects/ProjectsTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MOCK_PROJECTS: Project[] = [
  {
    id: "alpha",
    name: "Alpha",
    startDate: "2025-12-12",
    deadline: "2025-12-14",
    status: "active",
    filesCount: 22,
    priority: "high",
    iconColor: "",
    team: [
      {
        id: "1",
        name: "Sara Ahmed",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80"
      },
      {
        id: "2",
        name: "Mohamed Ali",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80"
      },
      {
        id: "3",
        name: "Nour Hassan",
        avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80"
      },
    ],
    projectName: ""
  },
  {
    id: "sepetgo",
    name: "SepetGo",
    startDate: "2025-12-12",
    deadline: "2025-12-14",
    status: "done",
    filesCount: 22,
    priority: "medium",
    iconColor: "#04B5AE",
    team: [
      {
        id: "4",
        name: "Layla Ibrahim",
        avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80"
      },
      {
        id: "5",
        name: "Omar Yusuf",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80"
      },
    ],
    projectName: ""
  },
];

const AllProjectsPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [projectFilter, setProjectFilter] = useState<string>("All Projects");
  const [addOpen, setAddOpen] = useState(false);

  // Modal form states
  const [projectName, setProjectName] = useState("");
  const [priority, setPriority] = useState("High");
  const [guestInput, setGuestInput] = useState("@Anas Mohamed");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const dropdownOptions = useMemo(
    () => [
      { label: "All Projects", value: "All Projects" },
      { label: "Project one", value: "Project One" },
      { label: "Project two", value: "Project Two" }
    ],
    [],
  );

  const filtered = useMemo(() => {
    const base = MOCK_PROJECTS.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()),
    );

    if (projectFilter === "All Projects") return base;
    if (projectFilter === "Project One")
      return base.filter((p) => p.id === "alpha");
    if (projectFilter === "Project Two")
      return base.filter((p) => p.id === "sepetgo");
    return base;
  }, [search, projectFilter]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: "#F6F8FA",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 1440,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: 40,
        }}
      >
        {/* header Title & add Btn */}
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
            onClick={() => setAddOpen(true)}
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

        {/* filters row */}
        <div
          style={{
            width: 1312,
            height: 40,
            display: "flex",
            alignItems: "center",
            marginTop: 70,
          }}
        >
          {/* Search =>left */}
          <div
            style={{
              width: 326,
              height: 40,
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "4px 16px",
              borderRadius: 100,
              background: "#FFFFFF",
              border: "1px solid #F3F4F6",
              boxSizing: "border-box",
            }}
          >
            <Search size={16} color="#A1A1AA" />

            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                width: "100%",
                fontFamily: "Rubik",
                fontSize: 12,
              }}
            />
          </div>

          {/* dropdowns => right */}
          <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginLeft: "auto",
  }}
>
  <Select value={projectFilter} onValueChange={setProjectFilter}>
    <SelectTrigger
      style={{
        width: 124,
        height: 40,
        opacity: 1,
        padding: "10px 10px 10px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        borderRadius: 16,
        border: "1px solid #E4E4E7",
        background: "#FFFFFF",
        cursor: "pointer",
        outline: "none",
        transition: "border-color 0ms",
      }}
      className="focus:border-[#27272B] data-[state=open]:border-[#27272B]"
    >
      <SelectValue placeholder="All Projects">
        <span
          style={{
            display: "inline-block",
            minWidth: 64, 
            height: 16,
            fontFamily: "Rubik, sans-serif",
            fontWeight: 400,
            fontSize: 12,
            lineHeight: "16px",
            letterSpacing: "0px",
            color: "#000712",
            textAlign: "left",
          }}
        >
          {projectFilter}
        </span>
      </SelectValue>
    </SelectTrigger>
    
    <SelectContent
      sideOffset={4}
      style={{
        width: 170,
        borderRadius: 12,
        background: "#FFFFFF",
        border: "1px solid #F4F4F5",
        boxShadow: "0px 10px 25px -5px rgba(0, 0, 0, 0.05)",
        padding: "4px",
      }}
    >
      {dropdownOptions.map((opt) => (
        <SelectItem
          key={opt.value}
          value={opt.value}
          className="[&>span:first-child]:hidden"
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            outline: "none",
          }}
        >
          <span 
            style={{ 
              fontFamily: "Rubik, sans-serif",
              fontWeight: 400,
              fontSize: 12,
              lineHeight: "16px",
              color: projectFilter === opt.value ? "#000712" : "#71717A"
            }}
          >
            {opt.label}
          </span>

          {projectFilter === opt.value && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 18,
                height: 18,
                borderRadius: "50%",
                border: "1.5px solid #22C55E",
                background: "transparent",
                flexShrink: 0,
              }}
            >
              <Check size={11} color="#22C55E" strokeWidth={3} />
            </div>
          )}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>

  <button
    style={{
      width: 124,
      height: 40,
      opacity: 1,
      padding: "10px 10px 10px 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
      borderRadius: 16,
      border: "1px solid #E4E4E7",
      background: "#FFFFFF",
      cursor: "pointer",
      outline: "none",
      transition: "border-color 0ms",
    }}
    className="active:border-[#27272B] focus:border-[#27272B]"
  >
    {/* نص زر Newest بنفس الـ Tokens لـ All Projects */}
    <span
      style={{
        display: "inline-block",
        height: 16,
        fontFamily: "Rubik, sans-serif",
        fontWeight: 400,
        fontSize: 12,
        lineHeight: "16px",
        letterSpacing: "0px",
        color: "#000712",
        textAlign: "left",
      }}
    >
      Newest
    </span>
    <ChevronDown size={14} color="#71717A" />
  </button>
</div>
        </div>

        {/* Table */}
        <div style={{ width: 1312, marginTop: 24 }}>
          <ProjectsTable projects={filtered} />
        </div>

        {/* EXACT FIGMA POP-UP MODAL */}
        {addOpen && (
          <div
            role="dialog"
            aria-modal="true"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setAddOpen(false);
            }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0, 0, 0, 0.25)",
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
                boxShadow: "0px 12px 32px rgba(0, 0, 0, 0.08)",
                padding: "32px 32px 24px 32px",
                fontFamily: "Inter, sans-serif",
                boxSizing: "border-box",
                position: "relative",
              }}
            >
              {/* Header Title & Close Button */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 22,
                    color: "#111827",
                  }}
                >
                  New Project
                </div>

                <button
                  aria-label="Close"
                  onClick={() => setAddOpen(false)}
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: "#000000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Content */}
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                
                {/* Row 1: Project Name & Priority */}
                <div style={{ display: "flex", gap: 16 }}>
                  {/* Project Name Field */}
                  <div style={{ flex: 1, position: "relative" }}>
                    <label
                      style={{
                        position: "absolute",
                        left: 12,
                        top: -8,
                        background: "#FFFFFF",
                        padding: "0 4px",
                        fontSize: 10,
                        color: "#9CA3AF",
                        fontFamily: "Inter",
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

                  {/* Priority Dropdown Field */}
                  <div style={{ width: 160, position: "relative" }}>
                    <label
                      style={{
                        position: "absolute",
                        left: 12,
                        top: -8,
                        background: "#FFFFFF",
                        padding: "0 4px",
                        fontSize: 10,
                        color: "#9CA3AF",
                        fontFamily: "Inter",
                      }}
                    >
                      Priority
                    </label>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        border: "1px solid #E5E7EB",
                        borderRadius: 12,
                        padding: "12px 14px",
                        height: 44,
                        boxSizing: "border-box",
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ fontSize: 13, color: "#111827" }}>{priority}</span>
                      <ChevronDown size={14} color="#9CA3AF" />
                    </div>
                  </div>
                </div>

                {/* Row 2: Add Guests Input & Team Avatars */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ position: "relative" }}>
                    <label
                      style={{
                        position: "absolute",
                        left: 12,
                        top: -8,
                        background: "#FFFFFF",
                        padding: "0 4px",
                        fontSize: 10,
                        color: "#9CA3AF",
                        fontFamily: "Inter",
                      }}
                    >
                      Add Guests
                    </label>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        border: "1px solid #E5E7EB",
                        borderRadius: 12,
                        padding: "6px 6px 6px 14px",
                        height: 44,
                        boxSizing: "border-box",
                      }}
                    >
                      <input
                        type="text"
                        value={guestInput}
                        onChange={(e) => setGuestInput(e.target.value)}
                        style={{
                          border: "none",
                          outline: "none",
                          width: "70%",
                          fontSize: 13,
                          color: "#111827",
                        }}
                      />
                      <button
                        style={{
                          background: "#1F2937",
                          color: "#FFFFFF",
                          border: "none",
                          borderRadius: 8,
                          padding: "6px 12px",
                          fontSize: 12,
                          fontWeight: 500,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        Add <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Team Avatars Group */}
                  <div style={{ display: "flex", gap: 6, paddingLeft: 4 }}>
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60"
                      alt="Avatar 1"
                      style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover", border: "1.5px solid #fff", boxShadow: "0 0 0 1px #E5E7EB" }}
                    />
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60"
                      alt="Avatar 2"
                      style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover", border: "1.5px solid #fff", boxShadow: "0 0 0 1px #E5E7EB" }}
                    />
                  </div>
                </div>

                {/* Row 3: Start Date & End Date */}
                <div style={{ display: "flex", gap: 16 }}>
                  {/* Start Date */}
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: "1px solid #E5E7EB",
                      borderRadius: 12,
                      padding: "12px 14px",
                      height: 44,
                      boxSizing: "border-box",
                    }}
                  >
                    <span style={{ fontSize: 13, color: "#9CA3AF" }}>Start Date</span>
                    <Calendar size={16} color="#9CA3AF" />
                  </div>

                  {/* End Date */}
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: "1px solid #E5E7EB",
                      borderRadius: 12,
                      padding: "12px 14px",
                      height: 44,
                      boxSizing: "border-box",
                    }}
                  >
                    <span style={{ fontSize: 13, color: "#9CA3AF" }}>End Date</span>
                    <Calendar size={16} color="#9CA3AF" />
                  </div>
                </div>

                {/* Row 4: Drag and Drop Files Area */}
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
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      cursor: "pointer",
                      background: "#FFFFFF",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#9CA3AF", fontSize: 12 }}>
                      <Upload size={14} />
                      <span>Drag and drop files or click to upload</span>
                    </div>
                  </div>
                </div>

                {/* Primary Action Button */}
                <button
                  onClick={() => setAddOpen(false)}
                  style={{
                    width: "100%",
                    height: 44,
                    background: "#005AFB",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: 100,
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: "pointer",
                    marginTop: 4,
                  }}
                >
                  Add Project
                </button>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProjectsPage;
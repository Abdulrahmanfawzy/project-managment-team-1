import React from "react";
import { ChevronDown, Check, Search } from "lucide-react";
import type { Project } from "@/types/project";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DropdownOption {
  label: string;
  value: string;
}

interface ProjectsFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  projectFilter: string;
  onProjectFilterChange: (value: string) => void;
  dropdownOptions: DropdownOption[];
  projects: Project[];
}

const ProjectsFilters: React.FC<ProjectsFiltersProps> = ({
  search,
  onSearchChange,
  projectFilter,
  onProjectFilterChange,
  dropdownOptions,
  projects,
}) => {
  return (
    <div
      style={{
        width: 1312,
        height: 40,
        display: "flex",
        alignItems: "center",
        marginTop: 70,
      }}
    >
      {/* Search */}
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
          onChange={(e) => onSearchChange(e.target.value)}
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

      {/* Dropdowns */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginLeft: "auto",
        }}
      >
        <Select value={projectFilter} onValueChange={onProjectFilterChange}>
          <SelectTrigger
            style={{
              width: 124,
              height: 40,
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
            }}
            className="focus:border-[#27272B] data-[state=open]:border-[#27272B]"
          >
            <SelectValue placeholder="All Projects">
              <span
                style={{
                  fontFamily: "Rubik, sans-serif",
                  fontWeight: 400,
                  fontSize: 12,
                  color: "#000712",
                }}
              >
                {projectFilter === "All Projects"
                  ? "All Projects"
                  : projects.find((p) => p.id === projectFilter)?.name ??
                    projectFilter}
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
              boxShadow: "0px 10px 25px -5px rgba(0,0,0,0.05)",
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
                }}
              >
                <span
                  style={{
                    fontFamily: "Rubik, sans-serif",
                    fontWeight: 400,
                    fontSize: 12,
                    color: projectFilter === opt.value ? "#000712" : "#71717A",
                  }}
                >
                  {opt.label}
                </span>
                {projectFilter === opt.value && (
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      border: "1.5px solid #22C55E",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
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
            padding: "10px 10px 10px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
            borderRadius: 16,
            border: "1px solid #E4E4E7",
            background: "#FFFFFF",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              fontFamily: "Rubik, sans-serif",
              fontSize: 12,
              color: "#000712",
            }}
          >
            Newest
          </span>
          <ChevronDown size={14} color="#71717A" />
        </button>
      </div>
    </div>
  );
};

export default ProjectsFilters;
import React, { useMemo, useState } from "react";
import type { Project } from "@/types/project";
import ProjectsTable from "@/features/projects/ProjectsTable";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { useProjects } from "@/features/projects/hooks/useProjects";
import ProjectsPageHeader from "@/features/projects/components/ProjectsPageHeader";
import ProjectsFilters from "@/features/projects/components/ProjectsFilters";
import AddProjectModal from "@/features/projects/components/AddProjectModal";
import { Loader2 } from "lucide-react";

const AllProjectsPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [projectFilter, setProjectFilter] = useState<string>("All Projects");
  const [addOpen, setAddOpen] = useState(false);

  const { data: projects = [], isLoading, isError } = useProjects();

  const dropdownOptions = useMemo(
    () => [
      { label: "All Projects", value: "All Projects" },
      ...projects.map((p) => ({ label: p.name, value: p.id })),
    ],
    [projects],
  );

  const filtered = useMemo(() => {
    const base = projects.filter((p: Project) =>
      p.name.toLowerCase().includes(search.toLowerCase()),
    );
    if (projectFilter === "All Projects") return base;
    return base.filter((p) => p.id === projectFilter);
  }, [search, projectFilter, projects]);

  return (
    <DashboardLayout>
      <div
        style={{
          position: "relative",
          width: "100%",
          flex: 1,
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
          <ProjectsPageHeader onAddProjectClick={() => setAddOpen(true)} />

          <ProjectsFilters
            search={search}
            onSearchChange={setSearch}
            projectFilter={projectFilter}
            onProjectFilterChange={setProjectFilter}
            dropdownOptions={dropdownOptions}
            projects={projects}
          />

          <div style={{ width: 1312, marginTop: 24 }}>
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin text-[#005AFB]" size={32} />
              </div>
            ) : isError ? (
              <div className="flex items-center justify-center py-20 text-red-500 text-sm">
                Failed to load projects. Please try again.
              </div>
            ) : (
              <ProjectsTable projects={filtered} />
            )}
          </div>

          <AddProjectModal open={addOpen} onClose={() => setAddOpen(false)} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AllProjectsPage;
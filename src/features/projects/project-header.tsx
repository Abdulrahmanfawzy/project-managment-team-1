import { NavLink, useParams } from "react-router-dom";

import { cn } from "@/lib/utils";
import Breadcrumb from "@/components/shared/breadcrumb";

const tabs = [
  { label: "Overview", slug: "overview" },
  { label: "Tasks", slug: "tasks" },
  { label: "Teams", slug: "teams" },
  { label: "Files", slug: "files" },
];

export default function ProjectHeader() {
  const { projectId = "alpha" } = useParams();
  const projectName = projectId.charAt(0).toUpperCase() + projectId.slice(1);

  return (
    <div className="bg-white px-6 pt-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: "Projects", to: "/projects" },
              { label: projectName },
            ]}
          />

          {/* Title + completion badge */}
          <div className="mt-1 flex items-center gap-3">
            <h1 className="text-2xl font-bold text-text-h">{projectName}</h1>
            <span className="rounded-md bg-green-50 px-2 py-0.5 text-xs font-medium text-green-600">
              42% Completed
            </span>
          </div>
        </div>

        {/* Due date card */}
        <div className="w-64 rounded-xl bg-white p-3 ring-1 ring-slate-200/70">
          <p className="text-sm font-medium text-text-h">Due Date</p>
          <div className="my-2 h-1 w-full overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-2/3 rounded-full bg-brand" />
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Start Date: Oct 12</span>
            <span>Deadline: Dec 25</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-4 flex items-center gap-6 border-b border-slate-200">
        {tabs.map((tab) => (
          <NavLink
            key={tab.slug}
            to={`/projects/${projectId}/${tab.slug}`}
            className={({ isActive }) =>
              cn(
                "relative -mb-px pb-3 text-sm transition-colors",
                isActive
                  ? "font-medium text-brand"
                  : "text-muted-foreground hover:text-foreground"
              )
            }
          >
            {({ isActive }) => (
              <>
                {tab.label}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-brand" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

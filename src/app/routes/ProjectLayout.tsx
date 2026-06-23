import { Outlet } from "react-router-dom";

import DashboardLayout from "@/components/layout/dashboard-layout";
import ProjectHeader from "@/features/projects/project-header";

/**
 * Layout route for a single project. The project header (title + tabs) stays
 * mounted while the active tab's content swaps through <Outlet />.
 */
export default function ProjectLayout() {
  return (
    <DashboardLayout>
      <ProjectHeader />
      <main className="flex-1 px-6 py-6">
        <Outlet />
      </main>
    </DashboardLayout>
  );
}

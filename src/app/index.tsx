import { createBrowserRouter, Navigate } from "react-router-dom";

import KanbanBoard from "@/features/projects/tasks/kanban-board";
import ProjectTabPlaceholder from "@/features/projects/project-tab-placeholder";
import DashboardPage from "./routes/DashboardPage";
import PlaceholderPage from "./routes/PlaceholderPage";
import ProjectLayout from "./routes/ProjectLayout";
import TeamsSection from "@/features/projects/teams/teams-section";
export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/projects" replace /> },
  { path: "/dashboard", element: <DashboardPage /> },
  {
    path: "/projects",
    element: <Navigate to="/projects/alpha/tasks" replace />,
  },
  {
    path: "/projects/:projectId",
    element: <ProjectLayout />,
    children: [
      { index: true, element: <Navigate to="tasks" replace /> },
      { path: "overview", element: <ProjectTabPlaceholder title="Overview" /> },
      { path: "tasks", element: <KanbanBoard /> },
      { path: "teams", element: <TeamsSection /> },
      { path: "files", element: <ProjectTabPlaceholder title="Files" /> },
    ],
  },
  { path: "/tasks", element: <PlaceholderPage title="Tasks" /> },
  { path: "/chats", element: <PlaceholderPage title="Chats" /> },
  { path: "/meetings", element: <PlaceholderPage title="Meetings" /> },
  { path: "/reports", element: <PlaceholderPage title="Reports" /> },
  { path: "*", element: <PlaceholderPage title="Page not found" /> },
]);

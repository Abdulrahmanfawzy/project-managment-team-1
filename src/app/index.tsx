import { createBrowserRouter, Navigate } from "react-router-dom";

import KanbanBoard from "@/features/projects/tasks/kanban-board";
import AllProjectsPage from "./routes/AllProjectsPage";
import ProjectDetailsPage from "./routes/ProjectDetailsPage";
import DashboardPage from "./routes/DashboardPage";
import PlaceholderPage from "./routes/PlaceholderPage";
import ProjectLayout from "./routes/ProjectLayout";
import TeamsSection from "@/features/projects/teams/teams-section";
import FilesSection from "@/features/projects/files/FilesSection";
import TasksPage from "./routes/TasksPage";
import MainLayout from "@/components/layout/MainLayout";
import SignIn from "@/Auth/AuthPages/SignIn";
import SignUp from "@/Auth/AuthPages/SignUp";
import ForgotPassword from "@/Auth/AuthPages/ForgotPassword";
import ResetPassword from "@/Auth/AuthPages/ResetPassword";
import VerifyEmail from "@/Auth/AuthPages/VerifyEmail";
import ReportsPage from "./routes/ReportsPage";
import JoinMeetingPage from "@/features/meetings/JoinMeetingPage";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/signin" replace /> },
  {
    element: <MainLayout />,
    children: [
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/reset-password", element: <ResetPassword /> },
      { path: "/verify-email", element: <VerifyEmail /> },
    ],
  },
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/projects", element: <AllProjectsPage /> },
  {
    path: "/projects/:projectId",
    element: <ProjectLayout />,
    children: [
      { index: true, element: <Navigate to="overview" replace /> },
      { path: "overview", element: <ProjectDetailsPage /> },
      { path: "tasks", element: <KanbanBoard /> },
      { path: "teams", element: <TeamsSection /> },
      { path: "files", element: <FilesSection /> },
    ],
  },
  { path: "/tasks", element: <TasksPage /> },
  { path: "/chats", element: <PlaceholderPage title="Chats" /> },
  { path: "/meetings", element: <JoinMeetingPage /> },
  { path: "/reports", element: <ReportsPage /> },
  { path: "*", element: <PlaceholderPage title="Page not found" /> },
]);

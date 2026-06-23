import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AllProjectsPage from "@/pages/projects/AllProjectsPage";
import ProjectDetailsPage from "@/pages/projects/ProjectDetailsPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/projects" replace />} />
        <Route path="/projects" element={<AllProjectsPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
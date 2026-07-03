import { Navigate, Outlet } from "react-router-dom";
import { DEV_TOKEN } from "@/constants/token";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token") || DEV_TOKEN;
  
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}

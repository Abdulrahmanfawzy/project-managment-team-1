import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import SignIn from "../AuthPages/SignIn";
import SignUp from "../AuthPages/SignUp";
import ForgotPassword from "../AuthPages/ForgotPassword";
import ResetPassword from "../AuthPages/ResetPassword";
import VerifyEmail from "../AuthPages/VerifyEmail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="signin" replace /> },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "verify-email", element: <VerifyEmail /> },
    ],
  },
   //{path: "/dashboard", element: <DashboardPage />,},
]);
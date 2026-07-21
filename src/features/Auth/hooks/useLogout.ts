import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { logout as logoutApi } from "@/features/Auth/Api/auth.api";

/**
 * Logs the user out: invalidates the token server-side (DELETE /logout), then
 * clears the local token + React Query cache and redirects to the sign-in home.
 *
 * The local cleanup runs even if the API call fails — a logout should never
 * leave the user stuck in a signed-in state.
 */
export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await logoutApi();
      toast.success("You have successfully been logged out");
    } catch {
      // Ignore server errors — we still clear the session locally below.
    } finally {
      localStorage.removeItem("token");
      queryClient.clear();
      setIsLoggingOut(false);
      navigate("/");
    }
  };

  return { logout, isLoggingOut };
}

import { getDashboardStats } from "@/features/api/DashboardStats";
import { useQuery } from "@tanstack/react-query";
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: getDashboardStats,
  });
  
};
import { useQuery } from "@tanstack/react-query";
import { getDashboardFiles } from "../Api/Files";
export const useDashboardFiles = () => {
  return useQuery({
    queryKey: ["dashboardFiles"],
    queryFn: getDashboardFiles,
  });
};
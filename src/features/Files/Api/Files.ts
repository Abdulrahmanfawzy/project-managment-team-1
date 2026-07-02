import api from "@/lib/axios";

export const getDashboardFiles = async () => {
  const { data } = await api.get("/files");
  return data;
};
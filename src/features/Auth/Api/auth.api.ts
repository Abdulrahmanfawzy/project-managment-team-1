import axiosInstance from "@/services/AxiosConfig";

export const login = async (data: any) => {
  return await axiosInstance.post("/login", data);
};

export const registerUser = async (data: any) => {
  return await axiosInstance.post("/register", data);
};

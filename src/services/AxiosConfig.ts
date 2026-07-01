import axios from "axios";
import type { AxiosError } from "axios";
import { DEV_TOKEN } from "@/constants/token";


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    // No global Content-Type: axios sets it per request —
    // application/json for plain objects, multipart/form-data
    // (with boundary) for FormData.
    Accept: "application/json",
  },
});

// Attach the auth token to every outgoing request.
// Prefer a real logged-in token; fall back to the temporary DEV_TOKEN
// until the sign-in flow is ready.
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") || DEV_TOKEN;
    if (token) {
      config.headers.Authorization =`Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
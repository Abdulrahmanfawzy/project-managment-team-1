import axios from "axios";
import type { AxiosError } from "axios";
import { DEV_TOKEN } from "@/constants/token";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
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
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Handle global response errors (e.g. expired/invalid session).
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // Redirect to the sign-in page on unauthorized responses.
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;

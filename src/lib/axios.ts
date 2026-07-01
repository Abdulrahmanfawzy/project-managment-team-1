import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization =
    "Bearer 14|QAgcpu3cUCId6YeQeRKBk0e3fKRZIbYXus4bab0y621bfca0";
  return config;
});

export default api;
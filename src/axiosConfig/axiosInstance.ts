import { authAtom } from "@feature/Auth/atoms/auth-atom";
import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_Base_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = authAtom.value;

  if (token) {
    config.headers.token = token;
  }

  return config;
});

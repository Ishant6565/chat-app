import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const axiosInstance = axios.create({
  baseURL: backendUrl ? `${backendUrl.replace(/\/$/, '')}/api` : (import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api"),
  withCredentials: true,
});

import axios from "axios";

const axiosAuthClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL!,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

axiosAuthClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosAuthClient;

import axios from "axios";

const axiosS3Client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL!,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

axiosS3Client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosS3Client;

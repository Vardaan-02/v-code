import axios from "axios";

const axiosDockerClient = axios.create({
  baseURL: import.meta.env.VITE_DOCKER_BACKEND!,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

axiosDockerClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosDockerClient;

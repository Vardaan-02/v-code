import axiosBackendClient from "@/lib/axios-backend-client";
import type { LoginFormValues } from "@/types/auth";

export const login = async (payload: LoginFormValues) => {
  try {
    const response = await axiosBackendClient.post("/auth/login", payload);
    localStorage.setItem("token", response.data.user.refreshToken);
    return response.data;
  } catch (error) {
    console.error("❌ Failed to login:", error);
    throw error;
  }
};

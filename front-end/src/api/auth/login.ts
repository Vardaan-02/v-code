import axiosBackendClient from "@/lib/axios-backend-client";
import type { LoginFormValues } from "@/types/auth";

export const login = async (payload: LoginFormValues) => {
  try {
    console.log(payload);

    const response = await axiosBackendClient.post("/auth/login", payload);

    return response.data;
  } catch (error) {
    console.error("❌ Failed to login:", error);
    throw error;
  }
};

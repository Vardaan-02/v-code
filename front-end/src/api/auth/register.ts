import axiosBackendClient from "@/lib/axios-backend-client";
import type { SignupFormValues } from "@/types/auth";

export const register = async (payload: SignupFormValues) => {
  try {
    const response = await axiosBackendClient.post("/auth/register", payload);
    return response.data;
  } catch (error) {
    console.error("❌ Failed to register:", error);
    throw error;
  }
};

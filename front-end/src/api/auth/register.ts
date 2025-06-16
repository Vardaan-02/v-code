import axiosBackendClient from "@/lib/axios-backend-client";
import type { SignupFormValues } from "@/types/auth";

export const register = async (payload: SignupFormValues) => {
  try {
    console.log(payload);
    const response = await axiosBackendClient.post("/auth/register", payload);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Failed to register:", error);
    throw error;
  }
};

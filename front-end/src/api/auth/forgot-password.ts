
import axiosBackendClient from "@/lib/axios-backend-client";
import type { ForgotPasswordFormValues } from "@/types/auth";

export const forgotPassword = async (payload: ForgotPasswordFormValues) => {
  try {
    console.log(payload);
    const response = await axiosBackendClient.post("/auth/forgot-password", payload);
    return response.data;
  } catch (error) {
    console.error("❌ Failed to send verfication link:", error);
    throw error;
  }
};

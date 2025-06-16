import axiosAuthClient from "@/lib/axios-auth-client";
import type { ForgotPasswordFormValues } from "@/types/auth";

export const forgotPassword = async (payload: ForgotPasswordFormValues) => {
  try {
    console.log(payload);
    const response = await axiosAuthClient.post("/forgot-password", payload);
    return response.data;
  } catch (error) {
    console.error("❌ Failed to send verfication link:", error);
    throw error;
  }
};

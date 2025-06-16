import axiosBackendClient from "@/lib/axios-backend-client";
import type { ResetPasswordFormValues } from "@/types/auth";

export const resetPassword = async (payload: ResetPasswordFormValues) => {
  try {
    console.log(payload);
    const response = await axiosBackendClient.post(
      "/auth/reset-password",
      payload
    );

    return response.data;
  } catch (error) {
    console.error("❌ Failed to register:", error);
    throw error;
  }
};

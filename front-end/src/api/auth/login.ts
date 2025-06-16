import axiosAuthClient from "@/lib/axios-auth-client";
import type { LoginFormValues } from "@/types/auth";

export const login = async (payload: LoginFormValues) => {
  try {
    console.log(payload);

    const response = await axiosAuthClient.post(
      "/login",
      payload
    );

    return response.data;
  } catch (error) {
    console.error("❌ Failed to login:", error);
    throw error;
  }
};

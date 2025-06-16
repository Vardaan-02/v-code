import axiosAuthClient from "@/lib/axios-auth-client";
import type { SignupFormValues } from "@/types/auth";

export const register = async (payload: SignupFormValues) => {
  try {
    console.log(payload);
    const response = await axiosAuthClient.post("/register", payload);

    return response.data;
  } catch (error) {
    console.error("❌ Failed to register:", error);
    throw error;
  }
};

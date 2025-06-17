import axiosBackendClient from "@/lib/axios-backend-client";
import type { LoadFilePayload } from "@/types/file-system";

export const loadFile = async (payload: LoadFilePayload) => {
  const response = await axiosBackendClient.post("/editor/load-file", payload);
  return response.data.content;
};

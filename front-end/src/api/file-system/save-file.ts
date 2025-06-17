import axiosBackendClient from "@/lib/axios-backend-client";
import type { SaveFilePayload } from "@/types/file-system";

export const saveFile = async (payload: SaveFilePayload) => {
  const response = await axiosBackendClient.post("/editor/save-file", payload);
  return response.data;
};

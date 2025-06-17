import axiosDockerClient from "@/lib/axios-docker-client";
import type { SyncFilePayload } from "@/types/file-system";

export const syncFile = async (payload: SyncFilePayload) => {
  const response = await axiosDockerClient.post("/folder-structure/s3-backend-mismatch", payload);
  return response.data;
};

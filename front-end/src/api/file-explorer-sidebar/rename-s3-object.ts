import axiosBackendClient from "@/lib/axios-backend-client";
import type { RenameS3ObjectPayload } from "@/types/file-structure";

export const renameS3Object = async (payload: RenameS3ObjectPayload) => {
  const response = await axiosBackendClient.put("/sidebar/edit-s3-object", payload);
  return response.data;
};

import axiosClient from "@/lib/axios-client";
import type { RenameS3ObjectPayload } from "@/types/file-structure";

export const renameS3Object = async (payload: RenameS3ObjectPayload) => {
  const response = await axiosClient.put("/sidebar/edit-s3-object", payload);
  return response.data;
};

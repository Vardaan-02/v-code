import axiosS3Client from "@/lib/axios-s3-client";
import type { RenameS3ObjectPayload } from "@/types/file-structure";

export const renameS3Object = async (payload: RenameS3ObjectPayload) => {
  const response = await axiosS3Client.put("/sidebar/edit-s3-object", payload);
  return response.data;
};

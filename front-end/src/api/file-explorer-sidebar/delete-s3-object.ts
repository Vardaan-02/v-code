import axiosClient from "@/lib/axios-client";
import type { DeleteS3ObjectPayload } from "@/types/file-structure";

export const deleteS3Object = async (payload: DeleteS3ObjectPayload) => {
  const response = await axiosClient.put("/sidebar/delete-s3-object", payload);
  return response.data;
};

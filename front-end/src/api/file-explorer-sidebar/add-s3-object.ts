import axiosClient from "@/lib/axios-client";
import type { AddS3ObjectPayload } from "@/types/file-structure";

export const addS3Object = async (payload: AddS3ObjectPayload) => {
  const response = await axiosClient.post("/sidebar/add-s3-object", payload);
  return response.data;
};

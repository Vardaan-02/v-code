import axiosBackendClient from "@/lib/axios-backend-client";
import axiosS3Client from "@/lib/axios-s3-client";
import type { AddS3ObjectPayload } from "@/types/file-structure";

export const addS3Object = async (payload: AddS3ObjectPayload) => {
  try {
    const s3Response = await axiosS3Client.post("/sidebar/add-s3-object", payload);
    const backendResponse = await axiosBackendClient.post("/folder-structure/add-file-folder", payload);

    console.log("📦 S3 Response:", s3Response.data);
    console.log("🗂️ Backend Response:", backendResponse.data);

    return {
      s3: s3Response.data,
      backend: backendResponse.data,
    };
  } catch (error) {
    console.error("❌ Failed to add object to S3 or backend:", error);
    throw error;
  }
};

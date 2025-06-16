import axiosBackendClient from "@/lib/axios-backend-client";
import axiosS3Client from "@/lib/axios-s3-client";
import type { DeleteS3ObjectPayload } from "@/types/file-structure";

export const deleteS3Object = async (payload: DeleteS3ObjectPayload) => {
  try {
    const s3Response = await axiosS3Client.put("/sidebar/delete-s3-object", payload);
    const backendResponse = await axiosBackendClient.post("/folder-structure/delete-file-folder", payload);

    return {
      s3: s3Response.data,
      backend: backendResponse.data,
    };
  } catch (error) {
    console.error("❌ Failed to delete S3 object or backend file:", error);
    throw error;
  }
};

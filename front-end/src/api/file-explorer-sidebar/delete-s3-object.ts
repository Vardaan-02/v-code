import axiosBackendClient from "@/lib/axios-backend-client";
import axiosDockerClient from "@/lib/axios-docker-client";
import type { DeleteS3ObjectPayload } from "@/types/file-structure";

export const deleteS3Object = async (payload: DeleteS3ObjectPayload) => {
  try {
    const backendResponse = await axiosBackendClient.put("/sidebar/delete-s3-object", payload);
    const dockerResponse = await axiosDockerClient.post("/folder-structure/delete-file-folder", payload);

    return {
      s3: backendResponse.data,
      docker: dockerResponse.data,
    };
  } catch (error) {
    console.error("❌ Failed to delete S3 object or backend file:", error);
    throw error;
  }
};

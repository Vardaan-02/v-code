import axiosBackendClient from "@/lib/axios-backend-client";
import axiosDockerClient from "@/lib/axios-docker-client";
import type { AddS3ObjectPayload } from "@/types/file-structure";

export const addS3Object = async (payload: AddS3ObjectPayload) => {
  try {
    const backendResponse = await axiosBackendClient.post("/sidebar/add-s3-object", payload);
    const dockerResponse = await axiosDockerClient.post("/folder-structure/add-file-folder", payload);

    return {
      s3: backendResponse.data,
      backend: dockerResponse.data,
    };
  } catch (error) {
    console.error("❌ Failed to add object to S3 or backend:", error);
    throw error;
  }
};

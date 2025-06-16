import axiosS3Client from "@/lib/axios-s3-client";
import type { FileNode } from "@/types/file-structure";

export const getFolderStructure = async (): Promise<FileNode[]> => {
  const response = await axiosS3Client.get<FileNode[]>("sidebar/get-folder-structure/tree");
  return response.data;
};

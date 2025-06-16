import axiosBackendClient from "@/lib/axios-backend-client";
import type { FileNode } from "@/types/file-structure";

export const getFolderStructure = async (): Promise<FileNode[]> => {
  const response = await axiosBackendClient.get<FileNode[]>("sidebar/get-folder-structure/tree");
  return response.data;
};

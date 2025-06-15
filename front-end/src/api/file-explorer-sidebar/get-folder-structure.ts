import axiosClient from "@/lib/axios-client";
import type { FileNode } from "@/types/file-structure";

export const getFolderStructure = async (): Promise<FileNode[]> => {
  const response = await axiosClient.get<FileNode[]>("sidebar/get-folder-structure/tree");
  return response.data;
};

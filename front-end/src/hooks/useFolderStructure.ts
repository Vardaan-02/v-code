import { useQuery } from "@tanstack/react-query";
import { getFolderStructure } from "@/api/file-explorer-sidebar/get-folder-structure";

export const useFolderStructure = () => {
  return useQuery({
    queryKey: ["folder-structure"],
    queryFn: getFolderStructure,
    staleTime: 0,
    retry: 1,
  });
};



import { useQuery } from "@tanstack/react-query";
import { getFolderStructure } from "@/api/code-area/get-folder-structure";

export const useFolderStructure = () => {
  return useQuery({
    queryKey: ["folder-structure"],
    queryFn: getFolderStructure,
    staleTime: Infinity,
    retry: 1,
  });
};

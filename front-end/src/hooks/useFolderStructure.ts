import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFolderStructure } from "@/api/file-explorer-sidebar/get-folder-structure";

export const useFolderStructure = () => {
  return useQuery({
    queryKey: ["folder-structure"],
    queryFn: getFolderStructure,
    staleTime: 0,
    retry: 1,
  });
};

export const useRefreshFolderStructure = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: getFolderStructure,
    onSuccess: (data) => {
      queryClient.setQueryData(["folder-structure"], data);
    },
  });
};

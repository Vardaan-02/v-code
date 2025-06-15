import { getFolderStructure } from "@/api/file-explorer-sidebar/get-folder-structure";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRefreshFolderStructure = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: getFolderStructure,
    onSuccess: (data) => {
      queryClient.setQueryData(["folder-structure"], data);
    },
  });
};
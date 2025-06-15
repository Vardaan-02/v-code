import { useMutation, useQueryClient } from "@tanstack/react-query";
import { renameS3Object } from "@/api/file-explorer-sidebar/rename-s3-object";

export const useRenameS3Object = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: renameS3Object,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folder-structure"] });
    },
    onError: (error) => {
      console.error("❌ Failed to add S3 object", error);
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteS3Object } from "@/api/file-explorer-sidebar/delete-s3-object";

export const useDeleteS3Object = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteS3Object,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folder-structure"] });
    },
    onError: (error) => {
      console.error("❌ Failed to add S3 object", error);
    },
  });
};

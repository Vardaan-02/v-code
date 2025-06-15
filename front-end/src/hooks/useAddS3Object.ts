import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addS3Object } from "@/api/file-explorer-sidebar/add-s3-object";

export const useAddS3Object = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addS3Object,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folder-structure"] });
    },
    onError: (error) => {
      console.error("❌ Failed to add S3 object", error);
    },
  });
};

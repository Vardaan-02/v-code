import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addS3Object } from "@/api/file-explorer-sidebar/add-s3-object";
import { deleteS3Object } from "@/api/file-explorer-sidebar/delete-s3-object";
import { renameS3Object } from "@/api/file-explorer-sidebar/rename-s3-object";
import { useFileTree } from "@/contexts/file-tree-context";

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

export const useDeleteS3Object = () => {
  const { setSelectedNode } = useFileTree();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteS3Object,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folder-structure"] });
      setSelectedNode(null);
    },
    onError: (error) => {
      console.error("❌ Failed to add S3 object", error);
    },
  });
};

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

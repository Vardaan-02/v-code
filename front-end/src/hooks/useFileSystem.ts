import { loadFile } from "@/api/file-system/load-file";
import { syncFile } from "@/api/file-system/s3-docker-sync";
import { saveFile } from "@/api/file-system/save-file";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSaveFile = () => {
  return useMutation({
    mutationFn: saveFile,
    onSuccess: () => {
      toast.success("File Saved");
    },
    onError: (error) => {
      console.error("❌ Failed to save file", error);
      toast.error("Couldn't Save File");
    },
  });
};

export const useLoadFile = () => {
  return useMutation({
    mutationFn: loadFile,
    onError: () => {
      toast.error("Failed to lode File");
    },
  });
};

export const useSyncFile = () => {
  return useMutation({
    mutationFn: syncFile,

    onError: () => {
      toast.error("Couldn't Load File Properly");
    },
  });
};

import type React from "react";
import { createContext, useContext, useState, useCallback } from "react";
import type { FileNode, FileTreeContextType } from "@/types/file-structure";
// import {
//   parseS3ObjectsToTree,
//   updateNodeInTree,
//   removeNodeFromTree,
//   addNodeToTree,
// } from "@/lib/file-tree-utils";
// import { toast } from "sonner";

const FileTreeContext = createContext<FileTreeContextType | undefined>(
  undefined
);

export function useFileTree() {
  const context = useContext(FileTreeContext);
  if (!context) {
    throw new Error("useFileTree must be used within a FileTreeProvider");
  }
  return context;
}

interface FileTreeProviderProps {
  children: React.ReactNode;
  initialPaths: FileNode[];
}

export function FileTreeProvider({
  children,
  initialPaths
}: FileTreeProviderProps) {
  const [tree, setTree] = useState<FileNode[]>(initialPaths);
  const [selectedNode, setSelectedNode] = useState<FileNode | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const toggleExpanded = useCallback((nodeId: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  }, []);

  const refreshTree = useCallback(async () => {
    // try {
    //   const objects = await S3Service.listObjects("dummy-test/")
    //   const newTree = parseS3ObjectsToTree(objects)
    //   setTree(newTree)
    // } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: "Failed to refresh file tree",
    //     variant: "destructive",
    //   })
    // }
  }, []);

  const createFolder = useCallback(async (parentPath: string, name: string) => {
    // try {
    //   const folderPath = parentPath ? `${parentPath}/${name}` : name
    //   await S3Service.createFolder(folderPath)
    //   const newNode: FileNode = {
    //     id: folderPath,
    //     name,
    //     path: folderPath,
    //     type: "folder",
    //     children: [],
    //     isExpanded: false,
    //   }
    //   setTree((prev) => addNodeToTree(prev, parentPath, newNode))
    //   toast({
    //     title: "Success",
    //     description: `Folder "${name}" created successfully`,
    //   })
    // } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: "Failed to create folder",
    //     variant: "destructive",
    //   })
    // }
  }, []);

  const createFile = useCallback(async (parentPath: string, name: string) => {
    // try {
    //   const filePath = parentPath ? `${parentPath}/${name}` : name
    //   await S3Service.createFile(filePath)
    //   const newNode: FileNode = {
    //     id: filePath,
    //     name,
    //     path: filePath,
    //     type: "file",
    //     size: 0,
    //     lastModified: new Date(),
    //   }
    //   setTree((prev) => addNodeToTree(prev, parentPath, newNode))
    //   toast({
    //     title: "Success",
    //     description: `File "${name}" created successfully`,
    //   })
    // } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: "Failed to create file",
    //     variant: "destructive",
    //   })
    // }
  }, []);

  const renameNode = useCallback(async (node: FileNode, newName: string) => {
    // try {
    //   const pathParts = node.path.split("/")
    //   pathParts[pathParts.length - 1] = newName
    //   const newPath = pathParts.join("/")
    //   await S3Service.renameObject(node.path, newPath)
    //   setTree((prev) =>
    //     updateNodeInTree(prev, node.path, {
    //       name: newName,
    //       path: newPath,
    //       id: newPath,
    //     }),
    //   )
    //   toast({
    //     title: "Success",
    //     description: `${node.type === "folder" ? "Folder" : "File"} renamed successfully`,
    //   })
    // } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: "Failed to rename item",
    //     variant: "destructive",
    //   })
    // }
  }, []);

  const deleteNode = useCallback(
    async (node: FileNode) => {
      //   try {
      //     if (node.type === "folder") {
      //       await S3Service.deleteFolder(node.path)
      //     } else {
      //       await S3Service.deleteObject(node.path)
      //     }
      //     setTree((prev) => removeNodeFromTree(prev, node.path))
      //     if (selectedNode?.path === node.path) {
      //       setSelectedNode(null)
      //     }
      //     toast({
      //       title: "Success",
      //       description: `${node.type === "folder" ? "Folder" : "File"} deleted successfully`,
      //     })
      //   } catch (error) {
      //     toast({
      //       title: "Error",
      //       description: "Failed to delete item",
      //       variant: "destructive",
      //     })
      //   }
    },
    []
  );

  const value: FileTreeContextType = {
    tree,
    setTree,
    selectedNode,
    setSelectedNode,
    expandedNodes,
    toggleExpanded,
    createFolder,
    createFile,
    renameNode,
    deleteNode,
    refreshTree,
  };

  return (
    <FileTreeContext.Provider value={value}>
      {children}
    </FileTreeContext.Provider>
  );
}

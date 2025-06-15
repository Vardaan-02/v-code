import type React from "react";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import type { FileNode, FileTreeContextType } from "@/types/file-structure";

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
  initialPaths,
}: FileTreeProviderProps) {
  const [tree, setTree] = useState<FileNode[]>(initialPaths);
  const [selectedNode, setSelectedNode] = useState<FileNode | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectingNode, setSelectingNode] = useState<boolean>(false);

  useEffect(() => {
    setTree(initialPaths);
  }, [initialPaths]);

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

  const value: FileTreeContextType = {
    tree,
    setTree,
    selectedNode,
    setSelectedNode,
    expandedNodes,
    toggleExpanded,
    selectingNode,
    setSelectingNode,
  };

  return (
    <FileTreeContext.Provider value={value}>
      {children}
    </FileTreeContext.Provider>
  );
}

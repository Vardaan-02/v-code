import type { Socket } from "socket.io-client";

export interface FileNode {
  name: string;
  path: string;
  type: "file" | "folder";
  children?: FileNode[];
  isExpanded?: boolean;
}

export interface S3Object {
  Key: string;
  Size?: number;
  LastModified?: Date;
}

export interface FileTreeContextType {
  tree: FileNode[];
  setTree: (tree: FileNode[]) => void;
  selectedNode: FileNode | null;
  setSelectedNode: (node: FileNode | null) => void;
  expandedNodes: Set<string>;
  toggleExpanded: (nodeId: string) => void;
  selectingNode: boolean;
  setSelectingNode: (value: boolean) => void;
  code: string;
  setCode: (value: string) => void;
  language: string;
  setLanguage: (value: string) => void;
  socketS3: Socket | null;
  socketDocker: Socket | null;
}

export interface AddS3ObjectPayload {
  path: string;
  type: "file" | "folder";
  content?: string;
}

export interface RenameS3ObjectPayload {
  name: string;
  path: string;
}

export interface DeleteS3ObjectPayload {
  path: string;
  type: "file" | "folder";
}

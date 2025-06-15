export interface FileNode {
  id: string
  name: string
  path: string
  type: "file" | "folder"
  children?: FileNode[]
  size?: number
  lastModified?: Date
  isExpanded?: boolean
}

export interface S3Object {
  Key: string
  Size?: number
  LastModified?: Date
}

export interface FileTreeContextType {
  tree: FileNode[]
  setTree: (tree: FileNode[]) => void
  selectedNode: FileNode | null
  setSelectedNode: (node: FileNode | null) => void
  expandedNodes: Set<string>
  toggleExpanded: (nodeId: string) => void
}

export interface AddS3ObjectPayload {
  path: string;
  type: "file" | "folder";
}

export interface RenameS3ObjectPayload {
  name: string;
  path: string;
}

export interface DeleteS3ObjectPayload {
  path: string;
}
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
  createFolder: (parentPath: string, name: string) => Promise<void>
  createFile: (parentPath: string, name: string) => Promise<void>
  renameNode: (node: FileNode, newName: string) => Promise<void>
  deleteNode: (node: FileNode) => Promise<void>
  refreshTree: () => Promise<void>
}

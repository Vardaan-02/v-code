export interface FileNode {
  id: string;
  name: string;
  path: string;
  type: "file" | "folder";
  children?: FileNode[];
  size?: number;
  lastModified?: Date;
  isExpanded?: boolean;
  childrenMap?: { [key: string]: FileNode };
}
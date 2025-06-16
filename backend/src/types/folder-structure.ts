export interface FileNode {
  name:string;
  path: string;
  type: "file" | "folder";
  children?: FileNode[];
  isSelected: boolean;
  isExpanded?: boolean;
}
import { promises as fs } from "fs";
import path from "path";
import { FileNode } from "../types/folder-structure";

export async function generateFileTree(directory: string): Promise<FileNode[]> {
  async function buildTree(dirPath: string): Promise<FileNode[]> {
    const entries = await fs.readdir(dirPath);

    const result: FileNode[] = [];

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry);
      const stat = await fs.stat(fullPath);

      if (stat.isDirectory()) {
        const children = await buildTree(fullPath);
        result.push({
          name: entry,
          path: fullPath,
          type: "folder",
          children,
          isExpanded: false,
          isSelected: false,
        });
      } else {
        result.push({
          name: entry,
          path: fullPath,
          type: "file",
          isSelected: false,
        });
      }
    }

    return result;
  }

  return buildTree(directory);
}

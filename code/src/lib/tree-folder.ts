import { FileNode } from "../types/file-structure";
import { S3Object } from "../types/s3object";

export function parseS3ObjectToTree(objects: S3Object[]): FileNode[] {
  const root: Record<string, FileNode> = {};

  for (const obj of objects) {
    if (!obj.key) continue; 

    const parts = obj.key.split("/").filter(Boolean);
    let currentLevel = root;
    let fullPath = "";

    parts.forEach((part, index) => {
      const isLast = index === parts.length - 1;
      const isFolder = obj.key.endsWith("/") && isLast;
      const isFile = !obj.key.endsWith("/") && isLast;

      fullPath += (index === 0 ? "" : "/") + part;

      if (!currentLevel[part]) {
        const newNode: FileNode = {
          id: fullPath,
          name: part,
          path: fullPath,
          type: isFile ? "file" : "folder",
          isExpanded: false,
        };

        if (isFile) {
          newNode.size = obj.size;
          newNode.lastModified = new Date(obj.lastModified as Date);
        } else {
          newNode.children = [];
          newNode.childrenMap = {};
        }

        currentLevel[part] = newNode;
      }

      if (!isFile) {
        currentLevel = currentLevel[part].childrenMap!;
      }
    });
  }

  const normalize = (nodeMap: Record<string, FileNode>): FileNode[] =>
    Object.values(nodeMap).map((node) => {
      if (node.type === "folder" && node.childrenMap) {
        const normalizedChildren = normalize(node.childrenMap);
        node.children = normalizedChildren;
        delete node.childrenMap;
      }
      return node;
    });

  return normalize(root);
}

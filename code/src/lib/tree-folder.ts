import { FileNode } from "../types/file-structure";
import { S3Object } from "../types/s3object";

export function parseS3ObjectsToTree(objects: S3Object[]): FileNode[] {
  const root: { [key: string]: FileNode } = {};

  objects.forEach((obj) => {
    if (!obj.key) return;

    const parts = obj.key.split("/").filter(Boolean);
    let currentLevel = root;
    let currentPath = "";

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1;
      currentPath = currentPath ? `${currentPath}/${part}` : part;

      if (!currentLevel[part]) {
        const newNode: FileNode = {
          id: currentPath,
          name: part,
          path: currentPath,
          type: isFile ? "file" : "folder",
          children: isFile ? undefined : [],
          size: isFile ? obj.size : undefined,
          lastModified: isFile ? obj.lastModified : undefined,
          isExpanded: false,
          childrenMap: isFile ? undefined : {},
        };

        currentLevel[part] = newNode;
      }

      if (!isFile) {
        if (!currentLevel[part].childrenMap) {
          currentLevel[part].childrenMap = {};
        }
        currentLevel = currentLevel[part].childrenMap!;
      }
    }
  });

  const convertToChildrenArray = (nodeMap: {
    [key: string]: FileNode;
  }): FileNode[] => {
    return Object.values(nodeMap)
      .map((node) => {
        if (node.type === "folder" && node.childrenMap) {
          node.children = convertToChildrenArray(node.childrenMap);
          delete node.childrenMap;
        }
        return node;
      })
      .sort((a, b) => {
        if (a.type !== b.type) return a.type === "folder" ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
  };

  return convertToChildrenArray(root);
}

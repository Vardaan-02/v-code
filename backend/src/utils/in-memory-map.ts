import fs from "fs/promises";
import { MonacoDelta } from "../types/delta";

const fileMap = new Map<string, string>();

export async function loadFileToMap(filePath: string): Promise<string> {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    fileMap.set(filePath, content);
    return content;
  } catch {
    fileMap.set(filePath, "");
    return "";
  }
}

export function getFileContent(filePath: string): string {
  return fileMap.get(filePath) ?? "";
}

export function setFileContent(filePath: string, content: string) {
  fileMap.set(filePath, content);
}

export function applyDeltaToFile(filePath: string, delta: MonacoDelta) {
  const oldContent = fileMap.get(filePath) ?? "";

  const startOffset = delta.rangeOffset;
  const endOffset = delta.rangeOffset + delta.rangeLength;

  const textToInsert = Array.isArray(delta.text)
    ? delta.text.join("\n")
    : delta.text;

  const newContent =
    oldContent.slice(0, startOffset) +
    textToInsert +
    oldContent.slice(endOffset);

  fileMap.set(filePath, newContent);
}


export function removeFileFromMap(filePath: string) {
  fileMap.delete(filePath);
}

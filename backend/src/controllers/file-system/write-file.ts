import { Request, Response } from "express";
import path from "path";
import { promises as fs } from "fs";
import { setFileContent } from "../../utils/in-memory-map";

export default async function writeLocalFile(req: Request, res: Response) {
  const { path: relativePath, content } = req.body;

  if (!relativePath || content === undefined) {
    res.status(400).json({ message: "Path and content are required." });
    return;
  }

  const finalPath = path.resolve(process.env.ACTUAL_PATH!, relativePath);

  try {
    await fs.mkdir(path.dirname(finalPath), { recursive: true });

    await fs.writeFile(finalPath, content);
    setFileContent(finalPath, content);

    res.status(200).json({
      message: `File written successfully ✅`,
      path: finalPath,
    });
  } catch (err) {
    console.error("❌ Error writing file:", err);
    res.status(500).json({ message: "Failed to write file", error: err });
  }
}

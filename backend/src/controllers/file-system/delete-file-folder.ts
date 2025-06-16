import { Request, Response } from "express";
import path from "path";
import { promises as fs } from "fs";

export default async function deleteLocalObject(req: Request, res: Response) {
  const { path: relativePath, type } = req.body;

  if (!relativePath || !type) {
    res.status(400).json({ message: "Path and type are required." });
    return;
  }

  const finalPath = path.resolve(process.env.ACTUAL_PATH!, relativePath);
  console.log("🧹 Deleting:", finalPath, type);

  try {
    const stat = await fs.lstat(finalPath);

    if (type === "folder") {
      if (!stat.isDirectory()) {
        res.status(400).json({ message: "Not a folder." });
        return;
      }
      await fs.rm(finalPath, { recursive: true, force: true });
    } else {
      if (!stat.isFile()) {
        res.status(400).json({ message: "Not a file." });
        return;
      }
      await fs.unlink(finalPath);
    }

    res.status(200).json({
      message: `${type} deleted successfully ✅`,
      path: finalPath,
    });
    return;
  } catch (err: any) {
    if (err.code === "ENOENT") {
      res.status(200).json({
        message: `${type} already deleted ✅`,
        path: finalPath,
      });
      return;
    }

    console.error("❌ Error deleting local object:", err);
    res.status(500).json({
      message: "Failed to delete object",
      error: err.message,
    });
    return;
  }
}

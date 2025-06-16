import { Request, Response } from "express";
import path from "path";
import { promises as fs } from "fs";

export default async function addLocalObject(req: Request, res: Response) {
  const { path: relativePath, type } = req.body;

  if (!relativePath || !type) {
    res.status(400).json({ message: "Path and type are required." });
    return;
  }

  const finalPath = path.resolve(process.env.ACTUAL_PATH!, relativePath);

  try {
    if (type === "folder") {
      await fs.mkdir(finalPath, { recursive: true });
    } else {
      await fs.mkdir(path.dirname(finalPath), { recursive: true });
      await fs.writeFile(finalPath, ""); // Creates empty file
    }

    res.status(200).json({
      message: `${type} created successfully ✅`,
      path: finalPath,
    });
  } catch (err) {
    console.error("❌ Error creating local object:", err);
    res.status(500).json({ message: "Failed to create object", error: err });
  }
}

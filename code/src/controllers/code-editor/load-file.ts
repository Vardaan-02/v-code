import { Request, Response } from "express";
import dotenv from "dotenv";
import { s3 } from "../../lib/s3-service";
import { project } from "../../dummy-data";

dotenv.config();

const bucket = process.env.AWS_BUCKET_NAME!;

export const loadFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, path } = req.body;
    const { name } = project;

    if (!username || !name || !path) {
      res
        .status(400)
        .json({ message: "Missing username, projectName, or path" });
      return;
    }

    const finalPath = `users/${username}/${name}/${path}`;

    const s3Object = await s3
      .getObject({
        Bucket: bucket,
        Key: finalPath,
      })
      .promise();

    const fileContent = s3Object.Body?.toString("utf-8") ?? "";

    res.status(200).json({ content: fileContent });
  } catch (error) {
    console.error("❌ Error fetching file from S3:", error);
    res.status(500).json({ message: "Failed to load file" });
  }
};

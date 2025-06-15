import { Request, Response } from "express";
import dotenv from "dotenv";
import { s3 } from "../../lib/s3-service";
import { project, user } from "../../dummy-data";

dotenv.config();

export default async function editFileData(req: Request, res: Response) {
  const { username } = user;
  const { name } = project;
  const { path, content } = req.body;

  if (!path) {
    res.status(400).json({ message: "Missing path or content" });
    return;
  }

  const finalPath = `users/${username}/${name}/${path}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: finalPath,
    Body: content,
    ContentType: "text/plain",
  };

  try {
    await s3.putObject(params).promise();
    res.status(200).json({ message: "✅ File updated successfully" });
    return;
  } catch (error) {
    console.error("❌ Error uploading to S3:", error);
    res.status(500).json({ message: "Failed to update file on S3" });
    return;
  }
}

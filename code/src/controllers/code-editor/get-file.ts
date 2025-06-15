import { Request, Response } from "express";
import dotenv from "dotenv";
import { s3 } from "../../lib/s3-service";
import { project, user } from "../../dummy-data";

dotenv.config();

const bucket = process.env.AWS_BUCKET_NAME!;

export default async function getData(req: Request, res: Response) {
  const { username } = user;
  const { name } = project;
  const path = req.query.path as string;

  if (!path) {
    res.status(400).json({ error: "Missing path in query params" });
    return;
  }

    const finalPath = `users/${username}/${name}/${path}`;

  try {
    const s3Object = await s3
      .getObject({
        Bucket: bucket,
        Key: finalPath,
      })
      .promise();

    const fileContent = s3Object.Body?.toString("utf-8") ?? "";

    res.status(200).json({ content: fileContent });
    return;
  } catch (error) {
    console.error("Error fetching file from S3:", error);
    res.status(500).json({ error: "Failed to load file" });
  }
}

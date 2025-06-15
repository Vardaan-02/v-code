import { Request, Response } from "express";
import { s3 } from "../../lib/s3-service";
import dotenv from "dotenv";
import { project, user } from "../../dummy-data";

dotenv.config();

interface RenameS3ObjectPayload {
  name: string;
  path: string;
}

export default async function deleteS3Object(req: Request, res: Response) {
  const { username } = user;
  const { name: project_name } = project;
  const bucket = process.env.AWS_BUCKET_NAME!;
  const { path }: RenameS3ObjectPayload = req.body;

  if (!path) {
    res.status(400).json({ message: "Missing name or path in request body" });
    return;
  }

  const finalPath = `users/${username}/${project_name}/${path}`;

  console.log(finalPath);

  try {
    await s3
      .deleteObject({
        Bucket: bucket,
        Key: finalPath,
      })
      .promise();

    res.status(200).json({
      message: "File delete successfully",
    });
    return;
  } catch (err) {
    console.log("path : " + finalPath);
    console.error("S3 Rename Error:", err);
    res.status(500).json({ message: "Failed to rename file", error: err });
    return;
  }
}

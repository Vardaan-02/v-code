import { Request, Response } from "express";
import { s3 } from "../../lib/s3-service";
import dotenv from "dotenv";

dotenv.config();

export default async function getFolderStructureList(
  req: Request,
  res: Response
) {
  const { username } = req.body;
  const bucket = process.env.AWS_BUCKET_NAME!;
  const prefix = `users/${username}/VCode`;

  try {
    const data = await s3
      .listObjectsV2({
        Bucket: bucket,
        Prefix: prefix,
      })
      .promise();

    const contents = data.Contents;

    if (!contents) {
      res.json([]);
      return;
    }

    const final = contents.map((obj) => {
      const parts = obj.Key!.split("/").slice(3);
      return {
        key: parts.join("/"),
        lastModified: obj.LastModified,
        size: obj.Size,
      };
    });

    res.json(final);
  } catch (err) {
    console.error("Error fetching S3 folder structure:", err);
    res.status(500).json({ error: "Failed to get S3 folder structure" });
  }
}

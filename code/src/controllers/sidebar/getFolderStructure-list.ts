import { Request, Response } from "express";
import { s3 } from "../../lib/s3-service";
import dotenv from "dotenv";
import { parseS3ObjectsToTree } from "../../lib/tree-folder";
import { S3Object } from "../../types/s3object";

dotenv.config();

export default async function getFolderStructureList(req: Request, res: Response) {
  const bucket = process.env.AWS_BUCKET_NAME!;
  const prefix = "users/Vardaan02/VCode";

  try {
    const data = await s3
      .listObjectsV2({
        Bucket: bucket,
        Prefix: prefix,
      })
      .promise();

    const contents = data.Contents;

    if(!contents){
        res.json([]);
        return;
    }

    const final = contents.map(obj => {
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

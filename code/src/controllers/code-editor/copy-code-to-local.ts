import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { s3 } from "../../lib/s3-service";
import { project, user } from "../../dummy-data";

export const copyCodeToLocal = async (req: Request, res: Response) => {
  const { username } = user;
  const { name } = project;

  const localDir = path.resolve(__dirname, process.env.COPY_DIST!);
  const finalPath = `users/${username}/${name}/`;

  console.log(`📁 Local target: ${localDir}`);
  console.log(`🌐 S3 prefix: ${finalPath}`);

  try {
    if (fs.existsSync(localDir)) {
      fs.rmSync(localDir, { recursive: true, force: true });
      console.log("🗑️ Cleaned up previous local directory");
    }

    const listParams = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Prefix: finalPath,
    };

    const listedObjects = await s3.listObjectsV2(listParams).promise();

    if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
      res.status(404).json({ error: "No files found under that prefix." });
      return;
    }

    for (const obj of listedObjects.Contents) {
      const key = obj.Key;
      if (!key || key.endsWith("/")) continue;

      const relativePath = key.replace(finalPath, "");
      const localFilePath = path.join(localDir, relativePath);
      const dirPath = path.dirname(localFilePath);

      fs.mkdirSync(dirPath, { recursive: true });

      const getParams = {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: key,
      };

      const s3Object = await s3.getObject(getParams).promise();
      fs.writeFileSync(localFilePath, s3Object.Body as Buffer);

      console.log(`✅ Downloaded: ${key} -> ${localFilePath}`);
    }

    res.status(200).json({ message: "✅ Folder downloaded successfully." });
  } catch (err: any) {
    console.error("❌ S3 Download Error:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};

import { Request, Response } from "express";
import dotenv from "dotenv";
import { project } from "../../dummy-data";
import { s3 } from "../../lib/s3-service";

dotenv.config();

const bucket = process.env.AWS_BUCKET_NAME!;

export const saveFile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, path, content } = req.body;
    const { name: projectName } = project;

    if (!username || !projectName || !path || content === undefined) {
      res
        .status(400)
        .json({ message: "Missing username, projectName, path, or content" });
      return;
    }

    const finalPath = `users/${username}/${projectName}/${path}`;

    const params = {
      Bucket: bucket,
      Key: finalPath,
      Body: content,
      ContentType: "text/plain",
    };

    await s3.putObject(params).promise();

    console.log(`✅ File saved to S3 at: ${finalPath}`);
    res.status(200).json({ message: "File saved successfully" });
  } catch (error) {
    console.error("❌ Error uploading to S3:", error);
    res.status(500).json({ message: "Failed to save file to S3" });
  }
};

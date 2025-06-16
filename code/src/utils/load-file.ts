import dotenv from "dotenv";
import { s3 } from "../lib/s3-service";
import { project, user } from "../dummy-data";

dotenv.config();

const bucket = process.env.AWS_BUCKET_NAME!;

export const loadFile = async (path: string) => {
  const { username } = user;
  const { name: projectName } = project;
  if (!path) throw new Error("Missing path");

  const finalPath = `users/${username}/${projectName}/${path}`;

  try {
    const s3Object = await s3
      .getObject({
        Bucket: bucket,
        Key: finalPath,
      })
      .promise();

    const fileContent = s3Object.Body?.toString("utf-8") ?? "";
    return fileContent;
  } catch (error) {
    console.error("❌ Error fetching file from S3:", error);
    throw new Error("Failed to load file");
  }
};

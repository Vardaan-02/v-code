import dotenv from "dotenv";
import { s3 } from "../lib/s3-service";
import { project, user } from "../dummy-data";

dotenv.config();

const bucket = process.env.AWS_BUCKET_NAME!;

export const saveFile = async (
  path: string,
  content: string
): Promise<void> => {
  if (!path) {
    throw new Error("Missing path or content");
  }

  const { username } = user;
  const { name: projectName } = project;

  const finalPath = `users/${username}/${projectName}/${path}`;

  const params = {
    Bucket: bucket,
    Key: finalPath,
    Body: content,
    ContentType: "text/plain",
  };

  try {
    await s3.putObject(params).promise();
    console.log(`✅ File updated: ${finalPath}`);
  } catch (error) {
    console.error("❌ Error uploading to S3:", error);
    throw new Error("Failed to update file on S3");
  }
};

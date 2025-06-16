import { Request, Response } from "express";
import { s3 } from "../../lib/s3-service";
import { user, project } from "../../dummy-data";

export default async function addS3Object(req: Request, res: Response) {
  const { username } = user;
  const { name } = project;
  const { path, type } = req.body;

  if (!type) {
    res.status(400).json({ message: "Path and type are required." });
    return;
  }

  const finalPath = `users/${username}/${name}/${path}`;

  const key = type === "folder" ? finalPath.replace(/\/?$/, "/") : finalPath;

  console.log("add :", key);

  const params: AWS.S3.PutObjectRequest = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
    Body: "",
  };

  s3.putObject(params, (err, data) => {
    if (err) {
      console.error("❌ Error uploading to S3:", err);
      res.status(500).json({ message: "Failed to upload", error: err });
      return;
    }

    res.status(200).json({
      message: `${type} created successfully ✅`,
      key,
      data,
    });
  });
}

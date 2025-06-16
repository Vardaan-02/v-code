import { Request, Response } from "express";
import { s3 } from "../../lib/s3-service";
import dotenv from "dotenv";
import { project, user } from "../../dummy-data";

dotenv.config();

export default async function deleteS3Object(req: Request, res: Response) {
  const { username } = user;
  const { name: project_name } = project;
  const bucket = process.env.AWS_BUCKET_NAME!;
  const { path, type } = req.body;

  if (!path) {
    res.status(400).json({ message: "Missing name or path in request body" });
    return;
  }

  if (type === "file") {
    const finalPath = `users/${username}/${project_name}/${path}`;

    console.log(finalPath);

    try {
      const head = await s3
        .headObject({ Bucket: bucket, Key: finalPath })
        .promise()
        .catch(() => null);
      if (!head) {
        console.warn("⚠️ File not found in S3:", finalPath);
      }

      await s3
        .deleteObject({
          Bucket: bucket,
          Key: finalPath,
        })
        .promise();

      console.log(`✅ Deleted: ${finalPath}`);

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
  } else {
    try {
      const finalPrefix =
        `users/${username}/${project_name}/${path}`.replace(/\/+$/, "") + "/";

      const listedObjects = await s3
        .listObjectsV2({ Bucket: bucket, Prefix: finalPrefix })
        .promise();
      if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
        return res
          .status(404)
          .json({ message: "No objects found under folder" });
      }
      const deleteParams = {
        Bucket: bucket,
        Delete: {
          Objects: listedObjects.Contents.map(({ Key }) => ({ Key: Key! })),
        },
      };
      await s3.deleteObjects(deleteParams).promise();
      res.status(200).json({
        message: `✅ Folder and its contents deleted successfully`,
        deleted: deleteParams.Delete.Objects,
      });
    } catch (err) {
      console.error("❌ S3 folder delete error:", err);
      res.status(500).json({ message: "Failed to delete folder", error: err });
    }
  }
}

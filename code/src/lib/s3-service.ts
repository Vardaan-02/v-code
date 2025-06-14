import { S3 } from "aws-sdk";

export const s3 = new S3({
  region: "ap-south-1", 
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
});

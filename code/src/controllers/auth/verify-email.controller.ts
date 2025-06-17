import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { usersTable } from "../../db/schema";
import db from "../../db";
import { s3 } from "../../lib/s3-service"; 

export const verifyEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { token } = req.query;

    if (!token || typeof token !== "string") {
      res.status(400).json({ message: "Invalid or missing token" });
      return;
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_EMAIL_SECRET!) as {
        userId: string;
      };
    } catch (error) {
      res.status(400).json({ message: "Invalid or expired token" });
      return;
    }

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, decoded.userId));

    if (!user.length) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const { username, is_verified } = user[0];

    if (!is_verified) {
      await db
        .update(usersTable)
        .set({ is_verified: true })
        .where(eq(usersTable.id, decoded.userId));
    }

    const s3Params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: `users/${username}/VCode/`, 
      Body: "", 
    };

    await s3.putObject(s3Params).promise();

    res.status(200).json({ message: "Email successfully verified" });
    return;
  } catch (error) {
    console.error("Verify Email Error:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

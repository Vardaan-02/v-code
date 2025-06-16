import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { usersTable } from "../../db/schema";
import db from "../../db";

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

    await db
      .update(usersTable)
      .set({ is_verified: true })
      .where(eq(usersTable.id, decoded.userId));

    res.status(200).json({ message: "Email successfully verified" });
    return;
  } catch (error) {
    console.error("Verify Email Error:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { usersTable } from "../../db/schema";
import db from "../../db";

export const resetPassword = async (req: Request, res: Response):Promise<void> => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      res.status(400).json({ message: "Token and new password are required" });
      return;
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_EMAIL_SECRET!) as { userId: string };
    } catch (error) {
      res.status(400).json({ message: "Invalid or expired token" });
      return;
    }

    const user = await db.select().from(usersTable).where(eq(usersTable.id, decoded.userId));

    if (!user.length) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db
      .update(usersTable)
      .set({ password: hashedPassword })
      .where(eq(usersTable.id, decoded.userId));

    res.status(200).json({ message: "Password successfully reset" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

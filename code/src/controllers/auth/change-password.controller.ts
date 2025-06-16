import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { usersTable } from "../../db/schema";
import db from "../../db";

export const changePassword = async (req: Request, res: Response):Promise<void> => {
  try {
    const { oldPassword, newPassword, username } = req.body;

    if (!oldPassword || !newPassword) {
      res.status(400).json({ message: "Old and new passwords are required" });
      return;
    }

    const user = await db.select().from(usersTable).where(eq(usersTable.username, username));

    if (!user.length) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(oldPassword, user[0].password);
    if (!isMatch) {
      res.status(400).json({ message: "Incorrect old password" });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db
      .update(usersTable)
      .set({ password: hashedPassword })
      .where(eq(usersTable.id, username));

    res.status(200).json({ message: "Password successfully changed" });
    return;
  } catch (error) {
    console.error("Change Password Error:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

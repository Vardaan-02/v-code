import { Request, Response } from "express";
import { eq } from "drizzle-orm";
import db from "../../db";
import { usersTable } from "../../db/schema";

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.body;

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username));

    if (!user.length) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const { id, email, created_at } = user[0];

    res.status(200).json({ id, username, email, created_at });
  } catch (error) {
    console.error("Me Route Error:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

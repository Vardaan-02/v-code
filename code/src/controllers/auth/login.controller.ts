import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import db from "../../db";
import { validateLoginInput } from "../../validations/auth.validation";
import { usersTable } from "../../db/schema";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // 🧪 Validate input
    const validationError = validateLoginInput({ email, password });
    if (validationError) {
      res.status(400).json({ message: validationError });
      return;
    }

    // 🔍 Find user by email
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (existingUser.length === 0) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const user = existingUser[0];

    // 🔐 Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    // 📩 Check if email is verified
    if (!user.is_verified) {
      res.status(403).json({
        message: "Email not verified. Please verify your email first.",
      });
      return;
    }

    // 🔑 Sign refresh token
    const refreshToken = jwt.sign(
      { username: user.username },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" }
    );

    // ✅ Success response (optional: include user info)
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        refreshToken
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

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

    // 🍪 Set HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only on HTTPS in prod
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/", // applies to entire domain
    });

    // ✅ Success response (optional: include user info)
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

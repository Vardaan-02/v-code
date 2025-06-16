import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { validateRegisterInput } from "../../validations/auth.validation";
import db from "../../db";
import { usersTable } from "../../db/schema";
import { sendVerificationEmail } from "../../utils/email";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, username, email, password } = req.body;
    const validationError = validateRegisterInput({
      username,
      email,
      password,
    });
    if (validationError) {
      res.status(400).json({ message: validationError });
      return;
    }

    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    if (existingUser.length > 0) {
      res.status(400).json({ message: "Email is already in use" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db
      .insert(usersTable)
      .values({
        name,
        username,
        email,
        password: hashedPassword,
      })
      .returning();

    const verificationToken = jwt.sign(
      { userId: newUser[0].id },
      process.env.JWT_EMAIL_SECRET!,
      { expiresIn: "1d" }
    );

    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      message:
        "User registered successfully. Check your email to verify your account.",
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

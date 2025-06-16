import { Request, Response } from "express";

export const logout = async (req: Request, res: Response):Promise<void> => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logout successful" });
    return;
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

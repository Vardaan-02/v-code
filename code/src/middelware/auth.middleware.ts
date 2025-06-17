import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  username: string;
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      console.log("No refreshToken found in cookies:", req.cookies);
      res.status(401).json({ message: "No refresh token found" });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET!
    ) as TokenPayload;

    req.body = { ...req.body, username: decoded.username };
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

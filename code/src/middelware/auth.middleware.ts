import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.cookies.refresh_token;
    if (!token) {
      res.status(401).json({ message: "No refresh token found" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as {
      username: string;
    };

    req.body = { ...req.body, username: decoded.username };
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

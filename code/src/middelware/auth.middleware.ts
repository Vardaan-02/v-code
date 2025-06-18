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
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No Authorization header or invalid format");
    res.status(401).json({ message: "No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET! 
    ) as TokenPayload;

    req.body = { ...req.body, username: decoded.username };
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

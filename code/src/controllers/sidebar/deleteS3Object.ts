import { Request, Response } from "express";

export default function deleteS3Object(req: Request, res: Response) {
  res.status(200).send("Hello");
}

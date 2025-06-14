import { Request, Response } from "express";

export default function addS3Object(req: Request, res: Response) {
  res.status(200).send("Hello");
}

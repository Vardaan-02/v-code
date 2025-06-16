import { Request, Response } from "express";

export const oauthHandler = (req: Request, res: Response) => {
  res.status(200).send("Hello asdf");
};

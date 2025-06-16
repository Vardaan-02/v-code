import { Request, Response } from "express";
import { generateFileTree } from "../../utils/build-tree";

export default async function build(req: Request, res: Response) {
  const fileTree = await generateFileTree(process.env.ACTUAL_PATH!);
  res.json({ tree: fileTree });
  return;
}

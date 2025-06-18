import { Request, Response, Express } from "express";

export const healthCheck = (app: Express) => {
  app.get("/health", (_, res) => {
    res.status(200).send("OK");
  });

  app.get("/", (_, res) => {
    res.send("OK - root path hit");
  });
};

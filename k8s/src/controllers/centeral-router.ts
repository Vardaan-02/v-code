import { Request, Response, NextFunction } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

export const handleProxy = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, port } = req.params;

  console.log(username, port);

  if (!username || !port) {
    res.status(400).json({ error: "Missing username or port" });
    return;
  }

  const target = `http://user-${username}.default.pod.cluster.local:${port}`;

  const proxy = createProxyMiddleware({
    target,
    pathRewrite: (path: string, req: Request): string =>
      path.replace(`/${username}/${port}`, ""),
    changeOrigin: true,
    ws: true,
    onError(err: Error, req: Request, res: Response) {
      console.error(`❌ Proxy error for user ${req.params.username}:`, err);
      if (!res.headersSent) {
        res.writeHead(502);
      }
      res.end("Bad Gateway");
    },
  } as any);

  return proxy(req, res, next);
};

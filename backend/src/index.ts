import "./config/env";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import { corsConfig } from "./config/server";
import { setupSockets } from "./sockets";
import { setupFileWatcher } from "./watchers/file-watcher";

import FileStructureRouter from "./routes/file-tree";
import { healthCheck } from "./utils/health-checks";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: corsConfig });

app.use(express.json());
app.use(require("cors")(corsConfig));
healthCheck(app);
app.use("/folder-structure", FileStructureRouter);

setupSockets(io);
setupFileWatcher(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Server live at http://localhost:${PORT}`);
});

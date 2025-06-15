import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3002;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "*";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: CLIENT_ORIGIN,
  },
});

const docs: Record<string, any> = {};

io.on("connection", (socket: Socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("get-file", (path) => {
    const data = "";
    socket.join(path);

    socket.emit("load-file", data);

    socket.on("send-delta", (delta) => {
      socket.broadcast.to(path).emit("receive-delta", delta);
    });
  });
});

server.listen(PORT, () => {
  console.log(`⚡️ Web Sockets up and running on port ${PORT}`);
});

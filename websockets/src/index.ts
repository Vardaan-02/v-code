import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import dotenv from "dotenv";
import axios from "axios";

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

async function loadFile(path: string) {
  const response = await axios.get(
    `http://localhost:3001/api/editor/get-file-data`,
    {
      params: {
        path: path,
      },
    }
  );

  return response.data.content;
}

export async function saveFile(path: string, content: string) {
  try {
    const response = await axios.post(
      `http://localhost:3001/api/editor/edit-file-data`,
      {
        path,
        content,
      }
    );

    return response.data;
  } catch (error) {
    console.error("❌ Error saving file:", error);
    throw error;
  }
}

io.on("connection", (socket: Socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("get-file", async (path) => {
    const data = await loadFile(path);
    socket.join(path);

    socket.emit("load-file", data);
  });

  socket.on("send-delta", ({ path, delta }) => {
    socket.broadcast.to(path).emit("receive-delta", delta);
  });

  socket.on("save-file", async ({ path, content }) => {
    await saveFile(path, content);
  });
});

server.listen(PORT, () => {
  console.log(`⚡️ Web Sockets up and running on port ${PORT}`);
});

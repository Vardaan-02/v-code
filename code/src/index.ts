import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import { PORT, CLIENT_ORIGIN } from "./config";
import routes from "./routes";
import cookieParser from "cookie-parser";
import { handleFileSockets } from "./sockets/file-handler";

const app = express();

app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api", routes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: CLIENT_ORIGIN,
    credentials: true,
  },
});

io.on("connection", (socket: Socket) => {
  console.log(`⚡️ Socket connected: ${socket.id}`);

  handleFileSockets(io, socket);

  socket.on("disconnect", () => {
    console.log(`🚪 Socket disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`✅ REST + WebSocket server running at http://localhost:${PORT}`);
});

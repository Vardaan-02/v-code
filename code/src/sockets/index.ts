import { Server, Socket } from "socket.io";
import { handleFileSockets } from "./file-handler";

export const registerSocketHandlers = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`⚡️ Socket connected: ${socket.id}`);
    
    handleFileSockets(io, socket);

    socket.on("disconnect", () => {
      console.log(`🚪 Socket disconnected: ${socket.id}`);
    });
  });
};

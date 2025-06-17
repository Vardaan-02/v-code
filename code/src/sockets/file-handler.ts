import { Server, Socket } from "socket.io";

export const handleFileSockets = (io: Server, socket: Socket) => {
  socket.on("send-delta", ({ path, delta }) => {
    socket.broadcast.to(path).emit("receive-delta", delta);
  });
};

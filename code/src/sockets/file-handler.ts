import { Server, Socket } from "socket.io";
import { loadFile } from "../utils/load-file";
import { saveFile } from "../utils/save-file";

export const handleFileSockets = (io: Server, socket: Socket) => {
  socket.on("get-file", async (path: string) => {
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
};

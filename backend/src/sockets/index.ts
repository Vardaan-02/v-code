import { Server } from "socket.io";
import { editorSocketHandler } from "./editor";
import { terminalSocketHandler } from "./terminal";
import createPtyProcess from "../pty";

export function setupSockets(io: Server) {
  const ptyProcess = createPtyProcess();

  io.on("connection", (socket) => {
    console.log(`🟢 Client connected: ${socket.id}`);
    editorSocketHandler(socket);
    terminalSocketHandler(socket, ptyProcess);
  });
}

import { Socket } from "socket.io";
import { IPty } from "node-pty";

export function terminalSocketHandler(socket: Socket, ptyProcess: IPty) {
  ptyProcess.onData((data) => {
    socket.emit("terminal:data", data);
  });

  socket.on("terminal:write", (data: string) => {
    ptyProcess.write(data);
  });
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.terminalSocketHandler = terminalSocketHandler;
function terminalSocketHandler(socket, ptyProcess) {
    ptyProcess.onData((data) => {
        socket.emit("terminal:data", data);
    });
    socket.on("terminal:write", (data) => {
        ptyProcess.write(data);
    });
}

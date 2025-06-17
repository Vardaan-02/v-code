"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFileSockets = void 0;
const handleFileSockets = (io, socket) => {
    socket.on("send-delta", ({ path, delta }) => {
        socket.broadcast.to(path).emit("receive-delta", delta);
    });
};
exports.handleFileSockets = handleFileSockets;

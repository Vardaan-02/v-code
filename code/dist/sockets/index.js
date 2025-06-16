"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSocketHandlers = void 0;
const file_handler_1 = require("./file-handler");
const registerSocketHandlers = (io) => {
    io.on("connection", (socket) => {
        console.log(`⚡️ Socket connected: ${socket.id}`);
        (0, file_handler_1.handleFileSockets)(io, socket);
        socket.on("disconnect", () => {
            console.log(`🚪 Socket disconnected: ${socket.id}`);
        });
    });
};
exports.registerSocketHandlers = registerSocketHandlers;

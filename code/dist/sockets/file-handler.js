"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFileSockets = void 0;
const load_file_1 = require("../utils/load-file");
const save_file_1 = require("../utils/save-file");
const handleFileSockets = (io, socket) => {
    socket.on("get-file", async (path) => {
        const data = await (0, load_file_1.loadFile)(path);
        socket.join(path);
        socket.emit("load-file", data);
    });
    socket.on("send-delta", ({ path, delta }) => {
        socket.broadcast.to(path).emit("receive-delta", delta);
    });
    socket.on("save-file", async ({ path, content }) => {
        await (0, save_file_1.saveFile)(path, content);
    });
};
exports.handleFileSockets = handleFileSockets;

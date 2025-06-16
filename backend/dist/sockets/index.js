"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSockets = setupSockets;
const editor_1 = require("./editor");
const terminal_1 = require("./terminal");
const pty_1 = __importDefault(require("../pty"));
function setupSockets(io) {
    const ptyProcess = (0, pty_1.default)();
    io.on("connection", (socket) => {
        console.log(`🟢 Client connected: ${socket.id}`);
        (0, editor_1.editorSocketHandler)(socket);
        (0, terminal_1.terminalSocketHandler)(socket, ptyProcess);
    });
}

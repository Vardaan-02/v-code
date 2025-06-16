"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const routes_1 = __importDefault(require("./routes"));
const file_handler_1 = require("./sockets/file-handler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: config_1.CLIENT_ORIGIN, credentials: true }));
app.use(express_1.default.json());
app.use("/api", routes_1.default);
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: config_1.CLIENT_ORIGIN,
        credentials: true,
    },
});
io.on("connection", (socket) => {
    console.log(`⚡️ Socket connected: ${socket.id}`);
    (0, file_handler_1.handleFileSockets)(io, socket);
    socket.on("disconnect", () => {
        console.log(`🚪 Socket disconnected: ${socket.id}`);
    });
});
server.listen(config_1.PORT, () => {
    console.log(`✅ REST + WebSocket server running at http://localhost:${config_1.PORT}`);
});

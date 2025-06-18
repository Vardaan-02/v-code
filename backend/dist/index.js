"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./config/env");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const server_1 = require("./config/server");
const sockets_1 = require("./sockets");
const file_watcher_1 = require("./watchers/file-watcher");
const file_tree_1 = __importDefault(require("./routes/file-tree"));
const health_checks_1 = require("./utils/health-checks");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, { cors: server_1.corsConfig });
app.use(express_1.default.json());
app.use(require("cors")(server_1.corsConfig));
(0, health_checks_1.healthCheck)(app);
app.use("/folder-structure", file_tree_1.default);
(0, sockets_1.setupSockets)(io);
(0, file_watcher_1.setupFileWatcher)(io);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`✅ Server live at http://localhost:${PORT}`);
});

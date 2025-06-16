"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createPtyProcess;
const node_pty_1 = require("node-pty");
const path_1 = __importDefault(require("path"));
function createPtyProcess() {
    return (0, node_pty_1.spawn)("bash", [], {
        name: "xterm-color",
        cols: 80,
        rows: 30,
        cwd: path_1.default.resolve(process.env.INIT_CWD || process.cwd(), process.env.ACTUAL_PATH),
        env: process.env,
    });
}

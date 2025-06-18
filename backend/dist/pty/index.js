"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createPtyProcess;
const node_pty_1 = require("node-pty");
const os_1 = __importDefault(require("os"));
const shell = os_1.default.platform() === "win32" ? "powershell.exe" : "bash";
function createPtyProcess() {
    const cwd = "/app";
    //  process.env.ACTUAL_PATH
    //   ? path.resolve(
    //       process.env.INIT_CWD || process.cwd(),
    //       process.env.ACTUAL_PATH
    //     )
    //   :
    return (0, node_pty_1.spawn)(shell, ["--login"], {
        name: "xterm-color",
        cols: 80,
        rows: 30,
        cwd: cwd,
        env: process.env,
    });
}

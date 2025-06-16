"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editorSocketHandler = editorSocketHandler;
const apply_delta_1 = require("../utils/apply-delta");
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
function editorSocketHandler(socket) {
    socket.on("editor:send-delta", async ({ path: filePath, content }) => {
        const finalPath = path_1.default.join(process.env.ACTUAL_PATH, filePath);
        try {
            const original = await (0, promises_1.readFile)(finalPath, "utf-8");
            const updated = (0, apply_delta_1.applyDelta)(original, content);
            await (0, promises_1.writeFile)(finalPath, updated, "utf-8");
        }
        catch (err) {
            console.error(`❌ Delta update failed for ${finalPath}:`, err);
        }
    });
}

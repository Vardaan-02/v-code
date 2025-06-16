"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = deleteLocalObject;
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
async function deleteLocalObject(req, res) {
    const { path: relativePath, type } = req.body;
    if (!relativePath || !type) {
        res.status(400).json({ message: "Path and type are required." });
        return;
    }
    const finalPath = path_1.default.resolve(process.env.ACTUAL_PATH, relativePath);
    console.log("🧹 Deleting:", finalPath, type);
    try {
        const stat = await fs_1.promises.lstat(finalPath);
        if (type === "folder") {
            if (!stat.isDirectory()) {
                res.status(400).json({ message: "Not a folder." });
                return;
            }
            await fs_1.promises.rm(finalPath, { recursive: true, force: true });
        }
        else {
            if (!stat.isFile()) {
                res.status(400).json({ message: "Not a file." });
                return;
            }
            await fs_1.promises.unlink(finalPath);
        }
        res.status(200).json({
            message: `${type} deleted successfully ✅`,
            path: finalPath,
        });
        return;
    }
    catch (err) {
        if (err.code === "ENOENT") {
            res.status(200).json({
                message: `${type} already deleted ✅`,
                path: finalPath,
            });
            return;
        }
        console.error("❌ Error deleting local object:", err);
        res.status(500).json({
            message: "Failed to delete object",
            error: err.message,
        });
        return;
    }
}

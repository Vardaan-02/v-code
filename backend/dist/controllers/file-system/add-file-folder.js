"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = addLocalObject;
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
async function addLocalObject(req, res) {
    const { path: relativePath, type } = req.body;
    if (!relativePath || !type) {
        res.status(400).json({ message: "Path and type are required." });
        return;
    }
    const finalPath = path_1.default.resolve(process.env.ACTUAL_PATH, relativePath);
    try {
        if (type === "folder") {
            await fs_1.promises.mkdir(finalPath, { recursive: true });
        }
        else {
            await fs_1.promises.mkdir(path_1.default.dirname(finalPath), { recursive: true });
            await fs_1.promises.writeFile(finalPath, ""); // Creates empty file
        }
        res.status(200).json({
            message: `${type} created successfully ✅`,
            path: finalPath,
        });
    }
    catch (err) {
        console.error("❌ Error creating local object:", err);
        res.status(500).json({ message: "Failed to create object", error: err });
    }
}

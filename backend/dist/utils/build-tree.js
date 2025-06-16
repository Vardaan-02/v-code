"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFileTree = generateFileTree;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
async function generateFileTree(directory) {
    async function buildTree(dirPath) {
        const entries = await fs_1.promises.readdir(dirPath);
        const result = [];
        for (const entry of entries) {
            const fullPath = path_1.default.join(dirPath, entry);
            const stat = await fs_1.promises.stat(fullPath);
            if (stat.isDirectory()) {
                const children = await buildTree(fullPath);
                result.push({
                    name: entry,
                    path: fullPath,
                    type: "folder",
                    children,
                    isExpanded: false,
                    isSelected: false,
                });
            }
            else {
                result.push({
                    name: entry,
                    path: fullPath,
                    type: "file",
                    isSelected: false,
                });
            }
        }
        return result;
    }
    return buildTree(directory);
}

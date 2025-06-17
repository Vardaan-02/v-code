"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupFileWatcher = setupFileWatcher;
const chokidar_1 = __importDefault(require("chokidar"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const in_memory_map_1 = require("../utils/in-memory-map");
function shouldIgnore(p) {
    return IGNORED_DIRS.some((dir) => p.includes(`/${dir}/`) || p.endsWith(`/${dir}`));
}
async function emitFolderContents(io, folderPath) {
    if (shouldIgnore(folderPath))
        return;
    try {
        const entries = await promises_1.default.readdir(folderPath, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path_1.default.join(folderPath, entry.name);
            if (shouldIgnore(fullPath))
                continue;
            if (entry.isFile()) {
                const content = await promises_1.default.readFile(fullPath, "utf-8");
                io.emit("docker:add", {
                    path: fullPath,
                    type: "file",
                    content,
                });
            }
            else if (entry.isDirectory()) {
                io.emit("docker:add", {
                    path: fullPath,
                    type: "folder",
                });
                await emitFolderContents(io, fullPath);
            }
        }
    }
    catch (err) {
        console.error(`❌ Error reading folder ${folderPath}:`, err);
    }
}
function setupFileWatcher(io) {
    const watcher = chokidar_1.default.watch("./../s3-code", {
        persistent: true,
        ignoreInitial: false,
        ignored: (path) => shouldIgnore(path),
    });
    watcher
        .on("add", async (filePath) => {
        if (shouldIgnore(filePath))
            return;
        try {
            const content = await promises_1.default.readFile(filePath, "utf-8");
            io.emit("docker:add", {
                path: filePath,
                type: "file",
                content,
            });
        }
        catch (err) {
            console.error(`❌ Error reading file ${filePath}:`, err);
        }
    })
        .on("addDir", async (folderPath) => {
        if (shouldIgnore(folderPath))
            return;
        io.emit("docker:add", {
            path: folderPath,
            type: "folder",
        });
        await emitFolderContents(io, folderPath);
    })
        .on("unlink", (filePath) => {
        if (shouldIgnore(filePath))
            return;
        io.emit("docker:remove", {
            path: filePath,
            type: "file",
        });
    })
        .on("unlinkDir", (folderPath) => {
        if (shouldIgnore(folderPath))
            return;
        io.emit("docker:remove", {
            path: folderPath,
            type: "folder",
        });
    })
        .on("change", async (filePath) => {
        if (shouldIgnore(filePath))
            return;
        const contentFromDisk = await promises_1.default.readFile(filePath, "utf-8");
        const contentFromMemory = (0, in_memory_map_1.getFileContent)(filePath);
        if (contentFromMemory === contentFromDisk) {
            return;
        }
        try {
            const content = await promises_1.default.readFile(filePath, "utf-8");
            io.emit("docker:update", {
                path: filePath,
                type: "file",
                content: contentFromDisk,
            });
        }
        catch (err) {
            console.error(`❌ Error reading updated file ${filePath}:`, err);
        }
    });
}
const IGNORED_DIRS = [
    // JavaScript / Node.js
    "node_modules",
    "dist",
    "build",
    "out",
    ".next",
    ".vercel",
    ".turbo",
    "coverage",
    ".eslintcache",
    ".parcel-cache",
    ".yarn",
    ".npm",
    // Python
    "__pycache__",
    ".pytest_cache",
    ".mypy_cache",
    ".venv",
    "venv",
    ".env",
    ".ipynb_checkpoints",
    // C / C++
    "bin",
    "obj",
    ".vscode",
    ".ccls-cache",
    ".clangd",
    "CMakeFiles",
    "cmake-build-debug",
    "cmake-build-release",
    // Common / OS / IDEs / Meta
    ".git",
    ".idea",
    ".DS_Store",
    "logs",
    ".cache",
    ".swp", // Vim temp files
    ".history", // Shell history
    ".editorconfig",
    "Thumbs.db", // Windows junk
];

import chokidar from "chokidar";
import { Server } from "socket.io";
import fs from "fs/promises";
import path from "path";

function shouldIgnore(p: string): boolean {
  return IGNORED_DIRS.some(
    (dir) => p.includes(`/${dir}/`) || p.endsWith(`/${dir}`)
  );
}

async function emitFolderContents(io: Server, folderPath: string) {
  if (shouldIgnore(folderPath)) return;

  try {
    const entries = await fs.readdir(folderPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(folderPath, entry.name);

      if (shouldIgnore(fullPath)) continue;

      if (entry.isFile()) {
        const content = await fs.readFile(fullPath, "utf-8");
        io.emit("docker:add", {
          path: fullPath,
          type: "file",
          content,
        });
      } else if (entry.isDirectory()) {
        io.emit("docker:add", {
          path: fullPath,
          type: "folder",
        });

        await emitFolderContents(io, fullPath);
      }
    }
  } catch (err) {
    console.error(`❌ Error reading folder ${folderPath}:`, err);
  }
}

export function setupFileWatcher(io: Server) {
  const watcher = chokidar.watch("./../s3-code", {
    persistent: true,
    ignoreInitial: false,
    ignored: (path) => shouldIgnore(path),
  });

  watcher
    .on("add", async (filePath) => {
      if (shouldIgnore(filePath)) return;

      try {
        const content = await fs.readFile(filePath, "utf-8");
        io.emit("docker:add", {
          path: filePath,
          type: "file",
          content,
        });
      } catch (err) {
        console.error(`❌ Error reading file ${filePath}:`, err);
      }
    })
    .on("addDir", async (folderPath) => {
      if (shouldIgnore(folderPath)) return;

      io.emit("docker:add", {
        path: folderPath,
        type: "folder",
      });

      await emitFolderContents(io, folderPath);
    })
    .on("unlink", (filePath) => {
      if (shouldIgnore(filePath)) return;

      io.emit("docker:remove", {
        path: filePath,
        type: "file",
      });
    })
    .on("unlinkDir", (folderPath) => {
      if (shouldIgnore(folderPath)) return;

      io.emit("docker:remove", {
        path: folderPath,
        type: "folder",
      });
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

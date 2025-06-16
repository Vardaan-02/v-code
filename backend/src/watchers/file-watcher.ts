import chokidar from "chokidar";
import { Server } from "socket.io";
import fs from "fs/promises";
import path from "path";

async function emitFolderContents(io: Server, folderPath: string) {
  try {
    const entries = await fs.readdir(folderPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(folderPath, entry.name);

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
  });

  watcher
    .on("add", async (filePath) => {
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
      io.emit("docker:add", {
        path: folderPath,
        type: "folder",
      });

      await emitFolderContents(io, folderPath);
    })
    .on("unlink", (filePath) => {
      io.emit("docker:remove", {
        path: filePath,
        type: "file",
      });
    })
    .on("unlinkDir", (folderPath) => {
      io.emit("docker:remove", {
        path: folderPath,
        type: "folder",
      });
    });
}

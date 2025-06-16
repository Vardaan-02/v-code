import chokidar from "chokidar";
import { Server } from "socket.io";

export function setupFileWatcher(io: Server) {
  const watcher = chokidar.watch("./../s3-code");

  watcher
    .on("add", (path) => {
      console.log("📄 File added:", path);
      io.emit("docker:add", { path, type: "file" });
    })
    .on("addDir", (path) => {
      console.log("📁 Folder added:", path);
      io.emit("docker:add", { path, type: "folder" });
    })
    .on("unlink", (path) => {
      console.log("🗑️ File removed:", path);
      io.emit("docker:remove", { path, type: "file" });
    })
    .on("unlinkDir", (path) => {
      console.log("🗑️ Folder removed:", path);
      io.emit("docker:remove", { path, type: "folder" });
    });
}

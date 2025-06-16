import { Socket } from "socket.io";
import { applyDelta } from "../utils/apply-delta";
import { readFile, writeFile } from "fs/promises";
import path from "path";

export function editorSocketHandler(socket: Socket) {
  socket.on("editor:send-delta", async ({ path: filePath, content }) => {
    const finalPath = path.join(process.env.ACTUAL_PATH!, filePath);

    try {
      const original = await readFile(finalPath, "utf-8");
      const updated = applyDelta(original, content);
      await writeFile(finalPath, updated, "utf-8");
    } catch (err) {
      console.error(`❌ Delta update failed for ${finalPath}:`, err);
    }
  });
}

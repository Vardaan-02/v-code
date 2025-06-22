import { spawn } from "node-pty";
import path from "path";

export default function createPtyProcess() {
  console.log(
    path.resolve(
      process.env.INIT_CWD || process.cwd(),
      process.env.ACTUAL_PATH!
    )
  );

  return spawn("bash", [], {
    name: "xterm-color",
    cols: 80,
    rows: 30,
    cwd: path.resolve(
      process.env.INIT_CWD || process.cwd(),
      process.env.ACTUAL_PATH!
    ),
    env: process.env,
  });
}

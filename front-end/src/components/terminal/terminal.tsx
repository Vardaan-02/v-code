import "@xterm/xterm/css/xterm.css";
import { useFileTree } from "@/contexts/file-tree-context";
import { useTerminal } from "@/hooks/useTerminal";

export default function Terminal() {
  const { socketS3, socketDocker } = useFileTree();
  const terminalRef = useTerminal(socketS3, socketDocker);

  return (
    <div
      ref={terminalRef}
      id="terminal"
      className="
      w-full h-full
      p-4 
      bg-[#1e1e1e] 
      rounded-2xl 
      shadow-md 
      text-white 
      font-mono 
      text-sm 
      border border-neutral-800
      overflow-hidden
      no-scrollbar
    "
    />
  );
}

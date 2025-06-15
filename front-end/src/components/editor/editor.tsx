import Editor from "@monaco-editor/react";
import useMonacoLanguages from "@/hooks/useMonocoLanguages";
import { useEditor } from "@/hooks/useEditor";
import { useSocket } from "@/hooks/useSockets";
import { useFileTree } from "@/contexts/file-tree-context";
import { cn } from "@/lib/utils";

export default function CodeEditor() {
  useMonacoLanguages();
  const socket = useSocket();
  const { selectedNode, selectingNode } = useFileTree();
  const { handleMount, code } = useEditor(socket, selectedNode);

  return (
    <div className="w-full h-full">
      <div className="h-full w-full rounded-xl overflow-hidden shadow-lg">
        {selectedNode == null || selectedNode?.type === "folder" ? (
          <div className="bg-[#1e1e1e] h-full flex flex-col items-center justify-center text-white px-4 text-center">
            <h2 className="text-xl font-semibold mb-2">No file selected 🗂️</h2>
            <p className="text-sm opacity-80">
              Please select a file from the sidebar to begin editing.
              <br />
              Wishing you a super productive and happy day ahead! 🌞✨
            </p>
          </div>
        ) : (
          <div className="relative w-full h-full">
            <div
              className={cn(
                "absolute top-0 left-0 z-10 w-full h-full bg-[#1e1e1e] hidden",
                selectingNode && "block"
              )}
            >
              <div className="flex h-full w-full items-center justify-center">
                <div className="flex flex-col items-center gap-2 animate-fade-in">
                  <div className="h-6 w-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="text-white text-sm font-medium">
                    Loading...
                  </span>
                </div>
              </div>
            </div>

            <div className="h-full">
              <Editor
                width="100%"
                height="100%"
                language="javascript"
                theme="vs-dark"
                value={code}
                onMount={handleMount}
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  wordWrap: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 4,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import Editor from "@monaco-editor/react";
import useMonacoLanguages from "@/hooks/useMonocoLanguages";
import { useEditor } from "@/hooks/useEditor";
import { useSocket } from "@/hooks/useSockets";
import { useFileTree } from "@/contexts/file-tree-context";

export default function CodeEditor() {
  useMonacoLanguages();
  const socket = useSocket();
  const { selectedNode } = useFileTree();
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
        )}
      </div>
    </div>
  );
}

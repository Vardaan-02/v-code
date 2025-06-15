import { useState } from "react";
import Editor from "@monaco-editor/react";
import useMonacoLanguages from "@/hooks/useMonocoLanguages";

export default function CodeEditor() {
  const [code, setCode] = useState("// Happy hacking, Vardaan!");

  useMonacoLanguages();

  return (
    <div className="w-full h-full">
      <div className="h-full w-full rounded-xl overflow-hidden shadow-lg ">
        <Editor
          width="100%"
          height="100%"
          language="javascript"
          theme="vs-dark"
          value={code}
          onChange={(val) => setCode(val || "")}
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
  );
}

import { useRef, useState, useCallback, useEffect } from "react";
import * as monaco from "monaco-editor";
import type { OnMount } from "@monaco-editor/react";
import type { Socket } from "socket.io-client";
import type { FileNode } from "@/types/file-structure";
import { useFileTree } from "@/contexts/file-tree-context";

export function useEditor(
  socketS3: Socket | null,
  socketDocker: Socket | null,
  selectedNode: FileNode | null
) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const { code, setCode } = useFileTree();
  const [isEditorReady, setIsEditorReady] = useState(false);
  const isRemoteChange = useRef(false);

  const handleMount: OnMount = useCallback((editor) => {
    editorRef.current = editor;
    setIsEditorReady(true);
  }, []);

  // send-delta
  useEffect(() => {
    if (
      !socketS3 ||
      !socketDocker ||
      !isEditorReady ||
      !editorRef.current ||
      !selectedNode
    )
      return;

    const model = editorRef.current.getModel();
    if (!model) return;

    const disposable = model.onDidChangeContent((event) => {
      if (isRemoteChange.current) {
        isRemoteChange.current = false;
        return;
      }

      const changes = event.changes;
      socketS3.emit("send-delta", {
        path: selectedNode?.path,
        content: changes,
      });
      socketDocker.emit("editor:send-delta", {
        path: selectedNode?.path,
        content: changes,
      });

      setCode(model.getValue());
    });

    return () => disposable.dispose();
  }, [socketS3, socketDocker, isEditorReady, selectedNode, setCode]);

  // recieve-delta
  useEffect(() => {
    if (!socketS3 || !socketDocker || !isEditorReady || !editorRef.current)
      return;

    const model = editorRef.current.getModel();
    if (!model) return;

    const handleReceiveDelta = (delta: monaco.editor.IModelContentChange[]) => {
      isRemoteChange.current = true;
      model.applyEdits(delta);
      setCode(model.getValue());
      socketDocker.emit("editor:send-delta", {
        path: selectedNode?.path,
        content: delta,
      });
    };

    socketS3.on("receive-delta", handleReceiveDelta);

    return () => {
      socketS3.off("receive-delta", handleReceiveDelta);
    };
  }, [socketS3, socketDocker, isEditorReady, selectedNode, setCode]);

  return { handleMount, code, setCode, editorRef };
}

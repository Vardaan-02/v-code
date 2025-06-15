import { useRef, useState, useCallback, useEffect } from "react";
import * as monaco from "monaco-editor";
import type { OnMount } from "@monaco-editor/react";
import type { Socket } from "socket.io-client";
import type { FileNode } from "@/types/file-structure";

export function useEditor(
  socket: Socket | null,
  selectedNode: FileNode| null
) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [code, setCode] = useState("");
  const [isEditorReady, setIsEditorReady] = useState(false);

  const isRemoteChange = useRef(false);

  const handleMount: OnMount = useCallback((editor) => {
    editorRef.current = editor;
    setIsEditorReady(true);
  }, []);

  useEffect(() => {
    if (!socket || !isEditorReady || !editorRef.current) return;

    const model = editorRef.current.getModel();
    if (!model) return;

    const disposable = model.onDidChangeContent((event) => {
      if (isRemoteChange.current) {
        isRemoteChange.current = false;
        return;
      }

      const changes = event.changes;
      socket.emit("send-delta", changes);
      setCode(model.getValue());
    });

    return () => disposable.dispose();
  }, [socket, isEditorReady]);

  useEffect(() => {
    if (!socket || !isEditorReady || !editorRef.current) return;

    const model = editorRef.current.getModel();
    if (!model) return;

    const handleReceiveDelta = (delta: monaco.editor.IModelContentChange[]) => {
      console.log("Received delta from server:", delta);

      isRemoteChange.current = true;
      model.applyEdits(delta);
      setCode(model.getValue());
    };

    socket.on("receive-delta", handleReceiveDelta);

    return () => {
      socket.off("receive-delta", handleReceiveDelta);
    };
  }, [socket, isEditorReady]);

  useEffect(() => {
  if (!socket || !selectedNode || !editorRef.current) return;

  const model = editorRef.current.getModel();
  if (!model) return;

  socket.once("load-file", (document: string) => {
    isRemoteChange.current = true; 
    model.setValue(document); 
    setCode(document);
  });

  socket.emit("get-file", selectedNode.path);
}, [socket, selectedNode, isEditorReady]);

  return { handleMount, code, setCode, editorRef };
}

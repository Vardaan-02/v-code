import { useRef, useState, useCallback, useEffect } from "react";
import * as monaco from "monaco-editor";
import type { OnMount } from "@monaco-editor/react";
import type { Socket } from "socket.io-client";
import type { FileNode } from "@/types/file-structure";
import { useFileTree } from "@/contexts/file-tree-context";

export function useEditor(
  socket: Socket | null,
  selectedNode: FileNode | null
) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [code, setCode] = useState("");
  const [isEditorReady, setIsEditorReady] = useState(false);
  const { setSelectingNode } = useFileTree();

  const latestCodeRef = useRef(code);
  const isRemoteChange = useRef(false);

  const handleMount: OnMount = useCallback((editor) => {
    editorRef.current = editor;
    setIsEditorReady(true);
  }, []);

  useEffect(() => {
    if (!socket || !isEditorReady || !editorRef.current || !selectedNode)
      return;

    const model = editorRef.current.getModel();
    if (!model) return;

    const disposable = model.onDidChangeContent((event) => {
      if (isRemoteChange.current) {
        isRemoteChange.current = false;
        return;
      }

      const changes = event.changes;
      socket.emit("send-delta", { path: selectedNode?.path, content: changes });
      setCode(model.getValue());
    });

    return () => disposable.dispose();
  }, [socket, isEditorReady, selectedNode]);

  useEffect(() => {
    if (!socket || !isEditorReady || !editorRef.current) return;

    const model = editorRef.current.getModel();
    if (!model) return;

    const handleReceiveDelta = (delta: monaco.editor.IModelContentChange[]) => {
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

    if (selectedNode.type === "folder") return;

    const model = editorRef.current.getModel();
    if (!model) return;

    let isMounted = true;
    setSelectingNode(true);

    const handleLoadFile = (document: string) => {
      if (!isMounted) return;
      isRemoteChange.current = true;
      model.setValue(document);
      setCode(document);
      setSelectingNode(false);
    };

    socket.once("load-file", handleLoadFile);
    socket.emit("get-file", selectedNode.path);

    return () => {
      isMounted = false;
      socket.off("load-file", handleLoadFile);
    };
  }, [socket, selectedNode, isEditorReady, setSelectingNode]);

  useEffect(() => {
    latestCodeRef.current = code;
  }, [code]);

  useEffect(() => {
    if (!socket || !selectedNode) return;

    if (selectedNode.type === "folder") return;

    const interval = setInterval(() => {
      socket.emit("save-file", {
        path: selectedNode?.path,
        content: latestCodeRef.current,
      });
    }, import.meta.env.VITE_SAVE_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [socket, selectedNode]);

  return { handleMount, code, setCode, editorRef };
}

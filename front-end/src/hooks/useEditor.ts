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
  const [code, setCode] = useState("");
  const [isEditorReady, setIsEditorReady] = useState(false);
  const { setSelectingNode } = useFileTree();

  const latestCodeRef = useRef(code);
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
  }, [socketS3, socketDocker, isEditorReady, selectedNode]);

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
  }, [socketS3, socketDocker, isEditorReady, selectedNode]);

  // load-file
  useEffect(() => {
    if (!socketS3 || !selectedNode || !editorRef.current) return;

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

    socketS3.once("load-file", handleLoadFile);
    socketS3.emit("get-file", selectedNode.path);

    return () => {
      isMounted = false;
      socketS3.off("load-file", handleLoadFile);
    };
  }, [socketS3, selectedNode, isEditorReady, setSelectingNode]);

  useEffect(() => {
    latestCodeRef.current = code;
  }, [code]);

  // save-file
  useEffect(() => {
    if (!socketS3 || !selectedNode) return;

    if (selectedNode.type === "folder") return;

    const interval = setInterval(() => {
      socketS3.emit("save-file", {
        path: selectedNode?.path,
        content: latestCodeRef.current,
      });
    }, import.meta.env.VITE_SAVE_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [socketS3, selectedNode]);

  return { handleMount, code, setCode, editorRef };
}

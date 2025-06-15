import type * as monaco from "monaco-editor";

export type ServerToClientEvents = {
  "recieve-delta": (delta: Delta) => void;
};

export type ClientToServerEvents = {
  "send-delta": (payload: { docId: string; delta: Delta }) => void;
};

export interface Delta {
  range: monaco.IRange;
  rangeLength: number;
  text: string;
  rangeOffset: number;
}

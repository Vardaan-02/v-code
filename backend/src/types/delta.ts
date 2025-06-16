export type MonacoDelta = {
  range: {
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
  };
  rangeLength: number;
  rangeOffset: number;
  text: string;
  forceMoveMarkers?: boolean;
};
import { MonacoDelta } from "../types/delta";

export function applyDelta(original: string, deltas: MonacoDelta[]): string {
  let result = original;

  for (let i = deltas.length - 1; i >= 0; i--) {
    const delta = deltas[i];
    const before = result.slice(0, delta.rangeOffset);
    const after = result.slice(delta.rangeOffset + delta.rangeLength);
    result = before + delta.text + after;
  }

  return result;
}

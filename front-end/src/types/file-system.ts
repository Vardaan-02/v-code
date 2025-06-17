export interface LoadFilePayload {
  path: string;
}

export interface SaveFilePayload {
  content: string;
  path: string;
}

export interface SyncFilePayload {
  content: string;
  path: string;
}
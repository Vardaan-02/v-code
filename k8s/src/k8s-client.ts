import * as k8s from "@kubernetes/client-node";

export const kc = new k8s.KubeConfig();
kc.loadFromDefault();

export const k8sApi = kc.makeApiClient(k8s.AppsV1Api);
export const coreV1Api = kc.makeApiClient(k8s.CoreV1Api);
export const watch = new k8s.Watch(kc);

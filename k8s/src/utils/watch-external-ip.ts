import * as k8s from "@kubernetes/client-node";
import { kc } from "../k8s-client";

export const watchServiceForExternalIP = (
  namespace: string,
  serviceName: string,
  timeoutMs: number = 60000
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("⏳ Timeout waiting for external IP"));
    }, timeoutMs);

    const watch = new k8s.Watch(kc);

    watch.watch(
      `/api/v1/namespaces/${namespace}/services`,
      {
        fieldSelector: `metadata.name=${serviceName}`,
      },
      (type, obj: k8s.V1Service) => {
        const ingress = obj.status?.loadBalancer?.ingress;
        if (ingress && ingress.length > 0) {
          clearTimeout(timeout);
          (watch as any).abort();
          const ip = ingress[0].ip || ingress[0].hostname;
          resolve(ip!);
        }
      },
      (err) => {
        clearTimeout(timeout);
        reject(err);
      }
    );
  });
};

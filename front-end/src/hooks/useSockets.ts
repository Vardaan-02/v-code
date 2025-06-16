import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export function useSocket() {
  const [socketS3, setSocketS3] = useState<Socket | null>(null);
  const [socketDocker, setSocketDocker] = useState<Socket | null>(null);

  useEffect(() => {
    const s = io(import.meta.env.VITE_WEB_SOCKET_URL, {
      transports: ["websocket"],
    });

    setSocketS3(s);

    return () => {
      s.disconnect();
      setSocketS3(null);
    };
  }, [setSocketS3]);

  useEffect(() => {
    const s = io(import.meta.env.VITE_DOCKER_BACKEND, {
      transports: ["websocket"],
    });

    setSocketDocker(s);

    return () => {
      s.disconnect();
      setSocketDocker(null);
    };
  }, []);

  return { socketS3, socketDocker };
}

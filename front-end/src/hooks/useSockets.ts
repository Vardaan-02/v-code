import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  
  useEffect(() => {
    const s = io(import.meta.env.VITE_WEB_SOCKET_URL, {
      transports: ["websocket"],
    });

    setSocket(s);

    return () => {
      s.disconnect();
      setSocket(null);
    };
  }, []);

  return socket;
}

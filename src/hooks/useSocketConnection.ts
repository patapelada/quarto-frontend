import { socket } from "@/socket";
import { useEffect, useState } from "react";

export function useSocketConnection() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      setUserId(socket.id || null);
    }

    function onError(error: Error) {
      console.error("Socket error:", error);
    }

    socket.on("connect", onConnect);
    socket.on("error", onError);

    if (socket.disconnected) {
      socket.connect();
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("error", onError);
      socket.disconnect();
    };
  }, []);

  return { isConnected, userId };
}

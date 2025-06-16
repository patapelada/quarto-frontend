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

    function onDisconnect() {
      setIsConnected(false);
    }

    function onError(error: Error) {
      console.error("Socket error:", error);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("error", onError);

    socket.connect();

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("error", onError);
      socket.disconnect();
    };
  }, []);

  return { isConnected, userId };
}

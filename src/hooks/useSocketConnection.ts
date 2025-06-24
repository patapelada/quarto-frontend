import { socket } from "@/socket";
import { useEffect, useState } from "react";

export function useSocketConnection() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      setUserId(socket.id || null);
    }

    function onError(error: Error) {
      console.error("Socket error:", error);
    }

    function onConnectError(_error: Error) {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("error", onError);
    socket.on("connect_error", onConnectError);

    if (socket.disconnected) {
      try {
        socket.connect();
      } catch (error) {
        console.error("Socket reconnection error:", error);
        setIsConnected(false);
      }
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("error", onError);
      socket.off("connect_error", onConnectError);
      socket.disconnect();
    };
  }, []);

  return { isConnected, userId };
}

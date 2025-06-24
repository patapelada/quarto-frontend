import { io } from "socket.io-client";
const URL = import.meta.env.VITE_SOCKET_URL;

export const socket = io(URL, {
  autoConnect: false,
  transports: ["websocket", "polling", "flashsocket"],
  reconnectionAttempts: 4,
  reconnectionDelay: 500,
});

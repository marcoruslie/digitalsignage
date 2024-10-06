import { Server, type ServerOptions } from "socket.io";
import type { H3Event } from "h3";

const options: Partial<ServerOptions> = {
  path: "/api/socket.io",
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST"],
  },
};

export const io = new Server(options);

export async function initSocket(event: H3Event) {
  // @ts-ignore
  io.attach(event.node.res.socket?.server);
}

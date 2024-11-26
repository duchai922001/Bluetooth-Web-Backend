import { Server } from "socket.io";

export let io: Server;

export const configureSocketIO = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  return io;
};

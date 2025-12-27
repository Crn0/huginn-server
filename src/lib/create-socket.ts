import { createServer } from "http";

import {
  Server,
  type ServerOptions,
  type Socket as OriginalSocket,
  type DefaultEventsMap,
} from "socket.io";

interface ServerToClientEvents {
  notification: ({ entity }: { entity: ["notifications", "list", string] }) => void;
}

type ClientToServerEvents = DefaultEventsMap;

interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  user: {
    id: string;
    username: string;
  };
}

export type Socket = OriginalSocket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export type IO = ReturnType<typeof createIO>;

export const createIO = (
  server: ReturnType<typeof createServer>,
  options: Partial<ServerOptions>
) => {
  const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(
    server,
    options
  );

  return io;
};

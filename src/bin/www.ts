import "dotenv/config";
import http from "http";
import Debug from "debug";

import { env } from "@/configs/env.js";
import { app } from "@/app.js";

const port = env.PORT;
const debug = env.NODE_ENV === "dev" ? Debug("app:server") : () => {};

const onError = (error: NodeJS.ErrnoException) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening =
  (
    server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
  ) =>
  () => {
    const addr = server.address();
    const bind =
      typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`;
    debug(`Listening on ${bind}`);
  };

app.set("port", port);

const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening(server));

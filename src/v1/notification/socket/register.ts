import { createDebug } from "@/v1/lib/debug.js";

import { NOTIFICATION_NAMESPACE } from "./events.js";

import { AuthenticationError } from "@/lib/errors/auth-error.js";
import { verifyToken } from "@/v1/lib/jwt.js";

import type { IO } from "@/lib/create-socket.js";
import type { JwtPayload } from "jsonwebtoken";

const debug = createDebug("notification");

export const register = (io: IO) => {
  const namespace = io.of(NOTIFICATION_NAMESPACE);

  namespace.use((socket, next) => {
    const accessToken = socket?.handshake?.auth["accessToken"];

    if (typeof accessToken !== "string") {
      throw new AuthenticationError("Unauthenticated");
    }

    const verifiedToken = verifyToken(accessToken) as JwtPayload & { username: string };

    if (typeof verifiedToken.sub !== "string") {
      throw new AuthenticationError("Invalid or expired token");
    }

    socket.data.user = { id: verifiedToken.sub, username: verifiedToken.username };

    next();
  });

  namespace.on("connection", (socket) => {
    debug(`user ${socket.id} connected to ${NOTIFICATION_NAMESPACE}`);

    debug("socket auth user:", socket.data.user);

    socket.join(socket.data.user.id);

    socket.on("disconnect", () => {
      socket.leave(socket.data.user.id);

      debug(`user ${socket.id} disconnected to ${NOTIFICATION_NAMESPACE}`);
    });
  });

  return namespace;
};

export type NotificationNameSpace = ReturnType<typeof register>;

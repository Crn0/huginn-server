import "dotenv/config";

import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import logger from "morgan";
import path from "node:path";

import { corsConfig } from "./configs/cors.js";
import { routeErrorHandler } from "@/lib/errors/route-error-handler.js";

const app = express();

const dirname = import.meta.dirname;

app.use(cors(corsConfig));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(express.static(path.join(dirname, "..", "public")));

// ROUTES

process.stdin.resume();

[
  "exit",
  "SIGINT",
  "SIGUSR1",
  "SIGUSR2",
  "uncaughtException",
  "SIGTERM",
].forEach((eventType) => {
  process.on(eventType, async () => {
    try {
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  });
});

app.use(routeErrorHandler);

export { app };

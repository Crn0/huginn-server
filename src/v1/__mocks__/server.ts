import "dotenv/config";

import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import logger from "morgan";
import path from "node:path";

import { corsConfig } from "@/configs/cors.js";
import { routeErrorHandler } from "@/lib/errors/route-error-handler.js";

import { router as v1Routes } from "../router/index.js";

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
app.use(v1Routes);

app.use(routeErrorHandler);

export { app };

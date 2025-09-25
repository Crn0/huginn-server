import "dotenv/config";
import { Router } from "express";

import { register as meRoute } from "./me/index.js";

const router = Router();

meRoute(router);

export { router };

import "dotenv/config";
import { Router } from "express";

import { register as meRoute } from "./me/index.js";
import { register as userIdRoute } from "./[userId]/index.js";


const router = Router();

meRoute(router);

userIdRoute(router);

export { router };

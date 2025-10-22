import "dotenv/config";
import { Router } from "express";

import { readAccessToken } from "@/v1/auth/middleware/read-access-token.js";
import { register as meRoute } from "./me/index.js";
import { register as userIdRoute } from "./[username]/index.js";
import { register as usersRoute } from "./users/index.js";

const router = Router();

router.use(readAccessToken);

usersRoute(router);

meRoute(router);

userIdRoute(router);

export { router };

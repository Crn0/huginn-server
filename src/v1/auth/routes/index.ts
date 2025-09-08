import "dotenv/config";
import { Router } from "express";
import passport from "passport";

import { createLocalStrategy } from "@/v1/lib/local-strategy.js";
import { createGoogleStrategy } from "@/v1/lib/google-strategy.js";
import { registerPost } from "./post.js";

const router = Router();

passport.use(createLocalStrategy());
passport.use(createGoogleStrategy());

registerPost(router);

export { router };

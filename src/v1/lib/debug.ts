import Debug from "debug";
import { env } from "@/configs/env.js";

if (env.NODE_ENV === "prod") {
  Debug.disable();
} else {
  Debug.enable("app:*");
}

export const createDebug = (nameSpace: string) => Debug(`app:${nameSpace}`);

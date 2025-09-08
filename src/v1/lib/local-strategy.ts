import { Strategy } from "passport-local";
import { authenticateLocal } from "@/v1/auth/service/auth-service.js";

export const createLocalStrategy = () =>
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email: string, password: string, done) => {
      try {
        const user = await authenticateLocal(email, password);

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  );

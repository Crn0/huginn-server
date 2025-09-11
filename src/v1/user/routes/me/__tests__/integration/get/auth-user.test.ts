import { describe, expect, it } from "vitest";
import request from "supertest";

import { testUserLoginForm } from "testing/seed.js";
import { userSchema } from "@/v1/lib/user-schema.js";
import { app } from "v1/__mocks__/server.js";

const userRequest = request.agent(app);

describe("GET /api/v1/users/me", () => {
  const url = "/api/v1/users/me";

  describe("Success cases", () => {
    it("returns a user object", async () => {
      const login = await userRequest.post("/api/v1/auth/login").send(testUserLoginForm);

      const accessToken: string = login.body.token;

      const res = await userRequest.get(url).set("Authorization", `Bearer ${accessToken}`);

      expect(res.status).toBe(200);

      const parsedUser = userSchema.safeParse(res.body);

      expect(parsedUser.success).toBe(true);
    });
  });

  describe("Failure cases", () => {
    it("returns a authentication error when there's no access token", async () => {
      const res = await userRequest.get(url);

      expect(res.status).toBe(401);
      expect(res.body).toMatchObject({
        code: "AUTHENTICATION_ERROR",
        message: "Invalid or expired token",
      });
    });
  });
});

import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";

import { testUserLoginForm } from "testing/seed.js";
import { createUser } from "@/v1/user/service/user-service.js";
import { deleteUserById } from "@/v1/user/repository/user.js";
import { app } from "v1/__mocks__/server.js";

let accessToken: string;
let followId: string;

const userRequest = request.agent(app);

beforeAll(async () => {
  const [login, user] = await Promise.all([
    userRequest.post("/api/v1/auth/login").send(testUserLoginForm),
    createUser({
      email: "userunfllow.post@following.com",
      displayName: "user.post.following",
      password: "Crnocrno123",
      birthday: new Date(),
    }),
  ]);

  accessToken = login.body.token;

  followId = user.id;

  return async () => {
    await deleteUserById(user.id);
  };
});

describe("DELETE /api/v1/users/me/following/:followId", () => {
  const baseUrl = "/api/v1/users/me/following" as const;

  describe("Success cases", () => {
    it("returns 204 when a user successfully unfollows another user", async () => {
      const url = `${baseUrl}/${followId}`;

      const res = await userRequest.delete(url).set("Authorization", `Bearer ${accessToken}`);

      expect(res.status).toBe(204);
    });

   it("returns 204 even if the user is not currently followed", async () => {
      const url = `${baseUrl}/${followId}`;

      const res = await userRequest.delete(url).set("Authorization", `Bearer ${accessToken}`);

      expect(res.status).toBe(204);
    });
  });

  describe("Failure cases", () => {

    describe("Validation errors", () => {
      it("returns a validation error when followId is invalid", async () => {
        const url = `${baseUrl}/invalid-follow-id`;

        const res = await userRequest.delete(url).set("Authorization", `Bearer ${accessToken}`);

        expect(res.status).toBe(422);
        expect(res.body).toMatchObject({
          code: "VALIDATION_ERROR",
          message: "Validation failed: 1 errors detected in body",
          issues: [
            {
              origin: "string",
              code: "invalid_format",
              format: "uuid",
              pattern:
                "/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-7[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$/",
              path: ["followId"],
              message: "Invalid follow ID",
            },
          ],
        });
      });
    });
  });
});

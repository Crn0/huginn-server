import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";

import { generateId } from "@/v1/lib/generate-id.js";
import { testUserLoginForm } from "testing/seed.js";
import { createUser } from "@/v1/user/service/user-service.js";
import { deleteUserById } from "@/v1/user/repository/user.js";
import { app } from "v1/__mocks__/server.js";

let accessToken: string;
let followUsername: string;

const userRequest = request.agent(app);

beforeAll(async () => {
  const [login, user] = await Promise.all([
    userRequest.post("/api/v1/auth/login").send(testUserLoginForm),
    createUser({
      email: "user.post@following.com",
      displayName: "user.following",
      password: "Crnocrno123",
      birthday: new Date(),
    }),
  ]);

  accessToken = login.body.token;

  followUsername = user.username;

  return async () => {
    await deleteUserById(user.id);
  };
});

describe("POST /api/v1/users/me/following", () => {
  const url = "/api/v1/users/me/following" as const;

  describe("Success cases", () => {
    it("returns 200 when a user successfully follows another user", async () => {
      const res = await userRequest
        .post(url)
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ username: followUsername });

      expect(res.status).toBe(204);
    });

    it("returns 200 even if the user is already being followed", async () => {
      const res = await userRequest
        .post(url)
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ username: followUsername });

      expect(res.status).toBe(204);
    });
  });

  describe("Failure cases", () => {
    describe("Not_Found errors", () => {
      it("returns a not_found error when the user does not exist", async () => {
        const res = await userRequest
          .post(url)
          .set("Authorization", `Bearer ${accessToken}`)
          .send({ username: generateId() });

        expect(res.status).toBe(404);
        expect(res.body).toMatchObject({ code: "NOT_FOUND", message: "User not found." });
      });
    });
  });
});

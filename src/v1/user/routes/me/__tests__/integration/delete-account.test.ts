import path from "node:path";
import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";

import { testDeleteUserLoginForm } from "testing/seed.js";
import { app } from "v1/__mocks__/server.js";

const userRequest = request.agent(app);

let accessToken: string;

beforeAll(async () => {
  const login = await userRequest.post("/api/v1/auth/login").send(testDeleteUserLoginForm);

  accessToken = login.body.token;

  const testFile = path.join(
    import.meta.dirname,
    "..",
    "..",
    "..",
    "..",
    "..",
    "assets",
    "test_avatar.png"
  );

  await userRequest
    .patch("/api/v1/users/me/profile")
    .set("Authorization", `Bearer ${accessToken}`)
    .attach("avatar", testFile);

  await userRequest
    .post("/api/v1/tweets")
    .set("Authorization", `Bearer ${accessToken}`)
    .field("content", "test tweet :)")
    .attach("media", testFile);
});

describe("DELETE /api/v1/users/me", () => {
  const url = "/api/v1/users/me" as const;

  describe("Success cases", () => {
    it("returns a status 204 (NO_CONTENT)", async () => {
      const res = await userRequest.delete(url).set("Authorization", `Bearer ${accessToken}`);

      expect(res.status).toBe(204);
    });
  });

  describe("Failure cases", () => {
    describe("Not_Found errors", () => {
      it("returns a not found error when the user does not exist", async () => {
        const res = await userRequest.delete(url).set("Authorization", `Bearer ${accessToken}`);

        expect(res.status).toBe(404);
        expect(res.body).toMatchObject({ code: "NOT_FOUND", message: "User not found." });
      });
    });
  });
});

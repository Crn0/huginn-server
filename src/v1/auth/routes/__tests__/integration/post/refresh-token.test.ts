import { beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "v1/__mocks__/server.js";

const userRequest = request.agent(app);

beforeAll(async () => {
  const form = {
    email: "noir@test.com",
    displayName: "crno",
    password: "Crnocrno123",
    birthday: "1999-04-25",
  };
  await userRequest.post("/api/v1/auth/register").send(form);
  await userRequest.post("/api/v1/auth/login").send(form);
});

describe("POST /api/v1/auth/refresh-tokens", () => {
  const url = "/api/v1/auth/refresh-tokens" as const;

  describe("Success cases", () => {
    it("returns a new access token and refresh token", async () => {
      const oldRefreshToken = userRequest.options(url).cookies;

      const res = await userRequest.auth().post(url);

      const cookies = res.headers["set-cookie"] as string[] | undefined;
      const newRefreshToken = cookies?.[0];

      expect(res.body.token).toBeTypeOf("string");
      expect(newRefreshToken).not.toBe(oldRefreshToken);
    });
  });

  describe("Failure cases", () => {
    describe("Rate-limit errors", () => {
      it("returns a rate-limit error when the maximum attempts are exceeded", async () => {
        await Promise.all(Array.from({ length: 20 }).map(async () => userRequest.post(url)));

        const res = await userRequest.post(url);

        expect(res.headers["retry-after"]).toBe("60");
        expect(res.body).toMatchObject({
          code: "RATE_LIMIT_EXCEEDED",
          message: "Too many refresh attempts. Try again later.",
          retryAfter: 60,
        });
      });
    });
  });
});

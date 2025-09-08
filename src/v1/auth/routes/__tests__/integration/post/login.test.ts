import { beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "v1/__mocks__/server.js";

const userRequest = request.agent(app);

beforeAll(async () => {
  await userRequest.post("/api/v1/auth/register").send({
    email: "krno@test.com",
    displayName: "crno",
    password: "Crnocrno123",
    birthday: "1999-04-25",
  });
});

describe("POST /api/v1/auth/login", () => {
  const url = "/api/v1/auth/login" as const;

  const form = {
    email: "krno@test.com",
    password: "Crnocrno123",
  } as const;

  const invalidForm = {
    email: "crnocrnok@test.com",
    password: "crnocrno123",
  } as const;

  describe("Success cases", () => {
    it("returns an accessToken in the response body and sets an http-only refreshToken cookie", async () => {
      const res = await userRequest.post(url).send(form);

      const cookies = res.headers["set-cookie"] as string[] | undefined;

      const refreshToken = cookies?.[0];

      expect(res.body.token).toBeTypeOf("string");
      expect(refreshToken).toBeTypeOf("string");
    });
  });

  describe("Failure cases", () => {
    describe("Authentication errors", () => {
      it("returns an authentication error when the credentials are invalid", async () => {
        const res = await userRequest.post(url).send({
          ...form,
          email: invalidForm.email,
        });

        expect(res.body).toMatchObject({
          code: "AUTHENTICATION_ERROR",
          message: "Invalid credentials.",
        });
      });
    });

    describe("Rate-limit errors", () => {
      it("returns a rate-limit error when the maximum attempts are exceeded", async () => {
        await Promise.all(
          Array.from({ length: 10 }).map(async () => userRequest.post(url).send(form))
        );

        const res = await userRequest.post(url).send(form);

        expect(res.headers["retry-after"]).toBe("60");
        expect(res.body).toMatchObject({
          code: "RATE_LIMIT_EXCEEDED",
          message: "Too many login attempts. Try again later.",
          retryAfter: 60,
        });
      });
    });
  });
});

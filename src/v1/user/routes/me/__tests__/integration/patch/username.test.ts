import { beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

import { prisma } from "@/db/client/prisma.js";
import { generateUsername } from "@/v1/lib/generate-username.js";
import { generateEmail } from "@/v1/lib/generate-email.js";
import { testUserLoginForm } from "testing/seed.js";
import { app } from "v1/__mocks__/server.js";

const userRequest = request.agent(app);

let accessToken: string;

beforeAll(async () => {
  const login = await userRequest.post("/api/v1/auth/login").send(testUserLoginForm);

  accessToken = login.body.token;
});

describe("POST /api/v1/users/me/username", () => {
  const url = "/api/v1/users/me/username";

  const form = {
    username: "Krno.Crno",
  } as const;

  const invalidForm = {
    username: "crno@crno",
  } as const;

  describe("Success cases", () => {
    it("returns a user object", async () => {
      const res = await userRequest
        .patch(url)
        .set("Authorization", `Bearer ${accessToken}`)
        .send(form);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        id: expect.any(String),
        username: expect.any(String),
      });
    });
  });

  describe("Failure cases", () => {
    describe("Conflict errors", () => {
      it("returns a conflict error when username is already taken", async () => {
        const createdUser = await prisma.user.create({
          data: {
            email: generateEmail(),
            username: generateUsername("foo.bar"),
          },
          select: { id: true, username: true },
        });

        const res = await userRequest
          .patch(url)
          .set("Authorization", `Bearer ${accessToken}`)
          .send({ username: createdUser.username });

        expect(res.status).toBe(409);
        expect(res.body).toMatchObject({
          code: "CONFLICT_ERROR",
          message: "Unique constraint violation",
          field: {
            path: ["username"],
            code: "USERNAME_CONFLICT",
            message: "Username has already been taken.",
          },
        });

        await prisma.user.delete({ where: { id: createdUser.id } });
      });
    });

    describe("Validation errors", () => {
      it("returns a validation error when the username is invalid", async () => {
        const res = await userRequest
          .patch(url)
          .set("Authorization", `Bearer ${accessToken}`)
          .send(invalidForm);

        expect(res.status).toBe(422);
        expect(res.body).toMatchObject({
          code: "VALIDATION_ERROR",
          message: "Validation failed: 1 errors detected in body",
          issues: [
            {
              code: "custom",
              path: ["username"],
              message:
                "Username can only contain letters (A-Z, a-z), numbers (0-9), and the characters: _ , .",
            },
          ],
        });
      });
    });
  });
});

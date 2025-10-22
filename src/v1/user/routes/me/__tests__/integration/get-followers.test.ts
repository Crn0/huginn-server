import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";

import { testUserLoginForm } from "testing/seed.js";
import { createUser } from "@/v1/user/service/user-service.js";
import { getUserByEmail } from "@/v1/user/service/user-service.js";
import { deleteUserById } from "@/v1/user/repository/user.js";
import { followUserByUsername } from "@/v1/user/service/follow-service.js";
import { app } from "v1/__mocks__/server.js";
import { generateId } from "@/v1/lib/generate-id.js";

let accessToken: string;
let nextCursor: string;
let prevCursor: string;

const userRequest = request(app);

beforeAll(async () => {
  const [login, users] = await Promise.all([
    userRequest.post("/api/v1/auth/login").send(testUserLoginForm),
    Promise.all(
      Array.from({ length: 40 }).map(async (_, index) =>
        createUser({
          email: `user${index}.get@follower.com`,
          displayName: `user.follower${index}`,
          password: "Crnocrno123",
          birthday: new Date(),
        })
      )
    ),
  ]);

  accessToken = login.body.token;

  const authUser = await getUserByEmail(testUserLoginForm.email);

  await Promise.all(users.map(async (user) => followUserByUsername(user.id, authUser!.username)));

  return async () => {
    await Promise.all(users.map(async (user) => deleteUserById(user.id)));
  };
});

describe("GET /api/v1/users/me/followers", () => {
  const url = "/api/v1/users/me/followers" as const;

  describe("Success cases", () => {
    it("returns a list of followers, total and the next and previous href", async () => {
      const res = await userRequest.get(url).set("Authorization", `Bearer ${accessToken}`);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        followers: expect.any(Array),
        nextHref: expect.any(String),
        prevHref: null,
        nextCursor: expect.any(String),
        prevCursor: null,
        total: expect.any(Number),
      });
      expect(res.body.followers.length).toBe(20);

      nextCursor = res.body.nextCursor;
    });

    it("paginates results using 'after' cursor query param", async () => {
      const res = await userRequest
        .get(`${url}?after=${nextCursor}`)
        .set("Authorization", `Bearer ${accessToken}`);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        followers: expect.any(Array),
        nextHref: null,
        prevHref: expect.any(String),
        nextCursor: null,
        prevCursor: expect.any(String),
        total: expect.any(Number),
      });
      expect(res.body.followers.length).toBe(20);

      prevCursor = res.body.prevCursor;
    });

    it("paginates results using 'before' cursor query param", async () => {
      const res = await userRequest
        .get(`${url}?before=${prevCursor}`)
        .set("Authorization", `Bearer ${accessToken}`);

      expect(res.body).toMatchObject({
        followers: expect.any(Array),
        nextHref: expect.any(String),
        prevHref: null,
        nextCursor: expect.any(String),
        prevCursor: null,
        total: expect.any(Number),
      });
      expect(res.body.followers.length).toBe(20);
    });

    it("returns empty followers and null pagination fields for an invalid 'after' cursor", async () => {
      const res = await userRequest
        .get(`${url}?after=${generateId()}`)
        .set("Authorization", `Bearer ${accessToken}`);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        followers: expect.any(Array),
        nextHref: null,
        prevHref: null,
        nextCursor: null,
        prevCursor: null,
        total: expect.any(Number),
      });
      expect(res.body.followers.length).toBe(0);
    });

    it("returns empty followers and null pagination fields for an invalid 'before' cursor", async () => {
      const res = await userRequest
        .get(`${url}?before=${generateId()}`)
        .set("Authorization", `Bearer ${accessToken}`);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        followers: expect.any(Array),
        nextHref: null,
        prevHref: null,
        nextCursor: null,
        prevCursor: null,
        total: expect.any(Number),
      });
      expect(res.body.followers.length).toBe(0);
    });
  });

  describe("Failure cases", () => {
    describe("Validation  errors", () => {
      it("returns a Validation error when the query param 'after' is invalid", async () => {
        const res = await userRequest
          .get(`${url}?after=invalid-id`)
          .set("Authorization", `Bearer ${accessToken}`);

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
              path: ["after"],
              message: "Invalid cursor",
            },
          ],
        });
      });

      it("returns a Validation error when the query param 'before' is invalid", async () => {
        const res = await userRequest
          .get(`${url}?before=invalid-id`)
          .set("Authorization", `Bearer ${accessToken}`);

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
              path: ["before"],
              message: "Invalid cursor",
            },
          ],
        });
      });
    });
  });
});

import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";

import { createUser } from "@/v1/user/service/user-service.js";
import { createTweet } from "@/v1/tweet/service/tweet.js";
import { deleteUserById } from "@/v1/user/repository/user.js";
import { app } from "v1/__mocks__/server.js";

const userRequest = request.agent(app);

let accessToken: string;
let tweetId: string;

beforeAll(async () => {
  const userForm = {
    email: "create-repost@gmail.com",
    displayName: "create-repost",
    password: "crnocrno",
    birthday: new Date(),
  } as const

  const user = await createUser(userForm)

  const login = await userRequest.post("/api/v1/auth/login").send(userForm);

  accessToken = login.body.token;

  const tweet = await createTweet({ content: "this will be a repost", media: [], authorId: user.id});

  tweetId = tweet.id;

  return async () => {

    await deleteUserById(user.id)
  };
});

describe("POST /api/v1/tweets/:tweetId/repost", () => {
  const url = "/api/v1/tweets" as const;

  describe("Success cases", () => {
    it("returns status 204", async () => {
      const res = await userRequest
        .post(`${url}/${tweetId}/repost`)
        .set("Authorization", `Bearer ${accessToken}`)

      expect(res.status).toBe(204);
    });
  });

  describe("Failure cases", () => {
    describe("Forbidden errors", () => {
      it("returns a forbidden error when the tweet is reposted", async () => {
      const res = await userRequest
        .post(`${url}/${tweetId}/repost`)
        .set("Authorization", `Bearer ${accessToken}`);

        expect(res.status).toBe(403);
        expect(res.body).toMatchObject({
  code: 'FORBIDDEN_ERROR',
  message: 'You have already reposted this tweet'
})
      });
    });
  });
});

describe("DELETE /api/v1/tweets/:tweetId/repost", () => {
  const url = "/api/v1/tweets" as const;

  describe("Success cases", () => {
    it("returns status 204", async () => {
      const res = await userRequest
        .delete(`${url}/${tweetId}/repost`)
        .set("Authorization", `Bearer ${accessToken}`)
   
      expect(res.status).toBe(204);
    });
  });

  describe("Failure cases", () => {
    describe("Not_Found errors", () => {
      it("returns a not_found error when the tweet is reposted", async () => {
      const res = await userRequest
        .delete(`${url}/${tweetId}/repost`)
        .set("Authorization", `Bearer ${accessToken}`);

        expect(res.status).toBe(404);
        expect(res.body).toMatchObject({
  code: 'NOT_FOUND',
  message: "Repost does not exist"
})
      });
    });
  });
});
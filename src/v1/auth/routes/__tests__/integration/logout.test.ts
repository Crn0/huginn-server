import { describe, expect, it } from "vitest";
import request from "supertest";

import { testUserLoginForm } from "testing/seed.js";
import { verifyToken } from "@/v1/lib/jwt.js";
import { getBlackListedTokenByJwtId } from "@/v1/black-listed-token/repository/black-listed-token.js";
import { app } from "v1/__mocks__/server.js";

import type { JwtPayload } from "jsonwebtoken";

const userRequest = request.agent(app);

describe("POST /api/v1/auth/logout", () => {
  const url = "/api/v1/auth/logout" as const;

  it("black list the refresh token and clear the refresh token cookie", async () => {
    await userRequest.post("/api/v1/auth/login").send(testUserLoginForm);

    const refreshTokenCookie = userRequest.options(url).cookies;

    const res = await userRequest.post(url);

    expect(res.status).toBe(204);

    const refreshToken = refreshTokenCookie.split("=")[1] as string;

    const verifiedToken = verifyToken(refreshToken) as JwtPayload;

    await expect(getBlackListedTokenByJwtId(verifiedToken.jti as string)).resolves.not.toBeNull();
  });
});

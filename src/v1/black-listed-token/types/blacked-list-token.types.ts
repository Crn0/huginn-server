type TokenType = "ActionToken" | "RefreshToken";

export interface BlackListToken {
  jwtId: string;
  expiresAt: string;
  sub: string;
  type: TokenType;
}

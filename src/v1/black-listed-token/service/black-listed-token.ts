import * as blackedListTokenRepository from "../repository/black-listed-token.js";

import type { BlackListToken } from "../types/blacked-list-token.types.js";

export const blackListToken = async (DTO: BlackListToken) =>
  blackedListTokenRepository.blackListToken(DTO);

export const getBlackListedTokenByJwtId = async (jwtId: string) =>
  blackedListTokenRepository.getBlackListedTokenByJwtId(jwtId);

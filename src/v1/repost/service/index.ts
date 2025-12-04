import { ForbiddenError } from "@/lib/errors/forbidden-error.js";
import { NotFoundError } from "@/lib/errors/notfound-error.js";
import * as repostRepository from "../repository/index.js";

import type { CreateRepost, DeleteRepost } from "../schema/repost.js";

export const createRepost = async (DTO: CreateRepost) => {
  const repost = await repostRepository.getRepost(DTO.tweetId, DTO.userId);

  if (repost) {
    throw new ForbiddenError("You have already reposted this tweet");
  }

  return repostRepository.createRepost(DTO);
};

export const deleteRepost = async (DTO: DeleteRepost) => {
  const repost = await repostRepository.getRepost(DTO.tweetId, DTO.userId);

  if (!repost) {
    throw new NotFoundError("Repost does not exist");
  }

  return repostRepository.deleteRepost(DTO);
};

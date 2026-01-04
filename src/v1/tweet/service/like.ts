import * as likeRepository from "../repository/like.js";
import * as cache from "@/v1/lib/cache.js";

export const likeTweet = async (userId: string, tweetId: string) => {
  const like = await likeRepository.likeTweet(userId, tweetId);

  cache.delNamespace("user:likes", like.user.username);
  cache.delNamespace("user:tweets", like.user.username);
  cache.delNamespace("tweet:list");

  return like;
};

export const likeTweets = async (userId: string, tweetIds: string[]) =>
  likeRepository.likeTweets(userId, tweetIds);

export const unlikeTweet = async (userId: string, tweetId: string) => {
  const unlike = await likeRepository.unlikeTweet(userId, tweetId);

  cache.delNamespace("user:likes", unlike.user.username);
  cache.delNamespace("user:tweets", unlike.user.username);
  cache.delNamespace("tweet:list");

  return unlike;
};

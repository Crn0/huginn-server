import * as likeRepository from "../repository/like.js";

export const likeTweet = async (userId: string, tweetId: string) =>
  likeRepository.likeTweet(userId, tweetId);

export const likeTweets = async (userId: string, tweetIds: string[]) =>
  likeRepository.likeTweets(userId, tweetIds);

export const unlikeTweet = async (userId: string, tweetId: string) =>
  likeRepository.unlikeTweet(userId, tweetId);

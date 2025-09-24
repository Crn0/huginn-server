import * as followRepository from "../repository/follow.js";

export const followUserById = async (userId: string, followId: string) =>
  followRepository.followUserById(userId, followId);

export const unFollowUserById = async (userId: string, unFollowId: string) =>
  followRepository.unFollowUserById(userId, unFollowId);

export const getFollowersCountById = async (userId: string) =>
  followRepository.getFollowersCountById(userId);

export const getFollowingCountById = async (userId: string) =>
  followRepository.getFollowingCountById(userId);

export const getUserFollowCountById = async (userId: string) => {
  const followingCount = await followRepository.getFollowersCountById(userId);
  const followersCount = await followRepository.getFollowingCountById(userId);

  return Object.freeze({ followingCount, followersCount })
}
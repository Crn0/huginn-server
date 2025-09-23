import * as followRepository from "../repository/follow.js";

export const followUserById = async (userId: string, followId: string) =>
  followRepository.followUserById(userId, followId);

export const unFollowUserById = async (userId: string, unFollowId: string) =>
  followRepository.unFollowUserById(userId, unFollowId);
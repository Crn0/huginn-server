import { env } from "@/configs/env.js";
import * as tweetRepository from "../repository/tweet.js";
import { createMedias } from "@/v1/media/service/media.js";

import type { CreateTweetDTO } from "../schema/create-tweet.js";
import type { CreateTweet } from "../types/repository.types.js";

const handleMediasUpload = async <T extends Partial<CreateTweet>>(
  data: T,
  medias: CreateTweetDTO["medias"]
) => {
  if (medias.length) {
    const today = new Date().toISOString().split("T")[0]; // e.g. "2025-09-17"

    const mediaFolder = `${env.CLOUDINARY_ROOT_FOLDER}/tweets/${today}`;

    const uploadedMedias = await createMedias(mediaFolder, medias);

    data.medias = uploadedMedias;
  }

  return data;
};

export const createTweet = async (DTO: CreateTweetDTO) => {
  const data: CreateTweet = {
    authorId: DTO.authorId,
    content: DTO.content,
    medias: [],
  };

  await handleMediasUpload(data, DTO.medias);

  return tweetRepository.createTweet(data);
};

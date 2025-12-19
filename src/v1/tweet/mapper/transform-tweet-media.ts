import { getMediaUrl } from "@/v1/storage/cloudinary-service.js";

import type { Media as DbMedia } from "@/generated/prisma/index.js";
import type { TweetImageVariant, TweetVideoVariant } from "@/v1/lib/tweet-schema.js";

type Media = DbMedia & { tweet: { id: string } | null };

const IMAGE_SIZE = {
  small: 8,
  medium: 256,
  large: 1280,
} as const;

const GIF_SIZE = {
  ...IMAGE_SIZE,
  large: 400,
} as const;

const BITRATE = {
  "360p": 800_000,
  "480p": 1_200_000,
  "720p": 2_500_000,
} as const;

const BASE_OPTIONS = {
  video: {
    background: "black",
    height: 720,
    width: 1280,
    resource_type: "video",
    format: "mp4",
  } as const,
  image: {
    gravity: "auto",
    fetch_format: "webp",
  } as const,
  gif: {
    gravity: "auto",
    fetch_format: "gif",
  } as const,
} as const;

const getVideoVariant = (media: Media) => {
  if (media.type !== "VIDEO") throw new TypeError("Invalid media type; expected VIDEO");

  const baseOptions = BASE_OPTIONS.video;

  const small = {
    bitRate: BITRATE["360p"],
    contentType: "video/mp4",
    url: getMediaUrl(media.filePath, { ...baseOptions, bit_rate: BITRATE["360p"] }),
  } satisfies TweetVideoVariant;

  const medium = {
    bitRate: BITRATE["480p"],
    contentType: "video/mp4",
    url: getMediaUrl(media.filePath, { ...baseOptions, bit_rate: BITRATE["480p"] }),
  } satisfies TweetVideoVariant;

  const large = {
    bitRate: BITRATE["720p"],
    contentType: "video/mp4",
    url: getMediaUrl(media.filePath, { ...baseOptions, bit_rate: BITRATE["720p"] }),
  } satisfies TweetVideoVariant;

  const variants = [small, medium, large] satisfies TweetVideoVariant[];

  return variants;
};

const getImageVariant = (media: Media) => {
  if (media.type !== "IMAGE") throw new TypeError("Invalid media type; expected IMAGE");

  const baseOptions = BASE_OPTIONS.image;

  const small = {
    url: getMediaUrl(media.filePath, {
      transformation: [
        { ...baseOptions },
        { width: IMAGE_SIZE.small, height: IMAGE_SIZE.small },
        { quality: "auto:low" },
      ],
    }),
    height: IMAGE_SIZE.small,
    width: IMAGE_SIZE.small,
    contentType: `image/${baseOptions.fetch_format}`,
  } satisfies TweetImageVariant;

  const medium = {
    url: getMediaUrl(media.filePath, {
      transformation: [
        { ...baseOptions },
        { width: IMAGE_SIZE.medium, height: IMAGE_SIZE.medium },
        { quality: "auto:good" },
      ],
    }),
    width: IMAGE_SIZE.medium,
    height: IMAGE_SIZE.medium,
    contentType: `image/${baseOptions.fetch_format}`,
  } satisfies TweetImageVariant;

  const large = {
    url: getMediaUrl(media.filePath, {
      transformation: [
        { ...baseOptions },
        { width: IMAGE_SIZE.large, height: IMAGE_SIZE.large },
        { quality: "auto:best" },
      ],
    }),
    width: IMAGE_SIZE.large,
    height: IMAGE_SIZE.large,
    contentType: `image/${baseOptions.fetch_format}`,
  } satisfies TweetImageVariant;

  const variants = [small, medium, large] satisfies TweetImageVariant[];

  return variants;
};

const getGifVariant = (media: Media) => {
  if (media.type !== "GIF") throw new TypeError("Invalid media type; expected GIF");

  const baseOptions = BASE_OPTIONS.gif;

  const small = {
    url: getMediaUrl(media.filePath, {
      transformation: [
        { ...baseOptions },
        { width: GIF_SIZE.small, height: GIF_SIZE.small },
        { quality: "auto:low" },
        { page: 1 },
      ],
    }),
    height: GIF_SIZE.small,
    width: GIF_SIZE.small,
    contentType: `image/${baseOptions.fetch_format}`,
  } satisfies TweetImageVariant;

  const medium = {
    url: getMediaUrl(media.filePath, {
      transformation: [
        { ...baseOptions },
        { width: GIF_SIZE.medium, height: GIF_SIZE.medium },
        { quality: "auto:good" },
      ],
    }),
    width: GIF_SIZE.medium,
    height: GIF_SIZE.medium,
    contentType: `image/${baseOptions.fetch_format}`,
  } satisfies TweetImageVariant;

  const large = {
    url: getMediaUrl(media.filePath, {
      transformation: [
        { ...baseOptions },
        { width: GIF_SIZE.large, height: GIF_SIZE.large },
        { quality: "auto:best" },
      ],
    }),
    width: GIF_SIZE.large,
    height: GIF_SIZE.large,
    contentType: `image/${baseOptions.fetch_format}`,
  } satisfies TweetImageVariant;

  const variants = [small, medium, large] satisfies TweetImageVariant[];

  return variants;
};

const normalizedTweetVideo = (media: Media) => {
  if (media.type !== "VIDEO") throw new TypeError("Invalid media type; expected VIDEO");
  if (typeof media.tweet?.id === "undefined") throw new TypeError("Tweet ID is undefined");

  const baseOptions = BASE_OPTIONS.video;

  const video = {
    id: media.id,
    url: getMediaUrl(media.filePath, {
      ...baseOptions,
      width: IMAGE_SIZE.medium,
      height: IMAGE_SIZE.medium,
    }),
    type: "VIDEO",
    width: baseOptions.width,
    height: baseOptions.height,
    variants: getVideoVariant(media),
    tweet: { id: media.tweet.id },
    createdAt: media.createdAt,
  };

  return Object.freeze(video);
};

const normalizedTweetImage = (media: Media) => {
  if (media.type === "VIDEO") throw new TypeError("Invalid media type; expected IMAGE or GIF");
  if (typeof media.tweet?.id === "undefined") throw new TypeError("Tweet ID is undefined");

  const baseOptions = BASE_OPTIONS.image;

  const image = {
    id: media.id,
    url: getMediaUrl(media.filePath, { fetch_format: baseOptions.fetch_format }),
    type: media.type,
    variants: getImageVariant(media),
    tweet: { id: media.tweet.id },
    createdAt: media.createdAt,
  };

  return Object.freeze(image);
};

const normalizedTweetGif = (media: Media) => {
  if (media.type !== "GIF") throw new TypeError("Invalid media type; expected GIF");
  if (typeof media.tweet?.id === "undefined") throw new TypeError("Tweet ID is undefined");

  const baseOptions = BASE_OPTIONS.gif;

  const image = {
    id: media.id,
    url: getMediaUrl(media.filePath, { fetch_format: baseOptions.fetch_format }),
    type: media.type,
    variants: getGifVariant(media),
    tweet: { id: media.tweet.id },
    createdAt: media.createdAt,
  };

  return Object.freeze(image);
};

export const transformTweetMedia = (media: Media | null) => {
  if (!media) return null;
  if (media.type === "VIDEO") return normalizedTweetVideo(media);
  if (media.type === "GIF") return normalizedTweetGif(media);

  return normalizedTweetImage(media);
};

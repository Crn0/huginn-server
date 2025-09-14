type UserProfileMediaType = "GIF" | "IMAGE"

export interface UserProfileMedia {
  id?: string | undefined
  type: UserProfileMediaType
  filePath: string
  url: string
  bytes: number
}

export interface PatchUserProfile {
  displayName?: string | undefined;
  bio?: string | undefined;
  birthday?: InstanceType<typeof Date> | undefined;
  location?: string | undefined
  website?: string | undefined
  avatar?: UserProfileMedia | undefined
  banner?: UserProfileMedia | undefined
};
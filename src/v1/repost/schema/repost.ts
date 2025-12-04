import z from "zod"


export const createRepostSchema = z.object({
    tweetId: z.uuidv7(),
    userId: z.uuidv7(),
})

export type CreateRepost = z.infer<typeof createRepostSchema>

export const deleteRepostSchema = z.object({
    tweetId: z.uuidv7(),
    userId: z.uuidv7(),
})

export type DeleteRepost = z.infer<typeof deleteRepostSchema>

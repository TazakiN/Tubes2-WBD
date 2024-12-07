import { z } from "zod";

export const getAllFeedsRequestQuerySchema = z.object({
  limit: z.string().default("10"),
  cursor: z.string().optional(),
});

export const getAllFeedsResponseSchema = z.array(
  z.object({
    success: z.boolean(),
    message: z.string(),
    body: z.object({
      cursor: z.union([z.string(), z.null(), z.number()]),
      feeds: z.array(
        z.object({
          id: z.string(),
          content: z.string(),
          created_at: z.string(),
          updated_at: z.string(),
          user: z.object({
            user_id: z.string(),
            full_name: z.string(),
            profile_photo_path: z.string(),
          }),
        })
      ),
    }),
  })
);

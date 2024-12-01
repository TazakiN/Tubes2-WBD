import { z } from "zod";

export const GetChatInterlocutorsHistoryResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: z.array(
    z.object({
      interlocutor_id: z.string(),
      profile_photo_path: z.string().nullable(),
      username: z.string().nullable(),
      last_message: z
        .object({
          message: z.string(),
          timestamp: z.string(),
        })
        .nullable(),
    })
  ),
});

export const GetChatInterlocutorsHistoryErrorResponseSchema = z.object({
  success: z.literal(false),
  message: z.string(),
});

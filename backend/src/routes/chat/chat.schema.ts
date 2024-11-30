import { z } from "zod";

export const GetChatInterlocutorsHistoryResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: z.array(z.string()),
});

export const GetChatInterlocutorsHistoryErrorResponseSchema = z.object({
  success: z.literal(false),
  message: z.string(),
});

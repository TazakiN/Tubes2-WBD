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

export const GetChatConversationQuerySchema = z.object({
  interlocutor_id: z.string(),
});

export const GetChatConversationResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: z.array(
    z.object({
      id: z.string(),
      from_id: z.string(),
      to_id: z.string(),
      message: z.string(),
      timestamp: z.string(),
    })
  ),
});

export const GetChatConversationErrorResponseSchema = z.object({
  success: z.literal(false),
  message: z.string(),
});

export const SearchConnectedUsersQuerySchema = z.object({
  username: z.string(),
});

export const SearchConnectedUsersResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: z.array(
    z.object({
      user_id: z.string(),
      username: z.string(),
      profile_photo_path: z.string().nullable(),
      email: z.string(),
    })
  ),
});

export const SearchConnectedUsersErrorResponseSchema = z.object({
  success: z.literal(false),
  message: z.string(),
});

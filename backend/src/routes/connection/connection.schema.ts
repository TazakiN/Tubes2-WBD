import { z } from "zod";

export const GetAllConnectResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(
    z.object({
      from_id: z.string(),
      to_id: z.string(),
      created_at: z.string(),
    })
  ),
});

export const GetAllConnectResponseErrorSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export const DeleteConnectionRequestSchema = z.object({
  to_id: z.string(),
});

export const DeleteConnectionResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
});

export const GetAllConnectionInfoRequestSchema = z.object({
  user_id: z.string().optional(),
});

export const GetAllConnectionInfoResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  from_user: z.boolean(),
  data: z.array(
    z.object({
      user_id: z.string(),
      full_name: z.string(),
      profile_photo_path: z.string(),
    })
  ),
});

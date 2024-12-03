import { z } from "zod";

export const getAllUsersResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  user_count: z.number(),
  data: z.array(
    z.object({
      user_id: z.string(),
      full_name: z.string(),
      profile_photo_path: z.string(),
      status: z.enum(["Connected", "Not Connected", "Outgoing", "Incoming"]),
    })
  ),
});

import { z } from "zod";

export const connectionRequestParamsSchema = z.object({
  status: z.enum(["Incoming", "Outgoing"]).openapi({
    description: "The status of the connection request",
    example: "Incoming",
  }),
});

export const ConnectionRequestResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: z.array(
    z.object({
      user_id: z.string(),
      username: z.string(),
      photo_profile_path: z.string(),
      created_at: z.string(),
    })
  ),
});

export const ConnectionRequestErrorResponseSchema = z.object({
  success: z.literal(false),
  message: z.string(),
});

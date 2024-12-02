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

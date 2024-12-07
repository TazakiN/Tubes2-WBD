import { z } from "zod";

export const errorPayloadSchema = z.union([
  z.null(),
  z.object({
    code: z.number(),
    details: z.string(),
  }),
]);

export const errorSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  error: errorPayloadSchema.optional(),
});

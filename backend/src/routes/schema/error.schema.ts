import { z } from 'zod';

export const errorPayloadSchema = z.union([z.null(), z.object({
    code: z.number(),
    details: z.string(),
  })]);
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

export const CreateConnectionRequestSchema = z.object({
  to_id: z.string().openapi({
    description: "The user id of the receiver",
    example: "2",
  }),
});

export const CreateConnectionResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
});

export const CreateCOnnectionResponseErrorSchema = z.object({
  success: z.literal(false),
  message: z.string(),
});

export const AcceptConnectionRequestSchema = z.object({
  from_id: z.string().openapi({
    description: "The user id of the sender",
    example: "2",
  }),
});

export const AcceptConnectionResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
});

export const AcceptConnectionResponseErrorSchema = z.object({
  success: z.literal(false),
  message: z.string(),
});

export const RejectConnectionRequestSchema = z.object({
  from_id: z.string().openapi({
    description: "The user id of the sender",
    example: "2",
  }),
});

export const RejectConnectionResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
});

export const RejectConnectionResponseErrorSchema = z.object({
  success: z.literal(false),
  message: z.string(),
});

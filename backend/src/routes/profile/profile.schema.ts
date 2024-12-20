import { z } from "zod";
import { errorPayloadSchema } from "../schema/error.schema";

export const GetProfileInfoRequest = z.object({
  user_id: z
    .string()
    .nullable()
    .optional()
    .openapi({ description: "The user_id of the user" }),
});

const ProfileInfoSchema = z.object({
  id: z.string().openapi({ description: "The id of the user" }),
  full_name: z.string().openapi({ description: "The username of the user" }),
  profile_photo_path: z
    .string()
    .openapi({ description: "Path to Profile Picture from Front End root" }),
});

export const GetProfileInfoResponse = z.object({
  success: z.literal(true),
  message: z.string(),
  data: ProfileInfoSchema.nullable(),
});

const PublicProfileSchema = z.object({
  username: z.string(),
  name: z.string().nullable(),
  work_history: z.string().nullable(),
  skills: z.string().nullable(),
  connection_count: z.number().int(),
  profile_photo: z.string().url(),
});

const PrivateProfileSchema = PublicProfileSchema.extend({
  relevant_posts: z
    .array(
      z.object({
        id: z.string(),
        user_id: z.string(),
        content: z.string(),
        created_at: z.string(),
        updated_at: z.string(),
      })
    )
    .nullable(),
});

export const GetPublicProfileResponse = z.object({
  success: z.literal(true),
  message: z.string(),
  body: PublicProfileSchema,
});

export const GetPrivateProfileResponse = z.object({
  success: z.literal(true),
  message: z.string(),
  body: PrivateProfileSchema,
});

export const ProfileResponseError = z.object({
  success: z.literal(false),
  message: z.string(),
  error: errorPayloadSchema,
});

export const updateProfileSchema = z.object({
  username: z.string().optional(),
  name: z.string().optional(),
  work_history: z.string().optional(),
  skills: z.string().optional(),
  profile_photo: z.string().optional(),
});

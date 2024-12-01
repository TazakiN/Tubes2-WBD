import { z } from "zod";
import { errorPayloadSchema } from "../schema/error.schema";

const ProfileInfoSchema = z.object({
    username: z.string().nullable().openapi({ description: "The username of the user" }),
    profile_photo_path: z.string().nullable().openapi({description: "Path to Profile Picture from Front End root"}),
});

export const GetProfileInfoResponse = z.object({
  success: z.literal(true),
  message: z.string(),
  data: ProfileInfoSchema,
});

const PublicProfileSchema = z.object({
    username: z.string(),
    name: z.string(),
    work_history: z.string(),
    skills: z.string(),
    connection_count: z.number().int(),
    profile_photo: z.string().url(),
});

const PrivateProfileSchema = PublicProfileSchema.extend({
    relevant_posts: z.array(
        z.null() //TODO: Integrate with Feed
    ).nullable(),
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
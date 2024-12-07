import { Context } from "hono";
import { getUserIDbyTokenInCookie } from "../../utils/jwt";
import { profileController } from "../../controllers/profile.controller";
import { getCookie } from "hono/cookie";
import profileService from "../../services/profile.service";

export const getProfileInfo = async (c: Context) => {
  try {
    const data = await profileController.getProfileInfo(c);
    return c.json(
      {
        success: true,
        message: "Profile found",
        data,
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        success: false,
        message: "Internal server error",
        error: error,
      },
      500
    );
  }
};

export const getProfile = async (c: Context) => {
  const profileID = c.req.param("user_id");
  const token = getCookie(c, "token");

  try {
    let message;
    const profile = await profileService.getProfile(BigInt(profileID));

    if (token) {
      const currentID = await getUserIDbyTokenInCookie(c);
      message = profileID === currentID ? "Owner" : "Authenticated";
    } else {
      message = "Unauthenticated";
    }

    return c.json(
      {
        success: true,
        message,
        body: {
          username: profile!.username,
          name: profile!.full_name,
          work_history: profile?.work_history,
          skills: profile?.skills,
          connection_count: 0, // TODO: Get Connection Count
          relevant_posts: null, // TODO: Get Feed Array
          profile_photo: profile?.profile_photo_path,
        },
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        success: false,
        message: "Internal server error",
        error: error,
      },
      500
    );
  }
};

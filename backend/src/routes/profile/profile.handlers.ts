import { Context } from "hono";
import { getUserIDbyTokenInCookie } from "../../utils/jwt";
import { profileController } from "../../controllers/profile.controller";
import profileService from "../../services/profile.service";
import { ConnectionService } from "../../services/connection.service";
import { FeedService } from "../../services/feed.service";

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
      },
      500
    );
  }
};

export const getProfile = async (c: Context) => {
  const profileID = BigInt(c.req.param("user_id"));

  try {
    let message;
    const profile = await profileService.getProfile(profileID);
    if (!profile) {
      throw new Error("Profile not found");
    }

    const currentID = BigInt(await getUserIDbyTokenInCookie(c));
    message = currentID
      ? profileID === currentID
        ? "Owner"
        : "Authenticated"
      : "Unauthenticated";

    return c.json(
      {
        success: true,
        message,
        body: {
          username: profile.username,
          name: profile.full_name,
          work_history: profile.work_history,
          skills: profile.skills,
          connection_count:
            (await ConnectionService.countConnections(profileID)) ?? 0,
          relevant_posts: await FeedService.getRelatedFeeds(profileID),
          profile_photo: profile.profile_photo_path,
        },
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        success: false,
        message: "Internal server error",
      },
      500
    );
  }
};

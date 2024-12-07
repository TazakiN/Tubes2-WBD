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
      return c.json(
        {
          success: false,
          message: "Profile not found",
          body: null,
        },
        404
      );
    }

    const currentID = BigInt(await getUserIDbyTokenInCookie(c));
    message = currentID
      ? profileID === currentID
        ? "Owner"
        : "Authenticated"
      : "Unauthenticated";

    const connectionCount =
      Number(await ConnectionService.countConnections(profileID)) ?? 0;
    const responseBody: {
      username: string;
      name: string | null;
      work_history: string | null;
      skills: string | null;
      connection_count: number;
      profile_photo: string;
      relevant_posts?: any[];
    } = {
      username: profile.username,
      name: profile.full_name,
      work_history: profile.work_history,
      skills: profile.skills,
      connection_count: connectionCount,
      profile_photo: profile.profile_photo_path,
    };

    if (message !== "Unauthenticated") {
      responseBody.relevant_posts = await FeedService.getRelatedFeeds(
        profileID
      );
    }

    return c.json(
      {
        success: true,
        message,
        body: responseBody,
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        success: false,
        message: "Internal server error",
        body: null,
      },
      500
    );
  }
};

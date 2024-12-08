import { Context } from "hono";
import { getUserIDbyTokenInCookie } from "../../utils/jwt";
import { profileController } from "../../controllers/profile.controller";
import profileService from "../../services/profile.service";
import { ConnectionService } from "../../services/connection.service";
import { FeedService } from "../../services/feed.service";
import { getCookie } from "hono/cookie";

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
  const profileID = BigInt(c.req.param("profileID"));
  const loggedInToken = getCookie(c, "token");
  let profile = null;
  let message = null;
  try {
    if (loggedInToken === undefined) {
      // akses publik
      profile = await profileService.getProfilePublic(BigInt(profileID));
      message = "Unathenticated";
    } else {
      const currentID = BigInt(await getUserIDbyTokenInCookie(c));
      profile = await profileService.getProfileAuthenticated(BigInt(profileID));
      message = profileID === BigInt(currentID) ? "Owner" : "Authenticated";
    }
    return c.json(
      {
        success: true,
        message,
        body: profile,
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

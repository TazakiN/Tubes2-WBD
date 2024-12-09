import { Context } from "hono";
import { getUserIDbyTokenInCookie } from "../../utils/jwt";
import profileService from "../../services/profile.service";
import { getCookie } from "hono/cookie";

export const getProfileInfo = async (c: Context) => {
  try {
    const user_id_query = c.req.query("user_id");
    const user_id = user_id_query ? BigInt(user_id_query) : null;
    let requesting_id = null;
    if (user_id === null) {
      requesting_id = BigInt(await getUserIDbyTokenInCookie(c));
    } else {
      requesting_id = BigInt(user_id);
    }
    const data = await profileService.getProfileInfo(requesting_id);
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
    console.log(error);
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

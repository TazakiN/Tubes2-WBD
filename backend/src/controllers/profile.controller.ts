import { Context } from "hono";
import profileService from "../services/profile.service";
import { getCookie } from "hono/cookie";
import { verifyJWT } from "../utils/jwt";

export class profileController {
  static async getProfileInfo(c: Context) {
    const token = getCookie(c, "token");
    if (!token) {
      return c.json({ error: "Token not found" }, 401);
    }
    try {
      const res = await verifyJWT(token);
      const user_id = BigInt(res.id as string);
      const profile = await profileService.getProfileInfo(user_id);

      return c.json(
        {
          success: true,
          message: "Profile found",
          body: {
            username: profile?.username,
            profile_photo_path: profile?.profile_photo_path,
          },
        },
        200
      );

    } catch (error) {
      return c.json({ success: false, message: (error as Error).message, error: null }, 500);
    }
  }

  static async getProfile(c: Context) {
    const user_id = BigInt(c.req.param("user_id"));
    try {
      const profile = await profileService.getProfile(user_id);
      return c.json(
        {
          success: true,
          message: "Profile found",
          body: {
            username: profile?.username,
            name: profile?.full_name,
            work_history: profile?.work_history,
            skills: profile?.skills,
            // TODO: Get Connection Count
            profile_photo: profile?.profile_photo_path,
          },
        },
        200
      );

    } catch (error) {
      return c.json({ success: false, message: (error as Error).message, error: null }, 500);
    }
  }
}

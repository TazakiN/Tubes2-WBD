import { Context } from "hono";
import profileService from "../services/profile.service";
import { getCookie } from "hono/cookie";
import { verifyJWT } from "../utils/jwt";

export class profileController {
  static async getProfileInfo(c: Context) {
    const token = getCookie(c, "token");
    if (!token) {
      return null;
    }
    try {
      const res = await verifyJWT(token);
      const user_id = BigInt(res.id as string);
      return await profileService.getProfileInfo(user_id);
    } catch (error) {
      throw error;
    }
  }

  static async getPublicProfile(c: Context) {
    const user_id = BigInt(c.req.param("user_id"));
    try {
      const profile = await profileService.getProfile(user_id);
      return profile;
    } catch (error) {
      throw error;
    }
  }

  static async getPrivateProfile(c: Context) {
    const user_id = BigInt(c.req.param("user_id"));
    try {
      const profile = await profileService.getProfile(user_id);
      return profile;
    } catch (error) {
      throw error;
    }
  }
}

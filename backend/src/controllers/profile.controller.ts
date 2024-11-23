import { Context } from "hono";
import profileService from "../services/profile.service";

export class profileController {
  static async getProfile(c: Context) {
    const user_id = BigInt(c.req.param("user_id"));
    try {
      const profile = await profileService.getProfile(user_id);

      return c.json(
        {
          success: true,
          message: "Profile found",
          body: {
            name: profile?.username,
            email: profile?.email,
          },
        },
        200
      );
    } catch (error) {
      return c.json({ error: (error as Error).message }, 500);
    }
  }
}

import db from "../config/db";

export default class profileService {
  static async getProfileInfo(user_id: bigint) {
    return await db.users.findFirst({
      where: {
        id: user_id,
      },
      select: {
        username: true,
        profile_photo_path: true,
      },
    });
  }

  static async getProfile(user_id: bigint) {
    return await db.users.findFirst({
      where: {
        id: user_id,
      },
      select: {
        username: true,
        full_name: true,
        work_history: true,
        skills: true,
        profile_photo_path: true,
      },
    });
  }
}

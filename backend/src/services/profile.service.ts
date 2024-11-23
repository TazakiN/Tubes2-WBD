import db from "../config/db";

export default class profileService {
  static async getProfile(user_id: bigint) {
    return await db.users.findFirst({
      where: {
        id: user_id,
      },
    });
  }
}

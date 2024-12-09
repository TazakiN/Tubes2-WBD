import db from "../config/db";

export class PushService {
  static async getLastSubscriberByUserId(userId: bigint) {
    return db.push_subscriptions.findMany({
      where: { user_id: userId },
      orderBy: {
        created_at: "desc",
      },
      take: 1,
    });
  }

  //   static async subscribe(subscription: any, userId: bigint | null) {
}
